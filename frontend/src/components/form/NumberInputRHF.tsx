import * as React from "react";
import {
  Unstable_NumberInput as BaseNumberInput,
  numberInputClasses,
} from "@mui/base/Unstable_NumberInput";
import { Controller } from "react-hook-form";
import { FormControl, FormHelperText } from "@mui/material";
import { styled } from "@mui/system";
import type { CustomNumberInputProps } from "../../utilities";

const LabelWrapper = styled("label")<{ focused?: boolean; error?: boolean }>(
  ({ theme, focused, error }) => ({
    position: "absolute",
    top: -8,
    left: 14,
    backgroundColor: theme.palette.background.paper,
    padding: "0 4px",
    fontSize: "0.75rem",
    fontWeight: 500,
    color: error
      ? theme.palette.error.main
      : focused
      ? theme.palette.primary.main
      : theme.palette.text.secondary,
    pointerEvents: "none",
    zIndex: 1,
    transition: "color 0.2s ease",
    letterSpacing: "0.01em",
  })
);

const InputWrapper = styled("div")({
  position: "relative",
  width: "100%",
});

const StyledNumberInput = styled(BaseNumberInput)<{ error?: boolean }>(
  ({ theme, error }) => ({
    color: theme.palette.text.primary,
    background: theme.palette.background.paper,
    borderRadius: 8,
    border: `1px solid ${
      error ? theme.palette.error.main : theme.palette.divider
    }`,
    width: "100%",
    transition: "all 0.3s ease",

    "&:hover": {
      borderColor: error
        ? theme.palette.error.main
        : theme.palette.primary.main,
    },

    "&.Mui-focused": {
      borderWidth: 2,
      borderColor: error
        ? theme.palette.error.main
        : theme.palette.primary.main,
      boxShadow: error
        ? `0 0 0 1px ${theme.palette.error.main}40`
        : `0 0 0 1px ${theme.palette.primary.main}40`,
      outline: "none",
    },

    "&.Mui-disabled": {
      backgroundColor: theme.palette.action.disabledBackground,
      borderColor: theme.palette.action.disabled,
      color: theme.palette.text.disabled,
      cursor: "not-allowed",
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
      padding: "16.5px 14px",
      boxSizing: "border-box",
      color: "inherit",
      transition: "color 0.2s ease",

      "&::placeholder": {
        color: theme.palette.text.disabled,
        opacity: 0.7,
      },

      "&:disabled": {
        color: theme.palette.text.disabled,
        cursor: "not-allowed",
        WebkitTextFillColor: theme.palette.text.disabled,
      },
    },
  })
);

export const NumberInputRHF: React.FC<CustomNumberInputProps> = ({
  name,
  control,
  label,
  dataTestId,
}) => {
  const [focused, setFocused] = React.useState(false);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <FormControl fullWidth error={!!error} variant="outlined">
          <InputWrapper>
            {label && (
              <LabelWrapper focused={focused} error={!!error}>
                {label}
              </LabelWrapper>
            )}
            <StyledNumberInput
              data-testid={dataTestId}
              value={value ?? ""}
              onChange={(_, val) => onChange(val ?? 0)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              error={!!error}
            />
          </InputWrapper>
          {error && (
            <FormHelperText
              sx={{
                marginLeft: 1.75,
                marginRight: 1.75,
                marginTop: 0.375,
              }}
            >
              {error.message}
            </FormHelperText>
          )}
        </FormControl>
      )}
    />
  );
};
