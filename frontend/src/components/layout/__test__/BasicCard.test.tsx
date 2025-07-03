import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import BasicCard from "../../common/BasicCard";
import { boulderFixture } from "./fixtures";

const queryClient = new QueryClient();

const mutateAsyncMock = vi.fn();

vi.mock("../../../services", () => ({
  useDeleteBoulder: () => ({
    mutateAsync: mutateAsyncMock,
  }),
  useUpdateBoulder: () => ({
    mutate: mutateAsyncMock,
    isPending: false,
  }),
  useAddBoulder: () => ({
    mutateAsync: vi.fn(),
  }),
}));

describe("BasicCard", () => {
  it("should render correct boulder", () => {
    const mockSetLatLng = vi.fn();

    render(
      <QueryClientProvider client={queryClient}>
        <BasicCard boulder={boulderFixture} setLatLng={mockSetLatLng} />
      </QueryClientProvider>
    );

    expect(screen.getByText("Boulder 1")).toBeInTheDocument();
  });

  it("should call delete mutation on delete click", async () => {
    const mockSetLatLng = vi.fn();
    const user = userEvent.setup();

    mutateAsyncMock.mockResolvedValue(undefined);

    render(
      <QueryClientProvider client={queryClient}>
        <BasicCard boulder={boulderFixture} setLatLng={mockSetLatLng} />
      </QueryClientProvider>
    );

    const deleteButton = screen.getByLabelText("delete");
    await user.click(deleteButton);

    expect(mutateAsyncMock).toHaveBeenCalledWith(123);
  });

  it("should open FullScrreenDialog when edit is clicked", async () => {
    const mockSetLatLng = vi.fn();
    const user = userEvent.setup();

    render(
      <QueryClientProvider client={queryClient}>
        <BasicCard boulder={boulderFixture} setLatLng={mockSetLatLng} />
      </QueryClientProvider>
    );

    const openWindowBtn = screen.getByLabelText("edit");
    await user.click(openWindowBtn);
    expect(await screen.findByText("Boulder editor")).toBeInTheDocument();
  });

  it("should call localizza with correct parameters", async () => {
    const mockSetLatLng = vi.fn();
    const user = userEvent.setup();

    render(
      <QueryClientProvider client={queryClient}>
        <BasicCard boulder={boulderFixture} setLatLng={mockSetLatLng} />
      </QueryClientProvider>
    );
    const localizzaBtn = screen.getByText("Localizza il boulder");
    await user.click(localizzaBtn);
    expect(mockSetLatLng).toHaveBeenCalledWith([
      boulderFixture.latitude,
      boulderFixture.longitude,
    ]);
  });
});
