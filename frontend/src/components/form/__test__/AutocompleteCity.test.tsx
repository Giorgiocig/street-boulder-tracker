import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AutocompleteCity } from "../AutocompleteCity";

describe("Autocomplete", () => {
  beforeEach(() => {
    const mockCities = [
      {
        display_name: "Milano, Italia",
        lat: "45.4642",
        lng: "9.1900",
      },
      {
        display_name: "Milano Marittima, Italia",
        lat: "44.286",
        lng: "12.356",
      },
    ];

    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockCities),
      } as Response)
    );
  });
  it("renders the autocomplete correctly", async () => {
    const mockHandleCitySelect = vi.fn();
    render(<AutocompleteCity onSelect={mockHandleCitySelect} />);

    const input = screen.getByLabelText(/inserisci una città/i);
    await userEvent.type(input, "Milano");
  });
  it("shows options and calls onSelect when city is selected", async () => {
    const mockHandleCitySelect = vi.fn();

    render(<AutocompleteCity onSelect={mockHandleCitySelect} />);

    const input = screen.getByLabelText(/inserisci una città/i);
    await userEvent.type(input, "Milano");

    const options = await screen.findAllByRole("option");
    expect(options.length).toBeGreaterThan(0);
    const milanoOption = options.find((opt) =>
      opt.textContent?.includes("Milano")
    );

    expect(milanoOption).toBeDefined();
    if (milanoOption) {
      await userEvent.click(milanoOption);
    }

    expect(mockHandleCitySelect).toHaveBeenCalledWith({
      name: "Milano, Italia",
      lat: 45.4642,
      lng: 9.19,
    });
  });
});
