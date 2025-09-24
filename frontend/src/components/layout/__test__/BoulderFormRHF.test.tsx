import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import BoulderFormRHF from "../BoulderFormRHF";
import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createTheme, ThemeProvider } from "@mui/material";
import type { Difficulty } from "../../../utilities";

const queryClient = new QueryClient();
const theme = createTheme();
const addMutateMock = vi.fn();
const updateMutateMock = vi.fn();

vi.mock("../../../services", async () => {
  const actual: any = await vi.importActual("../../../services");
  return {
    ...actual,
    useAddBoulder: () => ({ mutate: addMutateMock }),
    useUpdateBoulder: () => ({ mutate: updateMutateMock }),
  };
});

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useParams: () => ({ eventId: "1" }),
  };
});

let mockGeolocation: { latitude: number; longitude: number } | null = null;
let mockRefreshGeolocation = vi.fn();

vi.mock("../../../customHooks/useLocalization", () => {
  return {
    useGeolocation: vi.fn(() => ({
      geolocation: null,
      errorGeolocation: null,
      loadingGeolocation: false,
      refreshGeolocation: mockRefreshGeolocation,
    })),
  };
});

describe("BoulderFormRHF", () => {
  beforeEach(() => {
    // Clear the mock before each test
    addMutateMock.mockClear();
    updateMutateMock.mockClear();
    mockRefreshGeolocation.mockClear();
    mockGeolocation = null;
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
    const latitudeInput = screen
      .getByTestId("latitude-input")
      .querySelector("input");
    await user.clear(latitudeInput!);
    const submitButton = screen.getByRole("button", {
      name: /inserisci boulder/i,
    });
    const latitudeNumberInput = screen.getByTestId("latitude-input");
    await user.type(latitudeNumberInput!, "{selectall}{backspace}");

    await user.click(submitButton);
    const errorMsg = await screen.findByText(/latitudine è obbligatoria./i);
    expect(errorMsg).toBeInTheDocument();
  });
  describe("longitude textField", () => {
    it("should render longitude textfield", () => {
      render(
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={theme}>
            <BoulderFormRHF />
          </ThemeProvider>
        </QueryClientProvider>
      );
      const longitudeNumberInput = screen.getByTestId("longitude-input");
      expect(longitudeNumberInput).toBeInTheDocument();
    });
  });
  it("should render errorText when longitude textField is empty", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <BoulderFormRHF />
        </ThemeProvider>
      </QueryClientProvider>
    );
    const user = userEvent.setup();
    const longitudeInput = screen
      .getByTestId("longitude-input")
      .querySelector("input");
    await user.clear(longitudeInput!);

    const submitButton = screen.getByRole("button", {
      name: /inserisci boulder/i,
    });
    await user.click(submitButton);

    const errorMsg = await screen.findByText(/longitudine è obbligatoria./i);
    expect(errorMsg).toBeInTheDocument();
  });
  describe("localizzati button", () => {
    it("should call refreshGeolocation when Localizzati button is clicked", async () => {
      const user = userEvent.setup();

      render(
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={theme}>
            <BoulderFormRHF />
          </ThemeProvider>
        </QueryClientProvider>
      );

      const button = screen.getByRole("button", { name: /localizzati/i });
      await user.click(button);

      expect(mockRefreshGeolocation).toHaveBeenCalledTimes(1);
    });
    it("should update latitude input field when Localizzati button is clicked", async () => {
      mockGeolocation = { latitude: 42.1234, longitude: 13.5678 };
      const user = userEvent.setup();

      render(
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={theme}>
            <BoulderFormRHF />
          </ThemeProvider>
        </QueryClientProvider>
      );
      const button = screen.getByRole("button", { name: /localizzati/i });
      await user.click(button);

      const latitudeInput = screen.getByTestId("latitude-input");
      const latInput = latitudeInput.querySelector("input")!;
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
    // user interactions
    const user = userEvent.setup();
    // input field
    const latitudeInput = screen.getByTestId("latitude-input");
    const longitudeInput = screen.getByTestId("longitude-input");
    const nameInput = screen.getByLabelText(/nome boulder/i);
    const descriptionInput = screen.getByLabelText("descrizione boulder");
    const select = screen.getByRole("combobox");
    // lat e lng input field
    const latInput = latitudeInput.querySelector("input")!;
    const lngInput = longitudeInput.querySelector("input")!;
    // name
    await user.type(nameInput, "Boulder 1");
    // description
    await user.type(descriptionInput, "Boulder description");
    const submitButton = screen.getByRole("button", {
      name: /inserisci boulder/i,
    });
    // latitude
    await user.clear(latInput);
    await user.type(latInput, "123123");
    //longititude
    await user.clear(lngInput);
    await user.type(lngInput, "123123");
    // select
    await user.click(select);
    const listbox = await screen.findByRole("listbox");
    const option = within(listbox).getByText("medio");

    await user.click(option);
    await user.click(submitButton);

    expect(addMutateMock).toHaveBeenCalledTimes(1);
    expect(addMutateMock).toHaveBeenCalledWith(
      expect.objectContaining({
        name: "Boulder 1",
        description: "Boulder description",
        difficulty: "medio",
        latitude: 123123,
        longitude: 123123,
      })
    );
  });
  it("calls update mutation with correct data", async () => {
    const testBoulder = {
      createdAt: "2025-09-24T07:39:14.748Z",
      description: "d",
      difficulty: "facile" as const,
      eventId: 1,
      id: 1,
      latitude: 43.636028566781,
      longitude: 3.893215656280518,
      name: "boulder fatto bene",
      userId: null,
    };

    render(
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <BoulderFormRHF boulder={testBoulder} />
        </ThemeProvider>
      </QueryClientProvider>
    );

    const user = userEvent.setup();

    const nameInput = screen.getByLabelText(/nome boulder/i);
    const descriptionInput = screen.getByLabelText(/descrizione boulder/i);
    const latitudeInput = screen
      .getByTestId("latitude-input")
      .querySelector("input")!;
    const longitudeInput = screen
      .getByTestId("longitude-input")
      .querySelector("input")!;
    const select = screen.getByRole("combobox");
    const submitButton = screen.getByRole("button", {
      name: /aggiorna boulder/i,
    });

    // Puliamo i campi prima di digitare
    await user.clear(nameInput);
    await user.type(nameInput, "Boulder 1");

    await user.clear(descriptionInput);
    await user.type(descriptionInput, "Boulder description");

    await user.clear(latitudeInput);
    await user.type(latitudeInput, "123123");

    await user.clear(longitudeInput);
    await user.type(longitudeInput, "123123");

    // Cambiamo il select
    await user.click(select);
    const listbox = await screen.findByRole("listbox");
    const option = within(listbox).getByText("medio");
    await user.click(option);

    // Submit del form
    await user.click(submitButton);

    await waitFor(() => {
      expect(updateMutateMock).toHaveBeenCalledTimes(1);
      expect(updateMutateMock).toHaveBeenCalledWith(
        expect.objectContaining({
          id: testBoulder.id,
          data: expect.objectContaining({
            name: "Boulder 1",
            description: "Boulder description",
            difficulty: "medio",
            latitude: 123123,
            longitude: 123123,
          }),
        })
      );
    });
  });
});
