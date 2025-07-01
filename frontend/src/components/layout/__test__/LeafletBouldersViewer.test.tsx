import { render, screen } from "@testing-library/react";
import { describe, it, vi, expect } from "vitest";

describe("BoulderFormContainer", () => {
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
    }));

    vi.doMock("../../../services", () => ({
      useGetBoulders: () => ({
        data: [
          {
            latitude: 41.9,
            longitude: 12.5,
            name: "Boulder 1",
            description: "Descrizione 1",
            difficulty: "facile",
          },
          {
            latitude: 41.91,
            longitude: 12.51,
            name: "Boulder 2",
            description: "Descrizione 2",
            difficulty: "medio",
          },
        ],
        isLoading: false,
        isError: false,
      }),
    }));

    // After mocking, import component with the mocks
    const { default: LeafletBouldersViewerMocked } = await import(
      "../../common/LeafletBouldersViewer"
    );

    render(<LeafletBouldersViewerMocked />);

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
    }));

    vi.doMock("../../../services", () => ({
      useGetBoulders: () => ({
        data: null,
        isLoading: true,
        isError: false,
      }),
    }));

    const { default: LeafletBouldersViewerMocked } = await import(
      "../../common/LeafletBouldersViewer"
    );

    render(<LeafletBouldersViewerMocked />);

    expect(screen.getByText("Caricamento mppa...")).toBeDefined();
  });
});
