import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "dark", // layout
    background: {
      default: "#F8F9FA", // main bg
      paper: "#FFFFFF	", // card / content bg
    },
    primary: {
      main: "#2E8B57", // light green – main btn / completed actions
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#708090", // soft green – secondary btn
      contrastText: "#212134",
    },
    text: {
      primary: "#212529", // main text
      secondary: "#6C757D", // secondary text
    },
    warning: {
      main: "#FFD700", // alert
    },
    divider: "#DEE2E6	",
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          borderColor: "#CED4DA", // colore del contorno
        },
        root: {
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#2E8B57", // al passaggio del mouse
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#2E8B57", // quando è attivo
          },
        },
      },
    },
  },
});
