import { Box, Typography } from "@mui/material";
import { theme } from "../../theme";

export default function Footer() {
  return (
    <Box
      sx={{
        width: "100%",
        padding: "1rem  3rem",
        backgroundColor: theme.palette.secondary.main,
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
