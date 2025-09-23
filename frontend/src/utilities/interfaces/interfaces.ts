import type { Control, FieldError, FieldErrors } from "react-hook-form";
import type { Difficulty, FieldType } from "../types";

export interface ISelectForm {
  name: string;
  menuItems: string[];
  label?: string;
  required?: boolean;
  control: Control<any>;
  errors?: FieldErrors<any>;
}

export interface IBoulder {
  id?: number;
  name: string;
  description: string;
  difficulty: Difficulty;
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
  difficulty: Difficulty;
  latitude: string;
  longitude: string;
  createdAt: string;
  boulderImage: File | string;
}

export interface IEventForm {
  id?: number;
  name: string;
  description: string;
  date: string;
  city: string;
  latitude: number;
  longitude: number;
  createdAt: string;
}

export interface ILeafletMapViewerProps {
  latLong: [number, number] | null;
  setFormData: any;
  name: string;
}

export interface NominatimCity {
  display_name: string;
  lat: string;
  lon: string;
}

export interface City {
  name: string;
  lat: number;
  lng: number;
}

export interface IEventCard {
  id?: number;
  name: string;
  description: string;
  date: string;
  city: string;
}

export interface EventCardProps extends IEventForm {
  handleClickEvent: (event: number) => void;
}

export interface IBoulderImage {
  url: string;
  public_id: string;
  boulderId: number;
}

export interface CustomNumberInputProps {
  name: string;
  control: Control<any>;
  label?: string;
  dataTestId: string;
}
