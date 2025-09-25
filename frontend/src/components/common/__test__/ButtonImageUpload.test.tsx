import { createTheme, ThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, vi, expect } from "vitest";
import ButtonImageUpload from "../ButtonImageUpload";
import { BoulderIdProvider } from "../../../contexts";

const queryClient = new QueryClient();
const theme = createTheme();
const uploadImageMutateMock = vi.fn();

vi.mock("../../../services/BoulderImage", () => ({
  useAddBoulderImage: () => ({ mutate: uploadImageMutateMock }),
}));

const mockSetBoulderIdCtx = vi.fn();
vi.mock("../../../customHooks/useBoulderId", () => ({
  useBoulderId: () => ({
    boulderIdCtx: 1, // Impostiamo un valore fisso per il test
    setBoulderIdCtx: mockSetBoulderIdCtx,
  }),
}));

describe("ButtonImageUpload", () => {
  beforeEach(() => {
    // Clear the mock before each test
    uploadImageMutateMock.mockClear();
    mockSetBoulderIdCtx.mockClear();
  });
  it("should call the mutation with the correct data", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <BoulderIdProvider>
            <ButtonImageUpload />
          </BoulderIdProvider>
        </ThemeProvider>
      </QueryClientProvider>
    );
    const input = screen.getByLabelText(/upload immagine/i); // usa il testo del button
    const file = new File(["test"], "test.png", { type: "image/png" });

    await userEvent.upload(input, file);

    expect(uploadImageMutateMock).toHaveBeenCalledWith({
      data: file,
      boulderId: 1,
    });
  });
});
