export interface ISelectForm {
  menuItems: string[];
  setFormData: React.Dispatch<React.SetStateAction<BoulderFormData>>;
}

export interface BoulderFormData {
  name: string;
  description: string;
  difficulty: string;
  lat: string;
  long: string;
}
