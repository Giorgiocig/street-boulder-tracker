import { useQuery } from "@tanstack/react-query";
import { getEvents } from "../eventApi";

export const useGeEvents = () => {
  return useQuery({
    queryKey: ["events"],
    queryFn: getEvents,
    refetchOnWindowFocus: false,
  });
};
