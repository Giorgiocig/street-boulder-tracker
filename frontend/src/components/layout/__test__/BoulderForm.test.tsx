import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, vi, expect } from "vitest";
import BoulderForm from "../BoulderForm";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
const mutateMock = vi.fn();

let mockGeolocation: null | { latitude: number; longitude: number } = null;

vi.mock("../../../services", () => ({
  useAddBoulder: () => ({
    mutate: mutateMock,
    isPending: false,
  }),
  useUpdateBoulder: () => ({
    mutate: mutateMock,
    isPending: false,
  }),
}));

vi.mock("../../../customHooks/useLocalization", () => ({
  useGeolocation: () => {
    return {
      geolocation: mockGeolocation,
      errorGeolocation: false,
      loadingGeolocation: false,
    };
  },
}));

describe("BoulderForm", () => {
  it("submits the form with correct data", async () => {
    const user = userEvent.setup();

    render(
      <QueryClientProvider client={queryClient}>
        <BoulderForm />
      </QueryClientProvider>
    );

    await user.type(screen.getByLabelText("nome"), "Test Boulder");
    await user.type(screen.getByLabelText("descrizione"), "Una descrizione");
    await user.type(screen.getByLabelText("lat"), "45.0");
    await user.type(screen.getByLabelText("long"), "9.0");

    // click on select
    const select = screen.getByRole("combobox");
    await user.click(select);

    // select difficulty
    const listbox = await screen.findByRole("listbox");
    const mediaOption = within(listbox).getByText("medio");
    await user.click(mediaOption);

    //submit form
    const submitBtn = screen.getByRole("button", { name: /salva il boulder/i });
    await user.click(submitBtn);

    expect(mutateMock).toHaveBeenCalledWith({
      name: "Test Boulder",
      description: "Una descrizione",
      difficulty: "medio",
      latitude: 45.0,
      longitude: 9.0,
      createdAt: expect.any(String),
    });
  }, 10000);

  it('updates lat/long when "Localizzati" is clicked', async () => {
    // mock values
    mockGeolocation = { latitude: 42.1234, longitude: 13.5678 };

    render(
      <QueryClientProvider client={queryClient}>
        <BoulderForm />
      </QueryClientProvider>
    );

    const user = userEvent.setup();

    const button = screen.getByRole("button", { name: /localizzati/i });
    await user.click(button);

    expect(screen.getByLabelText(/^lat$/i)).toHaveValue("42.1234");
    expect(screen.getByLabelText(/^long$/i)).toHaveValue("13.5678");
  });
});
