import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import BasicCard from "../BasicCard";
import { boulderFixture } from "./fixtures";
import { BoulderIdProvider, SnackbarProvider } from "../../../contexts";
import { ThemeProvider } from "@emotion/react";
import { theme } from "../../../theme";

const queryClient = new QueryClient();

const mutateAsyncMock = vi.fn();

vi.mock("../../../services", () => ({
  useDeleteBoulder: () => ({
    mutateAsync: mutateAsyncMock,
  }),
  useUpdateBoulder: () => ({
    mutate: mutateAsyncMock,
    isPending: false,
  }),
  useAddBoulder: () => ({
    mutateAsync: vi.fn(),
  }),
}));

describe("BasicCard", () => {
  it("should render correct boulder", () => {
    const mockSetLatLng = vi.fn();

    render(
      <QueryClientProvider client={queryClient}>
        <BoulderIdProvider>
          <BasicCard boulder={boulderFixture} setLatLng={mockSetLatLng} />
        </BoulderIdProvider>
      </QueryClientProvider>
    );

    expect(screen.getByText("Boulder 1")).toBeInTheDocument();
  });

  it("should open alert dialog when delete icon is clicked", async () => {
    const user = userEvent.setup();
    render(
      <QueryClientProvider client={queryClient}>
        <BoulderIdProvider>
          <BasicCard boulder={boulderFixture} setLatLng={vi.fn()} />
        </BoulderIdProvider>
      </QueryClientProvider>
    );

    const deleteButton = screen.getByLabelText("delete");
    await user.click(deleteButton);

    // Controlla se dialog è aperto verificando testo o bottoni
    expect(screen.getByText(/Cancellazione boulder/i)).toBeInTheDocument();
  });

  it("should call delete mutation when accepting deletion in dialog", async () => {
    const user = userEvent.setup();
    mutateAsyncMock.mockResolvedValue(undefined);

    render(
      <QueryClientProvider client={queryClient}>
        <BoulderIdProvider>
          <BasicCard boulder={boulderFixture} setLatLng={vi.fn()} />
        </BoulderIdProvider>
      </QueryClientProvider>
    );

    const deleteButton = screen.getByLabelText("delete");
    await user.click(deleteButton);

    const acceptButton = screen.getByRole("button", { name: "Accetta" });
    await user.click(acceptButton);

    expect(mutateAsyncMock).toHaveBeenCalledWith(boulderFixture.id);
  });

  it("should open FullScrreenDialog when edit is clicked", async () => {
    const mockSetLatLng = vi.fn();
    const user = userEvent.setup();

    render(
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <BoulderIdProvider>
            <BasicCard boulder={boulderFixture} setLatLng={mockSetLatLng} />
          </BoulderIdProvider>
        </ThemeProvider>
      </QueryClientProvider>
    );

    const openWindowBtn = screen.getByLabelText("edit");
    await user.click(openWindowBtn);
    const dialog = await screen.findByRole("dialog");
    expect(dialog).toHaveTextContent("Boulder Editor - Modifica Boulder");
  });

  it("should call localizza with correct parameters", async () => {
    const mockSetLatLng = vi.fn();
    const user = userEvent.setup();

    render(
      <QueryClientProvider client={queryClient}>
        <BoulderIdProvider>
          <BasicCard boulder={boulderFixture} setLatLng={mockSetLatLng} />
        </BoulderIdProvider>
      </QueryClientProvider>
    );
    const localizzaBtn = screen.getByText("Localizza il boulder");
    await user.click(localizzaBtn);
    expect(mockSetLatLng).toHaveBeenCalledWith([
      boulderFixture.latitude,
      boulderFixture.longitude,
    ]);
  });
  it("should open ImageDisplayerDialog when btn image is clicked", async () => {
    const mockSetLatLng = vi.fn();
    const user = userEvent.setup();

    render(
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <SnackbarProvider>
            <BoulderIdProvider>
              <BasicCard boulder={boulderFixture} setLatLng={mockSetLatLng} />
            </BoulderIdProvider>
          </SnackbarProvider>
        </ThemeProvider>
      </QueryClientProvider>
    );

    const openImageDisplayerBtn = screen.getByRole("button", { name: "image" });
    await user.click(openImageDisplayerBtn);
    const dialog = await screen.findByRole("dialog");
    expect(dialog).toHaveTextContent(/immagini caricate/i);
  });
});
