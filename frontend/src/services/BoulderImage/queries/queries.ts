import { useQuery } from "@tanstack/react-query";
import { getBoulderImages } from "../boulderImageApi";

export const useGetBoulderImages = (boulderId: number) => {
  return useQuery({
    queryKey: ["boulders"],
    queryFn: () => getBoulderImages(boulderId),
    refetchOnWindowFocus: false,
  });
};
