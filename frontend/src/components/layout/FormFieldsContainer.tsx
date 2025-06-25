import { TextField } from "@mui/material";
import SelectForm from "../form/SelectForm";
import type { IFormFieldsContainerProps } from "../../utilities/interfaces";

export default function FormFieldsContainer({
  fields,
}: IFormFieldsContainerProps) {
  return (
    <>
      {fields.map((field) =>
        field.select ? (
          <SelectForm
            setFormData={field.setFormData}
            menuItems={field.menuItems}
          />
        ) : (
          <TextField
            id={field.id}
            label={field.label}
            name={field.name}
            variant={field.variant}
            onChange={field.onChange}
            value={field.value}
          />
        )
      )}
    </>
  );
}
