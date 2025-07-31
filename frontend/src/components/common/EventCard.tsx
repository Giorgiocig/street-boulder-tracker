import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import type { EventCardProps } from "../../utilities";
import StartIcon from "@mui/icons-material/Start";
import { Button, CardActions, IconButton, Stack } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useDeleteEvent } from "../../services";
import AlertDialog from "./AlertDialog";
import { useState } from "react";
import EventForm from "../layout/EventForm";
import FullScreenDialog from "./FullScreenDialog";
import { useToggle } from "../../customHooks/useToggle";

export default function EventCard({
  handleClickEvent,
  ...event
}: EventCardProps) {
  const deleteEventMutation = useDeleteEvent();
  const [isOpenAlertDialog, setIsOpenAlertDialog] = useState(false);
  const [value, setToggle] = useToggle(false);
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
  return (
    <Card
      sx={{
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <CardContent>
        <Typography gutterBottom sx={{ fontSize: 18, fontWeight: "bold" }}>
          Nome evento : {event.name}
        </Typography>
        <Typography
          variant="body2"
          sx={{ fontSize: 16, padding: "1rem  0 1rem 0 " }}
        >
          Luogo : {event.city}
        </Typography>
        <Typography variant="h5" component="div"></Typography>
        <Typography sx={{ pb: 1.5 }}>
          Descrizione : {event.description}
        </Typography>
        <Typography variant="body2">{event.date}</Typography>
      </CardContent>
      <CardActions>
        <Stack sx={{ gap: 2, alignItems: "center" }}>
          <IconButton
            aria-label="delete"
            onClick={handleClickDelete}
            color="secondary"
            sx={{ width: "3rem" }}
          >
            <DeleteIcon />
          </IconButton>
          <IconButton
            aria-label="edit"
            onClick={setToggle}
            color="secondary"
            sx={{ width: "3rem" }}
          >
            <EditIcon />
          </IconButton>
          <Button
            endIcon={<StartIcon />}
            size="large"
            onClick={() => {
              handleClickEvent(event.id!);
            }}
          >
            Vai ai boulders
          </Button>
        </Stack>
      </CardActions>
      <FullScreenDialog
        setIsOpen={setToggle}
        isOpen={value}
        titleText="Event Editor - Modifica Evento"
      >
        <EventForm event={event} setToggle={setToggle} />
      </FullScreenDialog>
      <AlertDialog
        open={isOpenAlertDialog}
        setOpen={setIsOpenAlertDialog}
        handleDelete={handleDelete}
        entityName={event.name}
        entityTitle="evento"
      />
    </Card>
  );
}
