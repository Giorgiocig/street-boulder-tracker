import { useQuery } from "@tanstack/react-query";
import { getBoulders } from "../boulderApi";

export const useGetBoulders = () => {
  return useQuery({
    queryKey: ["boulders"],
    queryFn: getBoulders,
    refetchOnWindowFocus: false,
  });
};
