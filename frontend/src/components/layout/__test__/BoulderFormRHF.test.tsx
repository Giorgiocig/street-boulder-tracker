import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import BoulderFormRHF from "../BoulderFormRHF";
import { render, screen, within } from "@testing-library/react";
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
  describe("descritpion textField", () => {
    it("should render description textField", () => {
      render(
        <QueryClientProvider client={queryClient}>
          <BoulderFormRHF />
        </QueryClientProvider>
      );
      const descriprionTextField = screen.getByLabelText("descrizione boulder");
      expect(descriprionTextField).toBeInTheDocument();
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
        /la descrizione è obbligatoria/i
      );
      expect(errorMsg).toBeInTheDocument();
    });
  });
  describe("select difficulty Select", () => {
    it("should render difficulty select", () => {
      render(
        <QueryClientProvider client={queryClient}>
          <BoulderFormRHF />
        </QueryClientProvider>
      );

      const select = screen.getByRole("combobox");
      expect(select).toBeInTheDocument();
    });
    it("should select a difficulty", async () => {
      render(
        <QueryClientProvider client={queryClient}>
          <BoulderFormRHF />
        </QueryClientProvider>
      );
      //click on select
      const user = userEvent.setup();
      const select = screen.getByRole("combobox");
      await user.click(select);

      // select difficulty
      const listbox = await screen.findByRole("listbox");
      const option = within(listbox).getByText("medio");
      await user.click(option);
      expect(select).toHaveTextContent("medio");
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
    // input field
    const nameInput = screen.getByLabelText(/nome boulder/i);
    const descriptionInput = screen.getByLabelText("descrizione boulder");
    const select = screen.getByRole("combobox");
    // typing
    await user.type(nameInput, "Boulder 1");
    await user.type(descriptionInput, "Boulder description");
    const submitButton = screen.getByRole("button", {
      name: /inserisci boulder/i,
    });
    // select
    await user.click(select);
    const listbox = await screen.findByRole("listbox");
    const option = within(listbox).getByText("medio");

    await user.click(option);
    await user.click(submitButton);

    expect(mutateMock).toHaveBeenCalledTimes(1);
    expect(mutateMock).toHaveBeenCalledWith(
      expect.objectContaining({
        name: "Boulder 1",
        description: "Boulder description",
        difficulty: "medio",
      })
    );
  });
});
