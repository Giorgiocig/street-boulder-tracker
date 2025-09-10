import { render, screen, within, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, vi, expect, afterEach, beforeAll } from "vitest";
import BoulderForm from "../BoulderForm";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
const mutateMock = vi.fn();

let mockGeolocation: null | { latitude: number; longitude: number } = null;

// services mock
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

// custom geolocalization mock
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
  beforeAll(() => {
    // blocco la data in tutti i test
    vi.setSystemTime(new Date("2025-09-10T14:42:09.332Z"));
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.clearAllMocks();
    mockGeolocation = null;
  });

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

    //click on select
    const select = screen.getByRole("combobox");
    await user.click(select);

    // select difficulty
    const listbox = await screen.findByRole("listbox");
    const mediaOption = within(listbox).getByText("medio");
    await user.click(mediaOption);

    //submit form
    const submitBtn = screen.getByRole("button", { name: /salva il boulder/i });
    await user.click(submitBtn);

    await waitFor(() => {
      expect(mutateMock).toHaveBeenCalledWith(
        expect.objectContaining({
          name: "Test Boulder",
          description: "Una descrizione",
          difficulty: "medio",
          latitude: 45.0,
          longitude: 9.0,
          createdAt: expect.any(String),
        })
      );
    });
  }, 10000);

  it('updates lat/long when "Localizzati" is clicked', async () => {
    // mock geolocalization values
    mockGeolocation = { latitude: 42.1234, longitude: 13.5678 };

    render(
      <QueryClientProvider client={queryClient}>
        <BoulderForm />
      </QueryClientProvider>
    );

    const user = userEvent.setup();
    const button = screen.getByRole("button", { name: /localizzati/i });
    await user.click(button);

    await waitFor(() => {
      expect(screen.getByLabelText(/^lat$/i)).toHaveValue("42.1234");
      expect(screen.getByLabelText(/^long$/i)).toHaveValue("13.5678");
    });
  }, 10000);
});
