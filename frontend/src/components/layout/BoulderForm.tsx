import React from "react";
import { Button, Typography } from "@mui/material";
import { useState } from "react";
import PublishIcon from "@mui/icons-material/Publish";
import { DIFFICULTY_SELECT_MENU_ITEMS } from "../../utilities/constants";
import type { BoulderFormData } from "../../utilities/interfaces";
import FormFieldsContainer from "./FormFieldsContainer";

export default function BoulderForm() {
  const [formData, setFormData] = useState<BoulderFormData>({
    name: "",
    description: "",
    difficulty: "facile",
    lat: "",
    long: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => {
      return { ...prevFormData, [name]: value };
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(formData);
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
            name: "lat",
            value: formData.lat,
            onChange: handleChange,
          },
          {
            id: "textfield-long",
            label: "long",
            variant: "outlined",
            name: "long",
            value: formData.long,
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
