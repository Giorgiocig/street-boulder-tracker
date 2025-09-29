import { render, screen } from "@testing-library/react";
import { describe, it, vi, expect } from "vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ImageDisplayerStep from "../ImageDisplayerStep";
import testImg from "./testImg/testimage.jpeg";
import { BoulderIdProvider } from "../../../contexts";

const queryClient = new QueryClient();

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

describe("ImageDisplayerStep", () => {
  it("should display image", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <BoulderIdProvider>
          <ImageDisplayerStep />
        </BoulderIdProvider>
      </QueryClientProvider>
    );
    const img = screen.getByRole("img");
    expect(img).toBeInTheDocument();
  });
});
