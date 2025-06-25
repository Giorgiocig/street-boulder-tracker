import React from "react";
import { Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import PublishIcon from "@mui/icons-material/Publish";
import SelectForm from "../form/SelectForm";
import { DIFFICULTY_SELECT_FIELD } from "../../utilities/constants";
import type { BoulderFormData } from "../../utilities/interfaces";

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
      <TextField
        id="textfield-name"
        label="nome"
        name="name"
        variant="outlined"
        onChange={handleChange}
        value={formData.name}
      />
      <TextField
        id="textfield-description"
        label="descrizione"
        variant="outlined"
        name="description"
        value={formData.description}
        onChange={handleChange}
      />
      <SelectForm
        setFormData={setFormData}
        menuItems={DIFFICULTY_SELECT_FIELD}
      />
      <TextField
        id="textfield-lat"
        label="lat"
        variant="outlined"
        name="lat"
        value={formData.lat}
        onChange={handleChange}
      />
      <TextField
        id="textfield-long"
        label="long"
        variant="outlined"
        name="long"
        value={formData.long}
        onChange={handleChange}
      />
      <Button variant="contained" endIcon={<PublishIcon />} type="submit">
        Salva Boulder
      </Button>
    </form>
  );
}
