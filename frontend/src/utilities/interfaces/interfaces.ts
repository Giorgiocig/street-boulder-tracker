import type { FieldType } from "../types";

export interface ISelectForm {
  menuItems: string[];
  setFormData: React.Dispatch<React.SetStateAction<IBoulderForm>>;
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

export interface IBoulderForm {
  name: string;
  description: string;
  difficulty: string;
  latitude: string;
  longitude: string;
  createdAt: string;
}

export interface ILeafletMapViewerProps {
  latLong: [number, number] | null;
  setFormData: React.Dispatch<React.SetStateAction<IBoulderForm>>;
  name: string;
}
