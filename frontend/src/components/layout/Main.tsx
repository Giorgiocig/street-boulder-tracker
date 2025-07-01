import { useState } from "react";
import { Button } from "@mui/material";
import BoulderForm from "./BoulderForm";
import BouldersViewer from "./BouldersViewer";

export default function Main() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="contained" size="large" onClick={() => setOpen(!open)}>
        Inserisici boulder
      </Button>
      {open && <BoulderForm />}
      <BouldersViewer />
    </>
  );
}
