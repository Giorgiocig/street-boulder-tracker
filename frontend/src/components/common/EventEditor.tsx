import { Box, Button } from "@mui/material";
import FullScreenDialog from "./FullScreenDialog";
import EventForm from "../layout/EventForm";
import { useToggle } from "../../customHooks/useToggle";
import EventCardViewer from "./EventCardViewer";

export default function EventEditor() {
  const [value, setToggle] = useToggle(false);

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
    </Box>
  );
}
