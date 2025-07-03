import { render, screen, fireEvent } from "@testing-library/react";
import LeafletMapViewer from "../LeafletMapViewer";

vi.mock("react-leaflet", () => ({
  MapContainer: ({ children }: any) => <div data-testid="map">{children}</div>,
  TileLayer: () => <div>TileLayer</div>,
  useMap: () => ({
    setView: vi.fn(),
  }),
  Marker: ({ children, eventHandlers }: any) => (
    <div
      data-testid="marker"
      onDragEnd={() =>
        eventHandlers.dragend({
          target: {
            getLatLng: () => ({ lat: 41.91, lng: 12.51 }),
          },
        })
      }
    >
      {children}
    </div>
  ),
  Popup: ({ children }: any) => <div>{children}</div>,
}));

describe("LeafletMapViewer", () => {
  it("renders map, marker, popup and calls setFormData on drag end", () => {
    const setFormDataMock = vi.fn();

    render(
      <LeafletMapViewer
        latLong={[41.9, 12.5]}
        setFormData={setFormDataMock}
        name="Boulder Name"
      />
    );

    expect(screen.getByTestId("map")).toBeInTheDocument();

    expect(screen.getByTestId("marker")).toBeInTheDocument();
    expect(screen.getByText("Boulder Name")).toBeInTheDocument();

    fireEvent.dragEnd(screen.getByTestId("marker"));

    expect(setFormDataMock).toHaveBeenCalledWith(
      expect.any(Function) // poiché usi updater function
    );

    const updater = setFormDataMock.mock.calls[0][0];
    const result = updater({ latitude: "", longitude: "" /* altri campi */ });
    expect(result.latitude).toBe("41.91");
    expect(result.longitude).toBe("12.51");
  });
});
