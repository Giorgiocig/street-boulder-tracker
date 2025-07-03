import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function AlertDialog({
  open,
  setOpen,
  handleDelete,
  boulderName,
}: {
  open: boolean;
  setOpen: (arg: boolean) => void;
  handleDelete: () => void;
  boulderName: string;
}) {
  const handleAccept = () => {
    handleDelete();
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onClose={setOpen}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title" data-testid="alert-dialog-title">
        Cancellazione boulder - {boulderName}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Il boulder {boulderName} sta per essere cancellato clicca su accetta
          per continuare o su annulla per annullare l operazione
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleAccept}>Accetta</Button>
        <Button onClick={handleCancel} autoFocus>
          Annulla
        </Button>
      </DialogActions>
    </Dialog>
  );
}
