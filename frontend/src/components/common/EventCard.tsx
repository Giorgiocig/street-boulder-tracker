import {
  Card,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  Button,
  Stack,
  Box,
  Chip,
  Divider,
} from "@mui/material";
import type { EventCardProps } from "../../utilities";
import StartIcon from "@mui/icons-material/Start";
import PlaceIcon from "@mui/icons-material/Place";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useDeleteEvent } from "../../services";
import AlertDialog from "./AlertDialog";
import { useEffect, useState } from "react";
import EventForm from "../layout/EventForm";
import FullScreenDialog from "./FullScreenDialog";
import { useToggle } from "../../customHooks/useToggle";
import { useLatLong } from "../../customHooks/useLatLong";

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
  //context

  const { latLongCtx, setLatLongCtx } = useLatLong();
  useEffect(() => {
    if (event.latitude && event.longitude) {
      setLatLongCtx([event.latitude, event.longitude]);
    }
  }, []);

  const handleDelete = async () => {
    if (typeof event.id === "number")
      await deleteEventMutation.mutateAsync(event.id);
    else {
      console.error("ID del event non valido:", event.id);
    }
  };
  return (
    <>
      <Card
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          borderRadius: 4,
          overflow: "hidden",
          transition: "all 0.3s ease",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: "0px 12px 24px rgba(0, 0, 0, 0.15)",
          },
        }}
      >
        {/* Content Section */}
        <CardContent
          sx={{
            flex: 1,
            p: 3,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          {/* Header with Name */}
          <Box>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                color: "primary.main",
                mb: 0.5,
              }}
            >
              {event.name}
            </Typography>
          </Box>

          {/* Location and Date */}
          <Box
            sx={{
              display: "flex",
              gap: 2,
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <Chip
              icon={<PlaceIcon />}
              label={event.city}
              size="small"
              sx={{
                backgroundColor: "secondary.light",
                color: "secondary.contrastText",
                fontWeight: 500,
                "& .MuiChip-icon": {
                  color: "secondary.contrastText",
                },
              }}
            />
            <Chip
              icon={<CalendarTodayIcon />}
              label={event.date}
              size="small"
              variant="outlined"
              sx={{
                borderColor: "divider",
                fontWeight: 500,
              }}
            />
          </Box>

          {/* Description */}
          <Box>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                lineHeight: 1.7,
                fontSize: "0.95rem",
              }}
            >
              {event.description}
            </Typography>
          </Box>
        </CardContent>

        <Divider
          orientation="vertical"
          flexItem
          sx={{ display: { xs: "none", md: "block" } }}
        />
        <Divider sx={{ display: { xs: "block", md: "none" } }} />

        {/* Actions Section */}
        <CardActions
          sx={{
            p: 3,
            minWidth: { xs: "100%", md: 200 },
          }}
        >
          <Stack
            spacing={2}
            sx={{
              width: "100%",
              alignItems: { xs: "stretch", md: "center" },
            }}
          >
            {/* Primary Action Button */}
            <Button
              variant="contained"
              endIcon={<StartIcon />}
              size="large"
              fullWidth
              onClick={() => {
                handleClickEvent(event.id!);
              }}
              sx={{
                fontWeight: 600,
                borderRadius: 2,
                py: 1.5,
                boxShadow: "0px 4px 12px rgba(44, 95, 124, 0.25)",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: "0px 6px 16px rgba(44, 95, 124, 0.35)",
                },
              }}
            >
              Vai ai Boulders
            </Button>

            {/* Secondary Actions */}
            <Box
              sx={{
                display: "flex",
                gap: 1,
                justifyContent: "center",
              }}
            >
              <IconButton
                aria-label="modifica evento"
                onClick={setToggle}
                color="primary"
                sx={{
                  width: 48,
                  height: 48,
                  border: (theme) => `1px solid ${theme.palette.divider}`,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor: "primary.main",
                    color: "primary.contrastText",
                    transform: "scale(1.1)",
                  },
                }}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                aria-label="elimina evento"
                onClick={handleClickDelete}
                color="error"
                sx={{
                  width: 48,
                  height: 48,
                  border: (theme) => `1px solid ${theme.palette.divider}`,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor: "error.main",
                    color: "error.contrastText",
                    transform: "scale(1.1)",
                  },
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          </Stack>
        </CardActions>
      </Card>

      {/* Dialogs */}
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
    </>
  );
}
