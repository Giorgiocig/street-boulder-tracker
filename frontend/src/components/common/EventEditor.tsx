import { Box, Button } from "@mui/material";
import FullScreenDialog from "./FullScreenDialog";
import EventForm from "../layout/EventForm";
import { useToggle } from "../../customHooks/useToggle";
import EventCardViewer from "./EventCardViewer";
import PositionedSnackbar from "../form/Snackbar";
import { useState } from "react";

export default function EventEditor() {
  const [value, setToggle] = useToggle(false);
  const [valueSnackbar, setToggleSnackbar] = useToggle(true);
  const [messageSnackbar, setMessageSnackbar] = useState<string>("");
  return (
    <Box sx={{ "max-width": "1280px", margin: " 0 auto", minHeight: "84.3vh" }}>
      <Button
        variant="contained"
        size="large"
        onClick={() => {
          setToggle(true);
        }}
        sx={{ marginBottom: "2rem" }}
      >
        Aggiungi Evento
      </Button>
      <EventCardViewer />
      <FullScreenDialog
        setIsOpen={setToggle}
        isOpen={value}
        titleText="Evento Editor - Inserisci Evento"
      >
        <EventForm setToggle={setToggle} />
      </FullScreenDialog>
      <PositionedSnackbar
        open={valueSnackbar}
        messageSnackbar={messageSnackbar}
      />
    </Box>
  );
}
