import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import EventCard from "../EventCard";
import { eventFixture } from "./fixtures";
import type { IEventForm } from "../../../utilities";

const queryClient = new QueryClient();

const mutateAsyncMock = vi.fn();

vi.mock("../../../services", () => ({
  useDeleteEvent: () => ({
    mutateAsync: mutateAsyncMock,
  }),
  useUpdateEvent: () => ({
    mutate: mutateAsyncMock,
    isPending: false,
  }),
  useAddEvent: () => ({
    mutateAsync: vi.fn(),
  }),
}));

describe("EventCard", () => {
  it("should render correct event", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <EventCard {...eventFixture} />
      </QueryClientProvider>
    );

    // Soluzione 1: Usa una funzione matcher più flessibile
    expect(screen.getByText(/Evento 1/i)).toBeInTheDocument();
  });
  it("should open alert dialog when delete icon is clicked", async () => {
    const user = userEvent.setup();
    render(
      <QueryClientProvider client={queryClient}>
        <EventCard {...eventFixture} />
      </QueryClientProvider>
    );

    const deleteButton = screen.getByLabelText("delete");
    await user.click(deleteButton);

    // Controlla se dialog è aperto verificando testo o bottoni
    expect(screen.getByText(/Cancellazione /i)).toBeInTheDocument();
  });

  it("should call delete mutation when accepting deletion in dialog", async () => {
    const user = userEvent.setup();
    mutateAsyncMock.mockResolvedValue(undefined);

    render(
      <QueryClientProvider client={queryClient}>
        <EventCard {...eventFixture} />
      </QueryClientProvider>
    );

    const deleteButton = screen.getByLabelText("delete");
    await user.click(deleteButton);

    const acceptButton = screen.getByRole("button", { name: "Accetta" });
    await user.click(acceptButton);

    expect(mutateAsyncMock).toHaveBeenCalledWith(eventFixture.id);
  });
  it("should open FullScrreenDialog when edit is clicked", async () => {
    const user = userEvent.setup();

    render(
      <QueryClientProvider client={queryClient}>
        <EventCard {...eventFixture} />
      </QueryClientProvider>
    );

    const openWindowBtn = screen.getByLabelText("edit");
    await user.click(openWindowBtn);
    const dialog = await screen.findByRole("dialog");
    expect(dialog).toHaveTextContent("Event Editor - Modifica Evento");
  });
});
