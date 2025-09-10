import Snackbar from "@mui/material/Snackbar";
import { useSnackbar } from "../../contexts/SnackbarContext";

export default function PositionedSnackbar() {
  const { message, open, hideToast } = useSnackbar();

  return (
    <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      autoHideDuration={5000}
      open={open}
      message={message}
      onClose={hideToast}
    />
  );
}
