import { useState } from "react";
import { Box, Button } from "@mui/material";
import BoulderForm from "./BoulderForm";
import BouldersViewer from "./BouldersViewer";
import FullScreenDialog from "../common/FullScreenDialog";

export default function BoulderEditor() {
  const [isOpen, setIsOpen] = useState(false);

  const handleClickOpen = () => {
    setIsOpen(!isOpen);
  };
  return (
    <Box sx={{ "max-width": "1280px", margin: " 0 auto", minHeight: "84.3vh" }}>
      <Button variant="contained" size="large" onClick={handleClickOpen}>
        Inserisici boulder
      </Button>
      <FullScreenDialog setIsOpen={setIsOpen} isOpen={isOpen}>
        <BoulderForm />
      </FullScreenDialog>
      <BouldersViewer />
    </Box>
  );
}
