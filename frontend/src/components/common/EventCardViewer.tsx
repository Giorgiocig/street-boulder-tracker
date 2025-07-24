import { Box } from "@mui/material";
import { useGetEvents } from "../../services";
import EventCard from "./EventCard";
import type { IEventCard, IEventForm } from "../../utilities";

export default function EventCardViewer() {
  const response = useGetEvents();
  const { data } = response;

  return (
    <Box>
      {data &&
        data.map((event: IEventCard) => (
          <EventCard key={event.id} {...(event as IEventForm)} />
        ))}
    </Box>
  );
}
