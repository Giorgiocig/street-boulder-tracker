import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import EventForm from "../EventForm";
import { Dayjs } from "dayjs";
import dayjs from "dayjs";

// Mock the useAddEvent hook
const mutateMock = vi.fn();
vi.mock("../../../services/mutations/Event", () => ({
  useAddEvent: () => ({
    mutate: mutateMock,
  }),
}));

// Mock for child component
vi.mock("../../form/AutocompleteCity", () => ({
  AutocompleteCity: ({ onSelect }: any) => (
    <button
      type="button"
      onClick={() => onSelect({ name: "Roma", lat: 1, lng: 2 })}
    >
      Select City
    </button>
  ),
}));

// Mock fo DataPicker
vi.mock("../../form/DataPicker", () => ({
  default: ({ onSelect }: any) => (
    <button
      type="button"
      onClick={() => onSelect(dayjs("2025-06-18T14:30:00.000Z") as Dayjs)}
    >
      Select Date
    </button>
  ),
}));

describe("EventForm", () => {
  beforeEach(() => {
    // Clear the mock before each test
    mutateMock.mockClear();
  });

  it("submits the form with correct data", async () => {
    render(<EventForm />);
    const user = userEvent.setup();

    // Fill in the form fields first
    const nameInput = screen.getByLabelText(/nome evento/i);
    const descriptionInput = screen.getByLabelText(/descrizione/i);

    await user.type(nameInput, "evento");
    await user.type(descriptionInput, "description");

    // Select city
    await user.click(screen.getByText("Select City"));

    // Wait for city to be set
    await waitFor(() => {
      const cityInput = document.querySelector(
        'input[name="city"]'
      ) as HTMLInputElement;
      expect(cityInput?.value).toBe("Roma");
    });

    // Select date
    await user.click(screen.getByText("Select Date"));

    // Additional wait to ensure all state updates are complete
    await new Promise((resolve) => setTimeout(resolve, 300));

    // Submit the form
    const submitButton = screen.getByRole("button", {
      name: /inserisci evento/i,
    });
    await user.click(submitButton);

    // Wait for mutation to be called
    await waitFor(
      () => {
        expect(mutateMock).toHaveBeenCalledTimes(1);
      },
      { timeout: 3000 }
    );

    const call = mutateMock.mock.calls[0][0];

    expect(call.name).toBe("evento");
    expect(call.description).toBe("description");
    expect(call.city).toBe("Roma");
    expect(call.latitude).toBe(1);
    expect(call.longitude).toBe(2);
    expect(call.date.toISOString()).toBe("2025-06-18T14:30:00.000Z");

    expect(call.createdAt).toMatch(/^\d{4}-\d{2}-\d{2}T/); // ISO date
  });

  it("handles form validation errors", async () => {
    render(<EventForm />);
    const user = userEvent.setup();

    // Select city and date but don't fill required text fields
    await user.click(screen.getByText("Select City"));
    await user.click(screen.getByText("Select Date"));

    // Wait for city and date to be set
    await waitFor(() => {
      const cityInput = document.querySelector(
        'input[name="city"]'
      ) as HTMLInputElement;
      expect(cityInput?.value).toBe("Roma");
    });

    // Submit without filling required fields (name and description are empty)
    const submitButton = screen.getByRole("button", {
      name: /inserisci evento/i,
    });

    await user.click(submitButton);

    // Wait a bit and verify mutation was NOT called due to validation
    await new Promise((resolve) => setTimeout(resolve, 1000));
    expect(mutateMock).not.toHaveBeenCalled();
  });
});
