import { useQuery } from "@tanstack/react-query";
import { getBoulders } from "../api";

export const useGetBoulders = () => {
  return useQuery({
    queryKey: ["boulders"],
    queryFn: getBoulders,
    refetchOnWindowFocus: false,
  });
};
