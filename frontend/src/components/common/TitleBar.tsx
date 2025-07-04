import { Box, Typography, useTheme } from "@mui/material";

export default function TitleBar() {
  const theme = useTheme();
  return (
    <Box
      sx={{
        width: "100%",
        padding: "1rem  3rem",
        backgroundColor: theme.palette.secondary.main,
        marginBottom: "2rem",
      }}
    >
      <Typography
        sx={{ color: theme.palette.background.default }}
        fontWeight="bold"
      >
        Street Boulder Tracker
      </Typography>
    </Box>
  );
}
