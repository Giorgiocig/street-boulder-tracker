import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import BoulderFormRHF from "../BoulderFormRHF";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const queryClient = new QueryClient();
const mutateMock = vi.fn();

vi.mock("../../../services", () => ({
  useAddBoulder: () => ({
    mutate: mutateMock,
  }),
}));

describe("BoulderFormRHF", () => {
  beforeEach(() => {
    // Clear the mock before each test
    mutateMock.mockClear();
  });
  describe("name textField", () => {
    it("should render name textField", () => {
      render(
        <QueryClientProvider client={queryClient}>
          <BoulderFormRHF />
        </QueryClientProvider>
      );
      const nameTextField = screen.getByLabelText("nome boulder");
      expect(nameTextField).toBeInTheDocument();
    });
    it("should render errorText whether textField is empty", async () => {
      render(
        <QueryClientProvider client={queryClient}>
          <BoulderFormRHF />
        </QueryClientProvider>
      );
      const user = userEvent.setup();
      const submitButton = screen.getByRole("button", {
        name: /inserisci boulder/i,
      });
      await user.click(submitButton);
      const errorMsg = await screen.findByText(
        /Il nome del boulder è obbligatorio/i
      );
      expect(errorMsg).toBeInTheDocument();
    });
  });
  it("should calls mutation with correct data", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <BoulderFormRHF />
      </QueryClientProvider>
    );

    // user interactions
    const user = userEvent.setup();
    const nameInput = screen.getByLabelText(/nome boulder/i);
    await user.type(nameInput, "Boulder 1");
    const submitButton = screen.getByRole("button", {
      name: /inserisci boulder/i,
    });
    await user.click(submitButton);

    expect(mutateMock).toHaveBeenCalledTimes(1);
    expect(mutateMock).toHaveBeenCalledWith(
      expect.objectContaining({ name: "Boulder 1" })
    );
  });
});
