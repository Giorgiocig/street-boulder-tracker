import React from "react";
import { Button, Typography } from "@mui/material";
import { useState } from "react";
import PublishIcon from "@mui/icons-material/Publish";
import { DIFFICULTY_SELECT_MENU_ITEMS } from "../../utilities/constants";
import type { IBoulder } from "../../utilities/interfaces";
import FormFieldsContainer from "./FormFieldsContainer";
import { useAddBoulder } from "../../services";

export default function BoulderForm() {
  const createBoulderMutation = useAddBoulder();
  const [formData, setFormData] = useState<IBoulder>({
    name: "",
    description: "",
    difficulty: "facile",
    latitude: 0,
    longitude: 0,
    createdAt: new Date().toISOString(),
  });

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

  return (
    <form onSubmit={handleSubmit}>
      <Typography>helllo</Typography>
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
      <Button variant="contained" endIcon={<PublishIcon />} type="submit">
        Salva Boulder
      </Button>
    </form>
  );
}
