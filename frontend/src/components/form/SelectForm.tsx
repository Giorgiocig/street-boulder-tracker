import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  type SelectChangeEvent,
} from "@mui/material";
import { useEffect, useState } from "react";
import type { ISelectForm } from "../../utilities/interfaces";
import type { Difficulty } from "../../utilities";

export default function SelectForm({
  menuItems = [],
  setFormData,
  value,
}: ISelectForm) {
  const [difficulty, setDifficulty] = useState<Difficulty>(value as Difficulty);

  useEffect(() => {
    setFormData((prev) => ({ ...prev, difficulty }));
  }, [difficulty]);

  const handleChangeSelect = (event: SelectChangeEvent) => {
    setDifficulty(event.target.value as Difficulty);
  };
  return (
    <FormControl>
      <InputLabel id="select-difficulty-label">Difficoltà</InputLabel>
      <Select
        labelId="select-difficulty"
        id="select-difficulty"
        value={difficulty}
        label="Difficulty"
        onChange={handleChangeSelect}
      >
        {menuItems.map((menuItem: string) => (
          <MenuItem key={menuItem} value={menuItem}>
            {menuItem}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
