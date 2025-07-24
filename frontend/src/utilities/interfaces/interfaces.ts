import type { Difficulty, FieldType } from "../types";

export interface ISelectForm {
  menuItems: string[];
  setFormData: React.Dispatch<React.SetStateAction<IBoulderForm>>;
  value: string;
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
}

export interface IEventForm {
  id?: number;
  name: string;
  description: string;
  date: string;
  city: string;
  latitude: string;
  longitude: string;
  createdAt: string;
}

export interface ILeafletMapViewerProps {
  latLong: [number, number] | null;
  setFormData: React.Dispatch<React.SetStateAction<IBoulderForm>>;
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
