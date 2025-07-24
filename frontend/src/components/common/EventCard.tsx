import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import type { IEventForm } from "../../utilities";
import { CardActions, IconButton, Stack } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useDeleteEvent } from "../../services";
import AlertDialog from "./AlertDialog";
import { useState } from "react";
import EventForm from "../layout/EventForm";
import FullScreenDialog from "./FullScreenDialog";

export default function EventCard(event: IEventForm) {
  const deleteEventMutation = useDeleteEvent();
  const [isOpenAlertDialog, setIsOpenAlertDialog] = useState(false);
  const [isOpenFullScreenDialog, setIsOpenFullScreenDialog] = useState(false);

  const handleClickDelete = () => {
    setIsOpenAlertDialog(true);
  };

  const handleDelete = async () => {
    if (typeof event.id === "number")
      await deleteEventMutation.mutateAsync(event.id);
    else {
      console.error("ID del event non valido:", event.id);
    }
  };

  const handleClickEdit = () => {
    setIsOpenFullScreenDialog(true);
  };
  console.log(event.city);
  return (
    <Card
      sx={{
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <CardContent>
        <Typography gutterBottom sx={{ color: "text.secondary", fontSize: 14 }}>
          {event.name}
        </Typography>
        <Typography variant="body2">{event.city}</Typography>
        <Typography variant="h5" component="div"></Typography>
        <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
          {event.description}
        </Typography>
        <Typography variant="body2">{event.date}</Typography>
      </CardContent>
      <CardActions>
        <Stack sx={{ gap: 2 }}>
          <IconButton
            aria-label="delete"
            onClick={handleClickDelete}
            color="secondary"
          >
            <DeleteIcon />
          </IconButton>
          <IconButton
            aria-label="edit"
            onClick={handleClickEdit}
            color="secondary"
          >
            <EditIcon />
          </IconButton>
        </Stack>
      </CardActions>
      <FullScreenDialog
        setIsOpen={setIsOpenFullScreenDialog}
        isOpen={isOpenFullScreenDialog}
        titleText="Event Editor - Modifica Evento"
      >
        <EventForm event={event} />
      </FullScreenDialog>
      <AlertDialog
        open={isOpenAlertDialog}
        setOpen={setIsOpenAlertDialog}
        handleDelete={handleDelete}
        entityName={event.name}
        entityTitle="evento"
      />
      {isOpenFullScreenDialog && <EventForm event={event} />}
    </Card>
  );
}
