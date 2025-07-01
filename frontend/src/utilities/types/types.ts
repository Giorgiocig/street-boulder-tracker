import type { IBoulderForm } from "../interfaces";

type TextFieldType = {
  id: string;
  label: string;
  name: string;
  variant: "outlined" | "standard" | "filled";
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  select?: false;
};

type SelectFieldType = {
  select: true;
  menuItems: string[];
  setFormData: React.Dispatch<React.SetStateAction<IBoulderForm>>;
  value: string;
};

export type FieldType = TextFieldType | SelectFieldType;

export type LocalizationType = {
  latitude: number;
  longitude: number;
};

export type Difficulty = "facile" | "medio" | "difficile";
