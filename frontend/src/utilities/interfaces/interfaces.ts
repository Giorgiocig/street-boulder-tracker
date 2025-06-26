import type { FieldType } from "../types";

export interface ISelectForm {
  menuItems: string[];
  setFormData: React.Dispatch<React.SetStateAction<BoulderFormData>>;
  value: string;
}

export interface BoulderFormData {
  name: string;
  description: string;
  difficulty: string;
  lat: string;
  long: string;
}

export interface IFormFieldsContainerProps {
  fields: FieldType[];
}
