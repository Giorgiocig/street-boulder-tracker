import { Box } from "@mui/material";
import { useGetEvents } from "../../services";
import EventCard from "./EventCard";
import type { IEventCard } from "../../utilities";

export default function EventCardViewer() {
  const response = useGetEvents();
  const { data } = response;
  return (
    <Box>
      {data &&
        data.map((event: IEventCard) => (
          <EventCard
            key={event.id}
            name={event.name}
            description={event.description}
            date={event.date}
            city={event.city}
          />
        ))}
    </Box>
  );
}
