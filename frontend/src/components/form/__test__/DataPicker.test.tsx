import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DataPicker from "../DataPicker";
import dayjs from "dayjs";

describe("DataPicker", () => {
  it("should render DataPicker", () => {
    const mockonSelect = vi.fn();
    render(<DataPicker onSelect={mockonSelect} />);

    const input = screen.getByText(/seleziona una data per l`evento/i);
    expect(input).toBeInTheDocument();
  });
  it("select a date and calls onSelect with correct date", async () => {
    const user = userEvent.setup();
    const mockOnSelect = vi.fn();

    render(<DataPicker onSelect={mockOnSelect} />);

    const input = screen.getByLabelText(/seleziona una data/i);
    expect(input).toBeInTheDocument();

    const calendarButton = screen.getAllByRole("button")[0];
    await user.click(calendarButton);

    // await for the dialog
    await screen.findByRole("dialog");

    const dayButton = screen.getByText("25");
    await user.click(dayButton);

    const okButton = screen.getByRole("button", { name: "OK" });
    await user.click(okButton);

    // Verify onSelect call
    await waitFor(() => {
      expect(mockOnSelect).toHaveBeenCalled();
    });

    const selectedDate = mockOnSelect.mock.calls[0][0];
    expect(dayjs(selectedDate).date()).toBe(25);
  });
});
