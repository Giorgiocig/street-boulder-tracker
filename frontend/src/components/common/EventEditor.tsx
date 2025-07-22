import { Box, Button } from "@mui/material";
import FullScreenDialog from "./FullScreenDialog";
import EventForm from "../layout/EventForm";
import { useToggle } from "../../customHooks/useToggle";
import EventCardViewer from "./EventCardViewer";

export default function EventEditor() {
  const [value, setToggle] = useToggle(false);

  return (
    <Box>
      <Button
        onClick={() => {
          setToggle(true);
        }}
      >
        Add Event
      </Button>
      <EventCardViewer />
      <FullScreenDialog
        setIsOpen={setToggle}
        isOpen={value}
        titleText="Evento Editor - Inserisci Evento"
      >
        <EventForm />
      </FullScreenDialog>
    </Box>
  );
}
