import React, { useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import PublishIcon from "@mui/icons-material/Publish";
import { DIFFICULTY_SELECT_MENU_ITEMS } from "../../utilities/constants";
import FormFieldsContainer from "./FormFieldsContainer";
import { useAddBoulder, useUpdateBoulder } from "../../services";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import { useGeolocation } from "../../customHooks/useLocalization";
import type { IBoulder, IBoulderForm } from "../../utilities/interfaces";
import LeafletMapViewer from "../common/LeafletMapViewer";

export default function BoulderForm({ boulder }: { boulder?: IBoulder }) {
  const [getLocalization, setGetLocalization] = useState(false);
  const [latLong, setLatLong] = useState<[number, number] | null>(null);
  const [formData, setFormData] = useState<IBoulderForm>({
    name: "",
    description: "",
    difficulty: "facile",
    latitude: "",
    longitude: "",
    createdAt: new Date().toISOString(),
  });
  const { geolocation, errorGeolocation, loadingGeolocation } =
    useGeolocation(getLocalization);
  const createBoulderMutation = useAddBoulder();
  const updateBoulderMutation = useUpdateBoulder();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    setLatLong([parseFloat(formData.latitude), parseFloat(formData.longitude)]);
  }, [formData.latitude, formData.longitude]);

  useEffect(() => {
    if (geolocation) {
      setFormData((prev) => ({
        ...prev,
        latitude: geolocation.latitude.toString(),
        longitude: geolocation.longitude.toString(),
      }));
    }
  }, [geolocation]);

  useEffect(() => {
    if (boulder) {
      setFormData({
        name: boulder.name,
        description: boulder.description,
        difficulty: boulder.difficulty,
        latitude: boulder.latitude.toString(),
        longitude: boulder.longitude.toString(),
        createdAt: boulder.createdAt,
      });
    }
  }, [boulder]);

  const handleClickLocation = () => {
    setGetLocalization(false);
    setTimeout(() => {
      setGetLocalization(true);
    }, 0);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const lat = parseFloat(formData.latitude);
    const long = parseFloat(formData.longitude);
    if (isNaN(lat) || isNaN(long)) {
      alert("Latitudine e longitudine devono essere numeri validi.");
      return;
    }
    const formattedData = {
      ...formData,
      latitude: lat,
      longitude: long,
    };
    if (boulder && boulder.id) {
      updateBoulderMutation.mutate({ id: boulder.id, data: formattedData });
    } else {
      createBoulderMutation.mutate(formattedData);
    }
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
        latLong={
          boulder
            ? [parseFloat(formData.latitude), parseFloat(formData.longitude)]
            : latLong
        }
        setFormData={setFormData}
        name={formData.name}
      />
      <Box
        sx={{
          display: "flex",
          pt: 5,
          justifyContent: "center",
        }}
      >
        <Button
          variant="contained"
          endIcon={<PublishIcon />}
          type="submit"
          size="large"
          loading={createBoulderMutation.isPending}
          sx={{
            p: {
              xs: "2rem 2rem 2rem 2rem",
              md: "1rem 1rem 1rem 1rem",
            },
          }}
        >
          {boulder ? "modifica il boulder" : "salva il boulder"}
        </Button>
      </Box>
      {errorGeolocation && (
        <Typography>Impossibile ottenere la localizzazione</Typography>
      )}
    </form>
  );
}
