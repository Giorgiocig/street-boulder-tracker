import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { BoulderSchema } from "../../zodSchemas/BoulderSchema";
import CircularProgress from "@mui/material/CircularProgress";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  TextField,
  Typography,
} from "@mui/material";
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
  setIsSubmitted: (arg: boolean) => void;
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
      setIsSubmitted(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* === SEZIONE 1: INFORMAZIONI BOULDER === */}
      <Card
        elevation={4}
        sx={{
          mb: 4,
          borderRadius: 3,
          background: "linear-gradient(135deg, #fafafa 0%, #e8f5e9 100%)",
          boxShadow: "0px 4px 20px rgba(0,0,0,0.08)",
        }}
      >
        <CardHeader
          title="🧗‍♂️ Info Boulder"
          sx={{
            textAlign: "center",
            background: "linear-gradient(90deg, #388e3c 0%, #66bb6a 100%)",
            color: "white",
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12,
          }}
        />
        <CardContent>
          <TextField
            fullWidth
            label="Nome boulder"
            margin="normal"
            {...register("name")}
            error={!!errors.name}
            helperText={
              typeof errors.name?.message === "string"
                ? errors.name.message
                : ""
            }
          />

          <TextField
            fullWidth
            label="Descrizione boulder"
            margin="normal"
            multiline
            minRows={3}
            {...register("description")}
            error={!!errors.description}
            helperText={
              typeof errors.description?.message === "string"
                ? errors.description.message
                : ""
            }
          />

          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
              Difficoltà
            </Typography>
            <SelectForm
              name="difficulty"
              control={control}
              menuItems={DIFFICULTY_SELECT_MENU_ITEMS}
            />
          </Box>
        </CardContent>
      </Card>

      {/* === SEZIONE 2: POSIZIONE & MAPPA === */}
      <Card
        elevation={4}
        sx={{
          mb: 4,
          borderRadius: 3,
          background: "linear-gradient(135deg, #f1f8e9 0%, #dcedc8 100%)",
          boxShadow: "0px 4px 20px rgba(0,0,0,0.08)",
        }}
      >
        <CardHeader
          title="📍 Posizione"
          sx={{
            textAlign: "center",
            background: "linear-gradient(90deg, #2e7d32 0%, #43a047 100%)",
            color: "white",
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12,
          }}
        />
        <CardContent>
          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
            <NumberInputRHF
              name="latitude"
              control={control}
              label="Latitudine"
              dataTestId="latitude-input"
            />
            <NumberInputRHF
              name="longitude"
              control={control}
              label="Longitudine"
              dataTestId="longitude-input"
            />
          </Box>

          <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
            <Button
              variant="outlined"
              size="large"
              endIcon={
                loadingGeolocation ? (
                  <CircularProgress size={20} color="inherit" />
                ) : (
                  <MyLocationIcon />
                )
              }
              onClick={handleClickLocation}
              sx={{
                borderRadius: 3,
                px: 4,
                py: 1.5,
                borderColor: "#388e3c",
                color: "#2e7d32",
                "&:hover": {
                  backgroundColor: "#e8f5e9",
                },
              }}
            >
              Localizzati
            </Button>
          </Box>

          {errorGeolocation && (
            <Typography
              color="error"
              variant="body2"
              sx={{ textAlign: "center", mt: 2 }}
            >
              Impossibile ottenere la localizzazione
            </Typography>
          )}

          <Box sx={{ mt: 3 }}>
            <LeafletMapViewer
              latLong={[watch("latitude"), watch("longitude")]}
              setValue={setValue}
              name={watch("name")}
            />
          </Box>
        </CardContent>
      </Card>

      {/* === SEZIONE 3: INVIO === */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          pb: 4,
        }}
      >
        <Button
          variant="contained"
          endIcon={<PublishIcon />}
          type="submit"
          size="large"
          sx={{
            px: { xs: 4, md: 6 },
            py: { xs: 2, md: 1.5 },
            borderRadius: 3,
            background: "linear-gradient(90deg, #388e3c 0%, #81c784 100%)",
            boxShadow: "0px 4px 12px rgba(56, 142, 60, 0.4)",
            "&:hover": {
              background: "linear-gradient(90deg, #2e7d32 0%, #66bb6a 100%)",
            },
          }}
        >
          {boulder ? "Aggiorna Boulder" : "Inserisci Boulder"}
        </Button>
      </Box>
    </form>
  );
}
