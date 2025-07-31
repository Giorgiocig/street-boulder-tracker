import Snackbar from "@mui/material/Snackbar";

type PositionedSnackbarProps = {
  open: boolean;
  messageSnackbar: string;
};

export default function PositionedSnackbar({
  open,
  messageSnackbar,
}: PositionedSnackbarProps) {
  return (
    <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      autoHideDuration={5000}
      open={open}
      message={messageSnackbar}
    />
  );
}
