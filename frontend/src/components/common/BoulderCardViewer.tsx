import { Box, Typography, Grid, Paper, Divider, Chip } from "@mui/material";
import type { IBoulder } from "../../utilities";
import BasicCard from "./BasicCard";
import TerrainIcon from "@mui/icons-material/Terrain";

export default function BoulderCardViewer({
  boulders,
  setLatLng,
}: {
  boulders: IBoulder[] | undefined;
  setLatLng: any;
}) {
  return (
    <Box>
      {/* Header Section */}
      <Box
        sx={{
          mb: 4,
          p: 3,
          borderRadius: 4,
          background: (theme) =>
            `linear-gradient(135deg, ${theme.palette.primary.main}15 0%, ${theme.palette.secondary.main}10 100%)`,
          border: (theme) => `1px solid ${theme.palette.divider}`,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            color: "primary.main",
            fontWeight: 700,
            mb: 1,
          }}
        >
          <TerrainIcon sx={{ fontSize: 36 }} />I Tuoi Boulder
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            flexWrap: "wrap",
          }}
        >
          <Typography variant="body1" color="text.secondary">
            Gestisci e visualizza tutti i tuoi percorsi
          </Typography>
          <Chip
            label={`${boulders?.length || 0} boulder${
              boulders?.length !== 1 ? "s" : ""
            }`}
            size="small"
            sx={{
              fontWeight: 600,
              fontSize: "0.95rem",
              px: 1,
              height: "auto",
              backgroundColor: "primary.main",
              color: "primary.contrastText",
            }}
          />
        </Box>
      </Box>

      <Divider sx={{ mb: 4 }} />

      {/* Grid or Empty State */}
      {boulders && boulders.length > 0 ? (
        <Grid
          container
          spacing={{
            xs: 2,
            sm: 2.5,
            md: 3,
          }}
        >
          {boulders.map((boulder, idx) => (
            <Grid
              size={{
                xs: 12,
                sm: 6,
                md: 4,
                lg: 3,
              }}
              key={boulder.id || idx}
            >
              <BasicCard boulder={boulder} setLatLng={setLatLng} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Paper
          elevation={0}
          sx={{
            p: 6,
            textAlign: "center",
            borderRadius: 4,
            backgroundColor: "grey.50",
            border: (theme) => `2px dashed ${theme.palette.divider}`,
          }}
        >
          <TerrainIcon
            sx={{
              fontSize: 64,
              color: "text.disabled",
              mb: 2,
            }}
          />
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ mb: 1, fontWeight: 600 }}
          >
            Nessun Boulder Trovato
          </Typography>
          <Typography variant="body2" color="text.disabled">
            Inizia creando il tuo primo percorso di arrampicata
          </Typography>
        </Paper>
      )}
    </Box>
  );
}
