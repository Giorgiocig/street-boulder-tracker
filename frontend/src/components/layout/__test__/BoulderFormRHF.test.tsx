import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import BoulderFormRHF from "../BoulderFormRHF";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createTheme, ThemeProvider } from "@mui/material";

const queryClient = new QueryClient();
const theme = createTheme();
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
          <ThemeProvider theme={theme}>
            <BoulderFormRHF />
          </ThemeProvider>
        </QueryClientProvider>
      );
      const nameTextField = screen.getByLabelText("nome boulder");
      expect(nameTextField).toBeInTheDocument();
    });
    it("should render errorText whether textField is empty", async () => {
      render(
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={theme}>
            <BoulderFormRHF />
          </ThemeProvider>
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
          <ThemeProvider theme={theme}>
            <BoulderFormRHF />
          </ThemeProvider>
        </QueryClientProvider>
      );
      const descriprionTextField = screen.getByLabelText("descrizione boulder");
      expect(descriprionTextField).toBeInTheDocument();
    });
    it("should render errorText whether textField is empty", async () => {
      render(
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={theme}>
            <BoulderFormRHF />
          </ThemeProvider>
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
          <ThemeProvider theme={theme}>
            <BoulderFormRHF />
          </ThemeProvider>
        </QueryClientProvider>
      );

      const select = screen.getByRole("combobox");
      expect(select).toBeInTheDocument();
    });
    it("should select a difficulty", async () => {
      render(
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={theme}>
            <BoulderFormRHF />
          </ThemeProvider>
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
  describe("latitude textField", () => {
    it("should render latitude textfield", () => {
      render(
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={theme}>
            <BoulderFormRHF />
          </ThemeProvider>
        </QueryClientProvider>
      );
      const latitudeNumberInput = screen.getByTestId("latitude-input");
      expect(latitudeNumberInput).toBeInTheDocument();
    });
  });
  it("should render errorText whether latitude textField is empty", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <BoulderFormRHF />
        </ThemeProvider>
      </QueryClientProvider>
    );
    const user = userEvent.setup();
    const submitButton = screen.getByRole("button", {
      name: /inserisci boulder/i,
    });
    await user.click(submitButton);
    const errorMsg = await screen.findByText(/latitudine è obbligatoria./i);
    expect(errorMsg).toBeInTheDocument();
  });
});
it("should calls mutation with correct data", async () => {
  render(
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <BoulderFormRHF />
      </ThemeProvider>
    </QueryClientProvider>
  );
  const lat = 123123;
  // user interactions
  const user = userEvent.setup();
  // input field
  const nameInput = screen.getByLabelText(/nome boulder/i);
  const descriptionInput = screen.getByLabelText("descrizione boulder");
  const select = screen.getByRole("combobox");
  const latitudeInput = screen.getByTestId("latitude-input");
  // name
  await user.type(nameInput, "Boulder 1");
  // description
  await user.type(descriptionInput, "Boulder description");
  const submitButton = screen.getByRole("button", {
    name: /inserisci boulder/i,
  });
  // latitude
  await user.type(latitudeInput, lat.toString());
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
      latitude: 123123,
    })
  );
});
