import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import type { ISelectForm } from "../../utilities/interfaces";
import { Controller } from "react-hook-form";

export default function SelectForm({
  menuItems = [],
  name,
  label = "Difficoltà",
  control,
  errors = {},
}: ISelectForm) {
  return (
    <FormControl fullWidth error={!!errors[name]}>
      <InputLabel id={`${name}-label`}>{label}</InputLabel>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            label={label}
            value={field.value}
            onChange={(e) => field.onChange(e.target.value)}
          >
            {menuItems.map((item, index) => (
              <MenuItem key={index} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        )}
      />
      {errors[name] && (
        <FormHelperText>{errors[name]?.message as string}</FormHelperText>
      )}
    </FormControl>
  );
}
