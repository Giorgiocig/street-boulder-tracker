import { Button, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { AutocompleteCity } from "../form/AutocompleteCity";
import PublishIcon from "@mui/icons-material/Publish";
import { useForm } from "react-hook-form";
import * as z from "zod";
import dayjs, { Dayjs } from "dayjs";

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
    <form data-testid="event-form" onSubmit={handleSubmit(onSubmit)}>
      <AutocompleteCity onSelect={handleCitySelect} value={cityValue} />
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
