import { cleanup, logRoles, render, screen } from "@testing-library/react";
import { describe, it, vi, expect } from "vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ImageDisplayerStep from "../ImageDisplayerStep";
import testImg from "./testImg/testimage.jpeg";
import { BoulderIdProvider } from "../../../contexts";
import { userEvent, type UserEvent } from "@testing-library/user-event";
import { useDeleteBoulderImage } from "../../../services/BoulderImage";

const queryClient = new QueryClient();
const mockMutate = vi.fn();

vi.mock("../../../services/BoulderImage/queries/queries", () => ({
  useGetBoulderImages: vi.fn(() => ({
    data: [
      {
        boulderId: 2,
        id: 5,
        public_id: "boulders/s3sx7gantis1ncqhmunf",
        uploadedAt: "2025-09-29T08:51:53.235Z",
        url: testImg,
      },
    ],
    isLoading: false,
    isError: false,
  })),
}));

vi.mock("../../../services/BoulderImage/mutations/mutations", () => ({
  useDeleteBoulderImage: vi.fn(() => ({
    mutate: mockMutate,
  })),
}));

describe("ImageDisplayerStep", () => {
  let user: UserEvent;
  beforeEach(() => {
    user = userEvent.setup();
    const { container } = render(
      <QueryClientProvider client={queryClient}>
        <BoulderIdProvider>
          <ImageDisplayerStep />
        </BoulderIdProvider>
      </QueryClientProvider>
    );
    screen.debug();
    logRoles(container);
  });
  afterEach(() => {
    cleanup();
  });
  it("should display image", () => {
    const img = screen.getByRole("img");
    expect(img).toBeInTheDocument();
  });
  it("should render the delete btn", () => {
    const handleDeleteBtn = screen.getAllByRole("button", {
      name: "delete btn",
    });
    expect(handleDeleteBtn).toHaveLength(1);
  });
  it("should call mutate when delete button is clicked", async () => {
    const deleteBtn = screen.getByRole("button", { name: "delete btn" });
    await user.click(deleteBtn);
    expect(mockMutate).toHaveBeenCalledTimes(1);
    expect(mockMutate).toHaveBeenCalledWith("boulders%2Fs3sx7gantis1ncqhmunf");
  });
});
