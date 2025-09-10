import { render, screen } from "@testing-library/react";
import { describe, it, vi, expect } from "vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import EventCardViewer from "../EventCardViewer";
import { MemoryRouter } from "react-router";

const queryClient = new QueryClient();

vi.mock("../../../services", () => ({
  useGetEvents: () => ({
    data: [
      {
        id: 1,
        name: "Evento 1",
        description: "event test",
        date: "2023-01-01T00:00:00.000Z",
        city: "roma",
        latitude: 1,
        longitude: 2,
        createdAt: "2023-01-01T00:00:00.000Z",
      },
    ],
    isLoading: false,
  }),
  useDeleteEvent: () => ({
    mutateAsync: vi.fn(),
  }),
}));

describe("EventCardViewer", () => {
  it("should render Card", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <EventCardViewer />
        </MemoryRouter>
      </QueryClientProvider>
    );
    expect(screen.getByText(/Evento 1/)).toBeInTheDocument();
  });
});
