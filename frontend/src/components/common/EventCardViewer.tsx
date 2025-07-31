import { Grid } from "@mui/material";
import { useGetEvents } from "../../services";
import EventCard from "./EventCard";
import type { IEventCard, IEventForm } from "../../utilities";
import { useNavigate } from "react-router";

export default function EventCardViewer() {
  const response = useGetEvents();
  const { data } = response;
  const navigate = useNavigate();

  const handleClickEvent = (eventId: number) => {
    navigate(`/event/${eventId}`);
  };

  return (
    <Grid container spacing={2}>
      {data &&
        data.map((event: IEventCard) => (
          <Grid size={6} key={event.id}>
            <EventCard
              key={event.id}
              {...(event as IEventForm)}
              handleClickEvent={handleClickEvent}
            />
          </Grid>
        ))}
    </Grid>
  );
}
