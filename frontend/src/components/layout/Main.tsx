import { useState } from "react";
import { Button } from "@mui/material";
import BoulderForm from "./BoulderForm";
import BouldersViewer from "./BouldersViewer";
import FullScreenDialog from "../common/FullScreenDialog";

export default function Main() {
  const [isOpen, setIsOpen] = useState(false);

  const handleClickOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Button variant="contained" size="large" onClick={handleClickOpen}>
        Inserisici boulder
      </Button>
      <FullScreenDialog setIsOpen={setIsOpen} isOpen={isOpen}>
        <BoulderForm />
      </FullScreenDialog>

      <BouldersViewer />
    </>
  );
}
