import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#F8F9FA",
      paper: "#FFFFFF",
    },
    primary: {
      main: "#2E8B57",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#708090",
      contrastText: "#212134",
    },
    text: {
      primary: "#212529",
      secondary: "#6C757D",
    },
    warning: {
      main: "#FFD700",
    },
    divider: "#DEE2E6",
    action: {
      disabled: "#A9A9A9",
      disabledBackground: "#E0E0E0",
    },
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          borderColor: "#CED4DA",
        },
        root: {
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#2E8B57",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#2E8B57",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          "&.Mui-disabled": {
            color: "#6C757D",
            backgroundColor: "#E0E0E0",
          },
        },
      },
    },
  },
});
