import { Box, TextField } from "@mui/material";
import SelectForm from "../form/SelectForm";
import type { IFormFieldsContainerProps } from "../../utilities/interfaces";

export default function FormFieldsContainer({
  fields,
}: IFormFieldsContainerProps) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
      {fields.map((field, idx) =>
        field.select ? (
          <SelectForm
            key={idx}
            setFormData={field.setFormData}
            menuItems={field.menuItems}
            value={field.value}
          />
        ) : (
          <TextField
            key={idx}
            id={field.id}
            label={field.label}
            name={field.name}
            variant={field.variant}
            onChange={field.onChange}
            value={field.value}
            multiline
            rows={field.label === "descrizione" ? 2 : 1}
          />
        )
      )}
    </Box>
  );
}
