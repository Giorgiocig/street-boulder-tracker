import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#2c5f7c", // Mountain blue
      light: "#4a7d9e",
      dark: "#1a4560",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#8b7355", // Earth brown
      light: "#a68f78",
      dark: "#6b5842",
      contrastText: "#ffffff",
    },
    background: {
      default: "#f5f5f0", // Warm off-white
      paper: "#ffffff",
    },
    text: {
      primary: "#2d3436",
      secondary: "#636e72",
      disabled: "#9e9e9e",
    },
    action: {
      disabled: "#f5f5f5",
      disabledBackground: "#e0e0e0",
    },
    divider: "rgba(0, 0, 0, 0.12)",
    success: {
      main: "#6c8f5f", // Forest green
      light: "#8aab7d",
      dark: "#526e48",
    },
    error: {
      main: "#c85a54", // Rust red
      light: "#d47b76",
      dark: "#a64842",
    },
    warning: {
      main: "#d4a574", // Sandstone
      light: "#e0bb94",
      dark: "#b8875c",
    },
    grey: {
      50: "#fafafa",
      100: "#f5f5f0",
      200: "#eeeeee",
      300: "#e0e0e0",
      400: "#bdbdbd",
      500: "#9e9e9e", // Rock gray
      600: "#757575",
      700: "#616161",
      800: "#424242",
      900: "#212121",
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: "2.5rem",
      lineHeight: 1.2,
      letterSpacing: "-0.01em",
    },
    h2: {
      fontWeight: 700,
      fontSize: "2rem",
      lineHeight: 1.3,
      letterSpacing: "-0.01em",
    },
    h3: {
      fontWeight: 600,
      fontSize: "1.75rem",
      lineHeight: 1.3,
    },
    h4: {
      fontWeight: 600,
      fontSize: "1.5rem",
      lineHeight: 1.4,
    },
    h5: {
      fontWeight: 600,
      fontSize: "1.25rem",
      lineHeight: 1.4,
    },
    h6: {
      fontWeight: 600,
      fontSize: "1rem",
      lineHeight: 1.5,
    },
    button: {
      fontWeight: 600,
      textTransform: "none",
      letterSpacing: "0.02em",
    },
  },
  shape: {
    borderRadius: 12,
  },
  shadows: [
    "none",
    "0px 2px 4px rgba(0, 0, 0, 0.05)",
    "0px 4px 8px rgba(0, 0, 0, 0.08)",
    "0px 6px 12px rgba(0, 0, 0, 0.1)",
    "0px 8px 16px rgba(0, 0, 0, 0.12)",
    "0px 10px 20px rgba(0, 0, 0, 0.14)",
    "0px 12px 24px rgba(0, 0, 0, 0.16)",
    "0px 14px 28px rgba(0, 0, 0, 0.18)",
    "0px 16px 32px rgba(0, 0, 0, 0.2)",
    "0px 18px 36px rgba(0, 0, 0, 0.22)",
    "0px 20px 40px rgba(0, 0, 0, 0.24)",
    "0px 22px 44px rgba(0, 0, 0, 0.26)",
    "0px 24px 48px rgba(0, 0, 0, 0.28)",
    "0px 26px 52px rgba(0, 0, 0, 0.3)",
    "0px 28px 56px rgba(0, 0, 0, 0.32)",
    "0px 30px 60px rgba(0, 0, 0, 0.34)",
    "0px 32px 64px rgba(0, 0, 0, 0.36)",
    "0px 34px 68px rgba(0, 0, 0, 0.38)",
    "0px 36px 72px rgba(0, 0, 0, 0.4)",
    "0px 38px 76px rgba(0, 0, 0, 0.42)",
    "0px 40px 80px rgba(0, 0, 0, 0.44)",
    "0px 42px 84px rgba(0, 0, 0, 0.46)",
    "0px 44px 88px rgba(0, 0, 0, 0.48)",
    "0px 46px 92px rgba(0, 0, 0, 0.5)",
    "0px 48px 96px rgba(0, 0, 0, 0.52)",
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: "10px 24px",
          fontSize: "1rem",
          transition: "all 0.3s ease",
          "&:hover": {
            transform: "translateY(-2px)",
            boxShadow: "0px 6px 16px rgba(0, 0, 0, 0.15)",
          },
        },
        contained: {
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
        },
        sizeLarge: {
          padding: "14px 32px",
          fontSize: "1.1rem",
        },
      },
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          marginBottom: "16px",
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          marginLeft: 14,
          marginRight: 14,
          marginTop: 6,
          fontSize: "0.75rem",
          fontWeight: 400,
          lineHeight: 1.5,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.08)",
          transition: "all 0.3s ease",
          "&:hover": {
            boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.12)",
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 8,
            transition: "all 0.3s ease",
            backgroundColor: "#ffffff",
            "&:hover": {
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#2c5f7c",
                borderWidth: 1,
              },
            },
            "&.Mui-focused": {
              "& .MuiOutlinedInput-notchedOutline": {
                borderWidth: 2,
                boxShadow: "0 0 0 1px rgba(44, 95, 124, 0.25)",
              },
            },
            "&.Mui-error": {
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#c85a54",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#c85a54",
                borderWidth: 2,
                boxShadow: "0 0 0 1px rgba(200, 90, 84, 0.25)",
              },
            },
          },
          "& .MuiOutlinedInput-input": {
            padding: "16.5px 14px",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
        elevation1: {
          boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.06)",
        },
        elevation2: {
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.08)",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 500,
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 500,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.08)",
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 600,
          fontSize: "1rem",
          transition: "all 0.3s ease",
        },
      },
    },
  },
});
