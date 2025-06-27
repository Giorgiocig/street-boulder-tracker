import React, { useEffect } from "react";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { useState } from "react";
import PublishIcon from "@mui/icons-material/Publish";
import { DIFFICULTY_SELECT_MENU_ITEMS } from "../../utilities/constants";
import type { IBoulder } from "../../utilities/interfaces";
import FormFieldsContainer from "./FormFieldsContainer";
import { useAddBoulder } from "../../services";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import { useGeolocation } from "../../customHooks/useLocalization";

export default function BoulderForm() {
  const [getLocalization, setGetLocalization] = useState(false);
  const [formData, setFormData] = useState<IBoulder>({
    name: "",
    description: "",
    difficulty: "facile",
    latitude: 0,
    longitude: 0,
    createdAt: new Date().toISOString(),
  });

  const createBoulderMutation = useAddBoulder();
  const { geolocation, errorGeolocation, loadingGeolocation } =
    useGeolocation(getLocalization);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: name === "lat" || name === "long" ? parseFloat(value) : value,
      };
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(formData);
    createBoulderMutation.mutate(formData);
  };

  useEffect(() => {
    if (geolocation) {
      setFormData((prev) => ({
        ...prev,
        latitude: geolocation.latitude,
        longitude: geolocation.longitude,
      }));
    }
  }, [geolocation]);

  const handleClickLocation = () => {
    setGetLocalization(true);
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormFieldsContainer
        fields={[
          {
            id: "textfield-name",
            label: "nome",
            name: "name",
            variant: "outlined",
            onChange: handleChange,
            value: formData.name,
          },
          {
            id: "textfield-description",
            label: "descrizione",
            variant: "outlined",
            name: "description",
            onChange: handleChange,
            value: formData.description,
          },
          {
            select: true,
            setFormData: setFormData,
            menuItems: DIFFICULTY_SELECT_MENU_ITEMS,
            value: formData.difficulty,
          },
          {
            id: "textfield-lat",
            label: "lat",
            variant: "outlined",
            name: "latitude",
            value: formData.latitude,
            onChange: handleChange,
          },
          {
            id: "textfield-long",
            label: "long",
            variant: "outlined",
            name: "longitude",
            value: formData.longitude,
            onChange: handleChange,
          },
        ]}
      />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          pt: 5,
          width: "55%",
          justifyContent: "space-between",
        }}
      >
        <IconButton
          aria-label="delete"
          size="large"
          sx={{ color: "green" }}
          loading={loadingGeolocation}
        >
          <MyLocationIcon onClick={handleClickLocation} />
        </IconButton>
        <Button
          variant="contained"
          endIcon={<PublishIcon />}
          type="submit"
          size="large"
          loading={createBoulderMutation.isPending}
        >
          Salva Boulder
        </Button>
      </Box>
      {errorGeolocation && (
        <Typography>Impossibile ottenere la localizzazione</Typography>
      )}
    </form>
  );
}
