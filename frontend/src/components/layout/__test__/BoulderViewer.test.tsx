import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import BouldersViewer from "../BouldersViewer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MemoryRouter, Route, Routes } from "react-router";

const queryClient = new QueryClient();

vi.mock("../../../services", () => {
  return {
    useGetBoulders: () => ({
      data: [
        {
          id: 1,
          latitude: 41.9,
          longitude: 12.5,
          name: "Boulder 1",
          description: "Descrizione 1",
          difficulty: "facile",
          createdAt: "2023-01-01T00:00:00.000Z",
        },
      ],
    }),

    useGetEventWithBoulders: vi.fn(() => ({
      data: {
        id: 1,
        name: "Evento 1",
        boulders: [
          {
            id: 1,
            latitude: 41.9,
            longitude: 12.5,
            name: "Boulder 1",
          },
        ],
      },
      isLoading: false,
      error: null,
    })),
  };
});

// Mock di LeafletBouldersViewer
vi.mock("../../common/LeafletBouldersViewer", () => ({
  default: ({ latLng }: { boulders: any; latLng: [number, number] | null }) => (
    <div data-testid="leaflet" data-lat={latLng?.[0]} data-lng={latLng?.[1]}>
      Leaflet Map
    </div>
  ),
}));

// Mock di BoulderCardViewer
vi.mock("../../common/BoulderCardViewer", () => ({
  default: ({
    boulders,
    setLatLng,
  }: {
    boulders?: any;
    setLatLng: Function;
  }) => (
    <>
      {/* Verifica che boulders esista e abbia la proprietà boulders */}
      {boulders?.boulders?.map((b: any) => (
        <button
          key={b.id}
          onClick={() => setLatLng([b.latitude, b.longitude])}
          aria-label={`localizza-${b.id}`}
        >
          Localizza {b.name}
        </button>
      ))}
    </>
  ),
}));

test("aggiorna latLng su click e passa la nuova posizione a LeafletBouldersViewer", async () => {
  const user = userEvent.setup();

  render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={["/boulders/1"]}>
        <Routes>
          <Route path="/boulders/:eventId" element={<BouldersViewer />} />
        </Routes>
      </MemoryRouter>
    </QueryClientProvider>
  );

  const btn = await screen.findByLabelText("localizza-1");
  expect(btn).toBeInTheDocument();

  await user.click(btn);

  const leaflet = screen.getByTestId("leaflet");
  expect(leaflet).toHaveAttribute("data-lat", "41.9");
  expect(leaflet).toHaveAttribute("data-lng", "12.5");
});
