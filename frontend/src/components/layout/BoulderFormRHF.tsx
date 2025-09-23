import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { FormProvider, useForm } from "react-hook-form";
import { BoulderSchema } from "../../zodSchemas/BoulderSchema";
import { Button, TextField } from "@mui/material";
import PublishIcon from "@mui/icons-material/Publish";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import { useAddBoulder } from "../../services";
import SelectForm from "../form/SelectForm";
import { DIFFICULTY_SELECT_MENU_ITEMS, type IBoulder } from "../../utilities";
import { useGeolocation } from "../../customHooks/useLocalization";
import LeafletMapViewer from "../common/LeafletMapViewer";
import { useEffect, useState } from "react";
import { NumberInputRHF } from "../form/NumberInputRHF";
export type BoulderSchemaValues = z.infer<typeof BoulderSchema>;

export default function BoulderFormRHF({ boulder }: { boulder?: IBoulder }) {
  const [getLocalization, setGetLocalization] = useState(false);
  const createBoulderMutation = useAddBoulder();
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
      latitude: 0,
      longitude: 0,
    },
  });

  // GEOLOCATION
  const { geolocation, errorGeolocation, loadingGeolocation } =
    useGeolocation(getLocalization);

  const handleClickLocation = () => {
    setGetLocalization(false);
    setTimeout(() => {
      setGetLocalization(true);
    }, 0);
  };

  const onSubmit = (data: BoulderSchemaValues) => {
    //createBoulderMutation.mutate(data);
    console.log(data);
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
      {/* <LeafletMapViewer
        latLong={boulder ? [latLng.latitude, latLng.longitude] : latLng}
        setFormData={setLatLng}
        name={watch("name")}
      /> */}
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
        Inserisci Boulder
      </Button>
    </form>
  );
}
