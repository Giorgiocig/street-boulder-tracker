import { Button, TextField, Typography } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { AutocompleteCity } from "../form/AutocompleteCity";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import { useGeolocation } from "../../customHooks/useLocalization";
import PublishIcon from "@mui/icons-material/Publish";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { EventSchema } from "../../zodSchemas";

export type EventFormValues = z.infer<typeof EventSchema>;

export default function EventForm() {
  const [getLocalization, setGetLocalization] = useState(false);
  const [latLong, setLatLong] = useState<[number, number] | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<EventFormValues>({ resolver: zodResolver(EventSchema) });

  const { geolocation, errorGeolocation, loadingGeolocation } =
    useGeolocation(getLocalization);

  const handleClickLocation = () => {
    setGetLocalization(false);
    setTimeout(() => {
      setGetLocalization(true);
    }, 0);
  };

  useEffect(() => {
    if (geolocation) {
      setLatLong([geolocation.latitude, geolocation.longitude]);

      setValue("lat", geolocation.latitude.toString());
      setValue("long", geolocation.longitude.toString());
    }
  }, [geolocation]);

  const handleCitySelect = (city: any) => {
    setLatLong([city.lat, city.lng]);
  };

  const onSubmit = useCallback((data: EventFormValues) => {
    console.log("onValid", data);
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <AutocompleteCity onSelect={handleCitySelect} />
      <Typography>Inserisci una citta oppure geolocalizzati</Typography>
      <Button
        sx={{
          mt: 4,
          p: {
            xs: "2rem 2rem 2rem 2rem",
            md: "1rem 1rem 1rem 1rem",
          },
        }}
        variant="outlined"
        endIcon={<MyLocationIcon />}
        loading={loadingGeolocation}
        size="large"
        onClick={handleClickLocation}
      >
        Localizzati
      </Button>
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
      <TextField
        slotProps={{ inputLabel: { shrink: true } }}
        fullWidth
        label="latitudine"
        margin="normal"
        {...register("lat")}
        error={!!errors.lat}
        helperText={
          typeof errors.lat?.message === "string" ? errors.lat.message : ""
        }
      />
      <TextField
        slotProps={{ inputLabel: { shrink: true } }}
        fullWidth
        label="longitudine"
        margin="normal"
        {...register("long")}
        error={!!errors.long}
        helperText={
          typeof errors.long?.message === "string" ? errors.long.message : ""
        }
      />
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
      {errorGeolocation && (
        <Typography>Impossibile ottenere la localizzazione</Typography>
      )}
    </form>
  );
}
