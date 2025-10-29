import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

export default function ResponsiveDialog({
  children,
  isOpen,
  setIsOpen,
  titleText,
}: {
  children: React.ReactNode;
  isOpen: boolean;
  setIsOpen: (arg: boolean) => void;
  titleText: string;
}) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <React.Fragment>
      <Dialog
        fullScreen={fullScreen}
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{titleText}</DialogTitle>
        <DialogContent>{children}</DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Chiudi
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
