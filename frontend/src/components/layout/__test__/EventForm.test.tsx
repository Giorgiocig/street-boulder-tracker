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

    // Wait for date to be set in the form
    await waitFor(() => {
      const dateInput = document.querySelector(
        'input[name="date"]'
      ) as HTMLInputElement;
      expect(dateInput?.value).toBe("2025-06-18T14:30:00.000Z");
    });

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

    expect(mutateMock).toHaveBeenCalledWith(
      expect.objectContaining({
        name: "evento",
        description: "description",
        city: "Roma",
        latitude: 1,
        longitude: 2,
        date: "2025-06-18T14:30:00.000Z",
        createdAt: expect.stringMatching(/^\d{4}-\d{2}-\d{2}T/),
      })
    );
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

    await waitFor(() => {
      const dateInput = document.querySelector(
        'input[name="date"]'
      ) as HTMLInputElement;
      expect(dateInput?.value).toBe("2025-06-18T14:30:00.000Z");
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
