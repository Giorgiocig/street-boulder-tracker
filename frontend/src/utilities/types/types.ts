import type { BoulderFormData } from "../interfaces";

type TextFieldType = {
  id: string;
  label: string;
  name: keyof BoulderFormData;
  variant: "outlined" | "standard" | "filled";
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  select?: false;
};

type SelectFieldType = {
  select: true;
  menuItems: string[];
  setFormData: React.Dispatch<React.SetStateAction<BoulderFormData>>;
};

export type FieldType = TextFieldType | SelectFieldType;
