import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { BoulderSchema } from "../../zodSchemas/BoulderSchema";
import CircularProgress from "@mui/material/CircularProgress";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Stack,
  Alert,
  Divider,
} from "@mui/material";
import TerrainIcon from "@mui/icons-material/Terrain";

import PublishIcon from "@mui/icons-material/Publish";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import { useAddBoulder, useUpdateBoulder } from "../../services";
import SelectForm from "../form/SelectForm";
import {
  DIFFICULTY_SELECT_MENU_ITEMS,
  type Difficulty,
  type IBoulder,
} from "../../utilities";
import { useGeolocation } from "../../customHooks/useLocalization";
import LeafletMapViewer from "../common/LeafletMapViewer";
import { useEffect } from "react";
import { NumberInputRHF } from "../form/NumberInputRHF";
import { useParams } from "react-router";

// Boulder schema - zod
export type BoulderSchemaValues = z.infer<typeof BoulderSchema>;

export default function BoulderFormRHF({
  boulder,
  setIsSubmitted,
}: {
  boulder?: IBoulder;
  setIsSubmitted?: (arg: boolean) => void;
}) {
  // params
  const { eventId } = useParams<{ eventId: string }>();
  // mutation
  const createBoulderMutation = useAddBoulder();
  const updateBoulderMutation = useUpdateBoulder();
  // form setup
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    control,
    formState: { errors },
  } = useForm<BoulderSchemaValues>({
    resolver: zodResolver(BoulderSchema),
    defaultValues: {
      name: "",
      description: "",
      difficulty: "facile",
      latitude: 41.9028,
      longitude: 12.4964,
    },
  });

  // Geolocation
  const {
    geolocation,
    errorGeolocation,
    loadingGeolocation,
    refreshGeolocation,
  } = useGeolocation();

  const handleClickLocation = () => {
    refreshGeolocation();
  };

  useEffect(() => {
    if (geolocation) {
      setValue("latitude", geolocation.latitude);
      setValue("longitude", geolocation.longitude);
    }
  }, [geolocation]);

  useEffect(() => {
    if (boulder) {
      const boulderData = {
        name: boulder.name,
        description: boulder.description,
        difficulty: boulder.difficulty,
        latitude: boulder.latitude,
        longitude: boulder.longitude,
      };
      reset(boulderData);
    }
  }, [boulder]);

  // submit
  const onSubmit = (data: BoulderSchemaValues) => {
    if (boulder) {
      const formattedData: IBoulder = {
        ...data,
        difficulty: data.difficulty as Difficulty,
        eventId: parseFloat(eventId!),
      };
      updateBoulderMutation.mutate({ id: boulder.id!, data: formattedData });
    } else {
      createBoulderMutation.mutate({
        ...data,
        difficulty: data.difficulty as Difficulty,
        eventId: parseFloat(eventId!),
        createdAt: new Date().toISOString(),
      });
      setIsSubmitted && setIsSubmitted(false);
    }
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 3, md: 4 },
        borderRadius: 4,
        background: (theme) =>
          `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.grey[50]} 100%)`,
        boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.12)",
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Header */}
        <Box sx={{ mb: 4, textAlign: "center" }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              color: "primary.main",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 1.5,
              mb: 1,
            }}
          >
            <TerrainIcon sx={{ fontSize: 36 }} />
            {boulder ? "Modifica Boulder" : "Nuovo Boulder"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Inserisci i dettagli del boulder e la sua posizione
          </Typography>
        </Box>

        <Divider sx={{ mb: 4 }} />

        {/* Sezione Info Boulder */}
        <Stack spacing={3}>
          <Box>
            <Typography
              variant="h6"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                color: "primary.main",
                fontWeight: 600,
                mb: 2,
                fontSize: "1.1rem",
              }}
            >
              📋 Informazioni Boulder
            </Typography>
            <Stack spacing={2.5}>
              <TextField
                fullWidth
                label="Nome Boulder"
                placeholder="Es: La Grande Parete"
                {...register("name")}
                error={!!errors.name}
                helperText={
                  typeof errors.name?.message === "string"
                    ? errors.name.message
                    : ""
                }
                sx={{
                  "& .MuiInputLabel-root": {
                    fontWeight: 500,
                  },
                }}
              />
              <TextField
                fullWidth
                label="Descrizione Boulder"
                placeholder="Descrivi il percorso, le caratteristiche, i consigli..."
                multiline
                rows={4}
                {...register("description")}
                error={!!errors.description}
                helperText={
                  typeof errors.description?.message === "string"
                    ? errors.description.message
                    : ""
                }
                sx={{
                  "& .MuiInputLabel-root": {
                    fontWeight: 500,
                  },
                }}
              />
              <SelectForm
                name="difficulty"
                control={control}
                menuItems={DIFFICULTY_SELECT_MENU_ITEMS}
              />
            </Stack>
          </Box>

          {/* Sezione Posizione */}
          <Box>
            <Typography
              variant="h6"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                color: "primary.main",
                fontWeight: 600,
                mb: 2,
                fontSize: "1.1rem",
              }}
            >
              📍 Posizione
            </Typography>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 3,
                backgroundColor: "grey.50",
                border: (theme) => `1px solid ${theme.palette.divider}`,
              }}
            >
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mb: 2, fontWeight: 500 }}
              >
                Coordinate GPS
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  flexWrap: "wrap",
                  mb: 3,
                }}
              >
                <Box sx={{ flex: "1 1 200px", minWidth: 200 }}>
                  <NumberInputRHF
                    name="latitude"
                    control={control}
                    label="Latitudine"
                    dataTestId="latitude-input"
                  />
                </Box>
                <Box sx={{ flex: "1 1 200px", minWidth: 200 }}>
                  <NumberInputRHF
                    name="longitude"
                    control={control}
                    label="Longitudine"
                    dataTestId="longitude-input"
                  />
                </Box>
              </Box>

              <Button
                variant="outlined"
                color="primary"
                fullWidth
                startIcon={<MyLocationIcon />}
                onClick={handleClickLocation}
                disabled={loadingGeolocation}
                sx={{
                  py: 1.5,
                  fontWeight: 600,
                  borderRadius: 2,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: "0px 6px 16px rgba(44, 95, 124, 0.2)",
                  },
                }}
              >
                {loadingGeolocation
                  ? "Rilevamento in corso..."
                  : "Usa la mia posizione"}
              </Button>

              {errorGeolocation && (
                <Alert severity="error" sx={{ mt: 2 }}>
                  Impossibile ottenere la localizzazione. Verifica le
                  autorizzazioni del browser.
                </Alert>
              )}
            </Paper>
          </Box>

          {/* Mappa */}
          <Box>
            <Typography
              variant="h6"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                color: "primary.main",
                fontWeight: 600,
                mb: 2,
                fontSize: "1.1rem",
              }}
            >
              🗺️ Anteprima Mappa
            </Typography>
            <Paper
              elevation={0}
              sx={{
                borderRadius: 3,
                overflow: "hidden",
                border: (theme) => `1px solid ${theme.palette.divider}`,
              }}
            >
              <LeafletMapViewer
                latLong={[watch("latitude"), watch("longitude")]}
                setValue={setValue}
                name={watch("name")}
              />
            </Paper>
          </Box>
        </Stack>

        {/* Submit Button */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: 5,
            pt: 3,
            borderTop: (theme) => `1px solid ${theme.palette.divider}`,
          }}
        >
          <Button
            variant="contained"
            color="primary"
            endIcon={<PublishIcon />}
            type="submit"
            size="large"
            sx={{
              minWidth: 200,
              py: { xs: 2, md: 1.5 },
              px: { xs: 4, md: 3 },
              fontSize: "1.1rem",
              fontWeight: 600,
              borderRadius: 2,
              boxShadow: "0px 4px 12px rgba(44, 95, 124, 0.25)",
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: "0px 8px 20px rgba(44, 95, 124, 0.35)",
              },
            }}
          >
            {boulder ? "Aggiorna Boulder" : "Pubblica Boulder"}
          </Button>
        </Box>
      </form>
    </Paper>
  );
}
