import type { FieldType } from "../types";

export interface ISelectForm {
  menuItems: string[];
  setFormData: React.Dispatch<React.SetStateAction<IBoulder>>;
  value: string;
}

export interface IBoulder {
  name: string;
  description: string;
  difficulty: string;
  latitude: number;
  longitude: number;
  createdAt: string;
  user?: any;
}

export interface IFormFieldsContainerProps {
  fields: FieldType[];
}
