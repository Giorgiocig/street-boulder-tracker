import { useQuery } from "@tanstack/react-query";
import { getEvents } from "../eventApi";

export const useGetEvents = () => {
  return useQuery({
    queryKey: ["events"],
    queryFn: getEvents,
    refetchOnWindowFocus: false,
  });
};
