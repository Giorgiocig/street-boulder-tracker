import { Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import type { IEventForm } from "../../utilities";
import { AutocompleteCity } from "../form/AutocompleteCity";
import FormFieldsContainer from "./FormFieldsContainer";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import { useGeolocation } from "../../customHooks/useLocalization";
import PublishIcon from "@mui/icons-material/Publish";

export default function EventForm() {
  const [getLocalization, setGetLocalization] = useState(false);
  const [latLong, setLatLong] = useState<[number, number] | null>(null);
  const [formData, setFormData] = useState<IEventForm>({
    name: "",
    description: "",
    date: "",
    city: "",
    latitude: "",
    longitude: "",
    createdAt: new Date().toISOString(),
  });

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
      setFormData((prev) => ({
        ...prev,
        latitude: geolocation.latitude.toString(),
        longitude: geolocation.longitude.toString(),
      }));
    }
  }, [geolocation]);

  const handleCitySelect = (city: {
    name: string;
    lat: number;
    lng: number;
  }) => {
    setFormData((prev) => ({
      ...prev,
      city: city.name,
      latitude: city.lat.toString(),
      longitude: city.lng.toString(),
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(formData);
  };
  return (
    <form onSubmit={handleSubmit}>
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
      <FormFieldsContainer
        fields={[
          {
            id: "textfield-name",
            label: "nome evento",
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
        ]}
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
