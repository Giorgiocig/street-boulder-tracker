import { renderHook, act } from "@testing-library/react";
import { describe, it, vi, expect } from "vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { useAddBoulder } from "../../../services";
import { SnackbarProvider } from "../../../contexts/SnackbarContext";

/* // Mock addBoulder
vi.mock("../../services/Boulder/boulderApi", () => ({
  addBoulder: vi.fn(() => Promise.resolve({ id: 1, name: "test" })),
}));

// Mock useSnackbar
const showSnackbar = vi.fn();
vi.mock("../hooks/useSnackbar", () => ({
  useSnackbar: () => ({ showSnackbar }),
}));

describe("useAddBoulder", () => {
  it("calls showSnackbar on success", async () => {
    const queryClient = new QueryClient();

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={queryClient}>
        <SnackbarProvider>{children}</SnackbarProvider>
      </QueryClientProvider>
    );

    const { result } = renderHook(() => useAddBoulder(), { wrapper });

    await act(async () => {
      await result.current.mutateAsync({ name: "test-boulder" } as any);
    });
    expect(showSnackbar).toHaveBeenCalledWith("Buolder creato con successo");
  });
}); */
