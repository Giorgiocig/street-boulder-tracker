import {
  FormControl,
  MenuItem,
  Select,
  type SelectChangeEvent,
} from "@mui/material";
import { useEffect, useState } from "react";
import type { ISelectForm } from "../../utilities/interfaces";

export default function SelectForm({
  menuItems = [],
  setFormData,
}: ISelectForm) {
  const [difficulty, setDifficulty] = useState("facile");

  useEffect(() => {
    setFormData((prev) => ({ ...prev, difficulty }));
  }, [difficulty]);

  const handleChangeSelect = (event: SelectChangeEvent) => {
    setDifficulty(event.target.value as string);
  };
  return (
    <FormControl>
      <Select
        labelId="select-difficulty"
        id="select-difficulty"
        value={difficulty}
        label="difficulty"
        onChange={handleChangeSelect}
      >
        {menuItems.map((menuItem) => (
          <MenuItem value={menuItem}>{menuItem}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
