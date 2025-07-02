import { render, screen } from "@testing-library/react";
import { describe, it, vi, expect } from "vitest";
import type { IBoulder } from "../../../utilities";

describe("LeafletBouldersViewer", () => {
  beforeEach(() => {
    // module reset to mock function differently in each test
    vi.resetModules();
  });

  it("displays marker correctly", async () => {
    vi.doMock("react-leaflet", () => ({
      MapContainer: ({ children }: any) => <div>{children}</div>,
      TileLayer: () => <div>TileLayer</div>,
      Marker: ({ children }: any) => <div>{children}</div>,
      Popup: ({ children }: any) => <div>{children}</div>,
      useMap: () => ({
        setView: vi.fn(),
      }),
    }));

    const bouldersMock: IBoulder[] = [
      {
        latitude: 41.9,
        longitude: 12.5,
        name: "Boulder 1",
        description: "Descrizione 1",
        difficulty: "facile", // esatto valore stringa ammesso
        createdAt: "2023-01-01T00:00:00.000Z",
      },
      {
        latitude: 41.91,
        longitude: 12.51,
        name: "Boulder 2",
        description: "Descrizione 2",
        difficulty: "medio",
        createdAt: "2023-01-02T00:00:00.000Z",
      },
    ];

    // After mocking, import component with the mocks
    const { default: LeafletBouldersViewerMocked } = await import(
      "../../common/LeafletBouldersViewer"
    );

    render(
      <LeafletBouldersViewerMocked boulders={bouldersMock} latLng={[1, 2]} />
    );

    expect(screen.getByText("Boulder 1")).toBeDefined();
    expect(screen.getByText("Descrizione 1")).toBeDefined();
    expect(screen.getByText("Boulder 2")).toBeDefined();
    expect(screen.getByText("Descrizione 2")).toBeDefined();
  });

  it("display text if last boulder is undefined", async () => {
    vi.doMock("react-leaflet", () => ({
      MapContainer: ({ children }: any) => <div>{children}</div>,
      TileLayer: () => <div>TileLayer</div>,
      Marker: ({ children }: any) => <div>{children}</div>,
      Popup: ({ children }: any) => <div>{children}</div>,
      useMap: () => ({
        setView: vi.fn(),
      }),
    }));

    const { default: LeafletBouldersViewerMocked } = await import(
      "../../common/LeafletBouldersViewer"
    );

    render(
      <LeafletBouldersViewerMocked boulders={undefined} latLng={[1, 2]} />
    );

    expect(screen.getByText("Caricamento mppa...")).toBeDefined();
  });
  it("centers map when latLng is defined", async () => {
    const setViewMock = vi.fn();

    vi.doMock("react-leaflet", () => ({
      MapContainer: ({ children }: any) => <div>{children}</div>,
      TileLayer: () => <div>TileLayer</div>,
      Marker: ({ children }: any) => <div>{children}</div>,
      Popup: ({ children }: any) => <div>{children}</div>,
      useMap: () => ({
        setView: setViewMock,
      }),
    }));

    const { default: LeafletBouldersViewerMocked } = await import(
      "../../common/LeafletBouldersViewer"
    );

    render(
      <LeafletBouldersViewerMocked
        boulders={[
          {
            latitude: 41.9,
            longitude: 12.5,
            name: "Boulder 1",
            description: "Descrizione 1",
            difficulty: "facile",
            createdAt: "2023-01-01T00:00:00.000Z",
          },
        ]}
        latLng={[41.9, 12.5]}
      />
    );

    expect(setViewMock).toHaveBeenCalledWith([41.9, 12.5], 17);
  });
});
