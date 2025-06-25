import React from "react";
import {
  Button,
  FormControl,
  MenuItem,
  Select,
  TextField,
  Typography,
  type SelectChangeEvent,
} from "@mui/material";
import { useEffect, useState } from "react";
import PublishIcon from "@mui/icons-material/Publish";

type Props = {};

export default function BoulderForm({}: Props) {
  const [difficulty, setDifficulty] = useState("facile");
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    difficulty: "facile",
    lat: "",
    long: "",
  });

  useEffect(() => {
    setFormData((prev) => ({ ...prev, difficulty }));
  }, [difficulty]);

  const handleChangeSelect = (event: SelectChangeEvent) => {
    setDifficulty(event.target.value as string);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => {
      return { ...prevFormData, [name]: value };
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("dlfsjl");
  };

  return (
    <form onSubmit={handleSubmit}>
      <Typography>helllo</Typography>
      <TextField
        id="textfield-name"
        label="name"
        name="name"
        variant="outlined"
        onChange={handleChange}
        value={formData.name}
      />
      <TextField
        id="textfield-description"
        label="description"
        variant="outlined"
        name="description"
        value={formData.description}
        onChange={handleChange}
      />
      <FormControl>
        <Select
          labelId="select-difficulty"
          id="select-difficulty"
          value={difficulty}
          label="difficulty"
          onChange={handleChangeSelect}
        >
          <MenuItem value={"facile"}>Facile</MenuItem>
          <MenuItem value={"medio"}>Medio</MenuItem>
          <MenuItem value={"difficile"}>Difficile</MenuItem>
        </Select>
      </FormControl>
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
        Send
      </Button>
    </form>
  );
}
