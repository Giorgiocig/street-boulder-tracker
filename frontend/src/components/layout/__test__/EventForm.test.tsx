import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor, act } from "@testing-library/react";
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

// Mock per i componenti figli
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

    // Select city (this sets latLong state and city field)
    await user.click(screen.getByText("Select City"));

    // Select date
    await user.click(screen.getByText("Select Date"));

    // Small delay to ensure state updates
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 100));
    });

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

  it("debug: check form submission flow", async () => {
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});

    render(<EventForm />);
    const user = userEvent.setup();

    // Fill in the form fields
    await user.type(screen.getByLabelText(/nome evento/i), "evento");
    await user.type(screen.getByLabelText(/descrizione/i), "description");

    // Select city
    await user.click(screen.getByText("Select City"));
    await user.click(screen.getByText("Select Date"));

    // Check form state
    const form = screen.getByRole("form");
    const formData = new FormData(form);
    console.log("Form data:", Object.fromEntries(formData));

    // Submit the form
    const submitButton = screen.getByRole("button", {
      name: /inserisci evento/i,
    });
    await user.click(submitButton);

    // Wait a bit
    await new Promise((resolve) => setTimeout(resolve, 1000));

    console.log("Mutation called:", mutateMock.mock.calls.length);
    console.log("Mutation calls:", mutateMock.mock.calls);

    consoleSpy.mockRestore();
  });

  it("handles form validation errors", async () => {
    render(<EventForm />);
    const user = userEvent.setup();

    // Select city and date
    await user.click(screen.getByText("Select City"));
    await user.click(screen.getByText("Select Date"));

    // Don't fill required fields and submit
    const submitButton = screen.getByRole("button", {
      name: /inserisci evento/i,
    });
    await user.click(submitButton);

    // Wait a bit and verify mutation was NOT called due to validation
    await new Promise((resolve) => setTimeout(resolve, 1000));
    expect(mutateMock).not.toHaveBeenCalled();
  });
});
