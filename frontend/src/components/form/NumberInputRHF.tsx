import * as React from "react";
import {
  Unstable_NumberInput as BaseNumberInput,
  numberInputClasses,
} from "@mui/base/Unstable_NumberInput";
import { Controller } from "react-hook-form";
import { FormControl, FormHelperText, InputLabel } from "@mui/material";
import { styled } from "@mui/system";
import type { CustomNumberInputProps } from "../../utilities";

const StyledNumberInput = styled(BaseNumberInput)(({ theme }) => ({
  color: theme.palette.text.primary,
  background: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.grey[400]}`,
  padding: "10.5px 14px",
  width: "100%",
  "&:hover": {
    borderColor: theme.palette.text.primary,
  },
  "&.Mui-focused": {
    borderColor: theme.palette.primary.main,
    boxShadow: `0 0 0 2px ${theme.palette.primary.main}33`,
  },
  [`& .${numberInputClasses.incrementButton}, & .${numberInputClasses.decrementButton}`]:
    {
      display: "none",
    },
  [`& .${numberInputClasses.input}`]: {
    width: "100%",
    border: "none",
    outline: "none",
    background: "transparent",
    font: "inherit",
  },
}));

export const NumberInputRHF: React.FC<CustomNumberInputProps> = ({
  name,
  control,
  label,
  dataTestId,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <FormControl fullWidth error={!!error}>
          {label && <InputLabel shrink>{label}</InputLabel>}
          <StyledNumberInput
            data-testid={dataTestId}
            value={value ?? ""}
            onChange={(_, val) => {
              onChange(val ?? 0);
            }}
          />
          {error && <FormHelperText>{error.message}</FormHelperText>}
        </FormControl>
      )}
    />
  );
};
