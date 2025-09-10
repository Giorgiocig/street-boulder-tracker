import { render, screen } from "@testing-library/react";
import { describe, it, vi, expect } from "vitest";
import BoulderCardViewer from "../../common/BoulderCardViewer";
import { type Difficulty } from "../../../utilities";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SnackbarProvider } from "../../../contexts/SnackbarContext";

const queryClient = new QueryClient();

describe("BoulderCardViewer", () => {
  it("should render Card", () => {
    const setLatLngMock = vi.fn();
    const boulders = [
      {
        latitude: 41.9,
        longitude: 12.5,
        name: "Boulder 1",
        description: "Descrizione 1",
        difficulty: "facile" as Difficulty,
        createdAt: "2023-01-01T00:00:00.000Z",
      },
    ];
    render(
      <QueryClientProvider client={queryClient}>
        <SnackbarProvider>
          <BoulderCardViewer boulders={boulders} setLatLng={setLatLngMock} />
        </SnackbarProvider>
      </QueryClientProvider>
    );
    expect(screen.getByText("Boulder 1")).toBeInTheDocument();
  });
});
