import { Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { AutocompleteCity } from "../form/AutocompleteCity";
import PublishIcon from "@mui/icons-material/Publish";
import { useForm } from "react-hook-form";
import * as z from "zod";
import dayjs, { Dayjs } from "dayjs";

import { zodResolver } from "@hookform/resolvers/zod";
import { EventSchema } from "../../zodSchemas";
import type { City } from "../../utilities";

import DataPicker from "../form/DataPicker";
import { useAddEvent } from "../../services";

export type EventFormValues = z.infer<typeof EventSchema>;

export default function EventForm() {
  const [latLong, setLatLong] = useState<[number, number] | null>(null);
  const [dataPickerValue, setDataPickerValue] = useState<Dayjs | null>(dayjs());
  const createEventMutation = useAddEvent();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<EventFormValues>({ resolver: zodResolver(EventSchema) });

  const handleCitySelect = (city: City) => {
    console.log(city);
    setLatLong([city.lat, city.lng]);
    setValue("city", city.name, { shouldValidate: true });
  };

  const handleDataPickerSelect = (value: Dayjs | null) => {
    setDataPickerValue(value);
    if (value) {
      setValue("date", value.toISOString(), { shouldValidate: true });
    } else {
      setValue("date", "", { shouldValidate: true });
    }
  };

  const onSubmit = (data: EventFormValues) => {
    if (!latLong) {
      return;
    }
    const [latitude, longitude] = latLong;
    const dataPayload = {
      ...data,
      latitude,
      longitude,
      date: dataPickerValue,
      createdAt: new Date().toISOString(),
    };
    createEventMutation.mutate(dataPayload);
  };

  return (
    <form data-testid="event-form" onSubmit={handleSubmit(onSubmit)}>
      <AutocompleteCity onSelect={handleCitySelect} />
      <input type="hidden" {...register("city")} />
      {errors.city && (
        <Typography color="error">{errors.city.message}</Typography>
      )}
      <TextField
        fullWidth
        label="nome evento"
        margin="normal"
        {...register("name")}
        error={!!errors.name}
        helperText={
          typeof errors.name?.message === "string" ? errors.name.message : ""
        }
      />
      <TextField
        fullWidth
        label="descrizione"
        margin="normal"
        {...register("description")}
        error={!!errors.description}
        helperText={
          typeof errors.description?.message === "string"
            ? errors.description.message
            : ""
        }
      />
      <DataPicker onSelect={handleDataPickerSelect} />
      <Button
        variant="contained"
        endIcon={<PublishIcon />}
        type="submit"
        size="large"
        sx={{
          p: {
            xs: "2rem 2rem 2rem 2rem",
            md: "1rem 1rem 1rem 1rem",
          },
        }}
      >
        Inserisci evento
      </Button>
    </form>
  );
}
