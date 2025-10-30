import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Stack,
  Divider,
  Alert,
} from "@mui/material";
import PublishIcon from "@mui/icons-material/Publish";
import { useEffect, useState } from "react";
import { AutocompleteCity } from "../form/AutocompleteCity";
import { useForm } from "react-hook-form";
import * as z from "zod";
import dayjs, { Dayjs } from "dayjs";
import EventIcon from "@mui/icons-material/Event";
import { zodResolver } from "@hookform/resolvers/zod";
import { EventSchema } from "../../zodSchemas";
import type { City, IEventForm } from "../../utilities";

import DataPicker from "../form/DataPicker";
import { useAddEvent, useUpdateEvent } from "../../services";

export type EventFormValues = z.infer<typeof EventSchema>;

export default function EventForm({
  event,
  setToggle,
}: {
  event?: IEventForm;
  setToggle: () => void;
}) {
  // states
  const [cityValue, setCityValue] = useState("");
  const [latLong, setLatLong] = useState<[number, number] | null>(null);
  const [dataPickerValue, setDataPickerValue] = useState<Dayjs | null>(dayjs());
  // mutations
  const createEventMutation = useAddEvent();
  const updateEventMutation = useUpdateEvent();
  // form setup
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<EventFormValues>({ resolver: zodResolver(EventSchema) });

  useEffect(() => {
    if (dataPickerValue) {
      setValue("date", dataPickerValue.toISOString());
    }
  }, []);

  // fill textfield with values
  useEffect(() => {
    if (event) {
      const eventData = {
        name: event.name,
        description: event.description,
        city: event.city,
        date: event.date,
      };
      reset(eventData);

      setCityValue(event.city);
      setDataPickerValue(dayjs(event.date));
      if (event.latitude && event.longitude) {
        setLatLong([event.latitude, event.longitude]);
      }
    } else {
      const initialDate = dayjs();
      setDataPickerValue(initialDate);
      setValue("date", initialDate.toISOString(), { shouldValidate: true });
    }
  }, [event, reset]);

  // HandleChange event handlers
  const handleCitySelect = (city: City) => {
    setLatLong([city.lat, city.lng]);
    setValue("city", city.name, { shouldValidate: true });
    setCityValue(city.name);
  };

  const handleDataPickerSelect = (value: Dayjs | null) => {
    setDataPickerValue(value);
    if (value) {
      setValue("date", value.toISOString(), { shouldValidate: true });
    } else {
      setValue("date", "", { shouldValidate: true });
    }
  };

  // onSubmit
  const onSubmit = (data: EventFormValues) => {
    if (!latLong) {
      console.error(
        "Latitudine e longitudine non impostate. Seleziona una città valida."
      );
      return;
    }
    const [latitude, longitude] = latLong;
    if (event?.id) {
      const updatePayload = {
        ...data,
        latitude,
        longitude,
      };
      console.log("Update evento:", updatePayload);
      updateEventMutation.mutate({ id: event.id, data: updatePayload });
      setToggle();
    } else {
      const createPayload = {
        ...data,
        latitude,
        longitude,
        createdAt: new Date().toISOString(),
      };
      console.log("Crea evento:", createPayload);
      createEventMutation.mutate(createPayload);
      setToggle();
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
      <form data-testid="event-form" onSubmit={handleSubmit(onSubmit)}>
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
            <EventIcon sx={{ fontSize: 36 }} />
            {event ? "Modifica Evento" : "Nuovo Evento"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Crea un evento di arrampicata e invita altri climber
          </Typography>
        </Box>

        <Divider sx={{ mb: 4 }} />

        {/* Form Fields */}
        <Stack spacing={3}>
          {/* Sezione Dettagli */}
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
              📋 Dettagli Evento
            </Typography>
            <Stack spacing={2.5}>
              <TextField
                fullWidth
                label="Nome Evento"
                placeholder="Es: Session di Boulder al Tramonto"
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
                label="Descrizione"
                placeholder="Racconta di cosa si tratta, livello, equipaggiamento necessario..."
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
            </Stack>
          </Box>

          {/* Sezione Luogo e Data */}
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
              📍 Luogo e Data
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
              <Stack spacing={2.5}>
                <Box>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 1.5, fontWeight: 500 }}
                  >
                    Seleziona la città
                  </Typography>
                  <AutocompleteCity
                    onSelect={handleCitySelect}
                    value={cityValue}
                  />
                  <input type="hidden" {...register("city")} />
                  {errors.city && (
                    <Alert severity="error" sx={{ mt: 1.5 }}>
                      {typeof errors.city?.message === "string"
                        ? errors.city.message
                        : "Seleziona una città"}
                    </Alert>
                  )}
                </Box>

                <Box>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 1.5, fontWeight: 500 }}
                  >
                    Seleziona la data
                  </Typography>
                  <DataPicker onSelect={handleDataPickerSelect} />
                </Box>
              </Stack>
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
            {event ? "Aggiorna Evento" : "Pubblica Evento"}
          </Button>
        </Box>
      </form>
    </Paper>
  );
}
