import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { BoulderSchema } from "../../zodSchemas/BoulderSchema";
import { Button, TextField, Typography } from "@mui/material";
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
export type BoulderSchemaValues = z.infer<typeof BoulderSchema>;

export default function BoulderFormRHF({ boulder }: { boulder?: IBoulder }) {
  const { eventId } = useParams<{ eventId: string }>();
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

  // GEOLOCATION
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
  console.log(boulder);
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
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        fullWidth
        label="nome boulder"
        margin="normal"
        {...register("name")}
        error={!!errors.name}
        helperText={
          typeof errors.name?.message === "string" ? errors.name.message : ""
        }
      />
      <TextField
        fullWidth
        label="descrizione boulder"
        margin="normal"
        {...register("description")}
        error={!!errors.description}
        helperText={
          typeof errors.description?.message === "string"
            ? errors.description.message
            : ""
        }
      />
      <SelectForm
        name={"difficulty"}
        control={control}
        menuItems={DIFFICULTY_SELECT_MENU_ITEMS}
      />
      {/** Latitudine e longitudine in numbers */}
      <NumberInputRHF
        name={"latitude"}
        control={control}
        label={"latitudine"}
        dataTestId={"latitude-input"}
      />
      <NumberInputRHF
        name={"longitude"}
        control={control}
        label={"longitudine"}
        dataTestId={"longitude-input"}
      />
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
      <LeafletMapViewer
        latLong={[watch("latitude"), watch("longitude")]}
        setValue={setValue}
        name={watch("name")}
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
        {boulder ? "Aggiorna Boulder" : "Inserisci Boulder"}
      </Button>
      {errorGeolocation && (
        <Typography>Impossibile ottenere la localizzazione</Typography>
      )}
    </form>
  );
}
