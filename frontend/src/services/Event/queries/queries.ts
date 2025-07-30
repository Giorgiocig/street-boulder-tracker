import { useQuery } from "@tanstack/react-query";
import { getEvents, getEventWithBouldersById } from "../eventApi";

export const useGetEvents = () => {
  return useQuery({
    queryKey: ["events"],
    queryFn: getEvents,
    refetchOnWindowFocus: false,
  });
};

export const useGetEventWithBoulders = (eventId: number) => {
  return useQuery({
    queryKey: ["events"],
    queryFn: () => getEventWithBouldersById(eventId),
  });
};
