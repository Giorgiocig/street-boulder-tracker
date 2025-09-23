export type TextFieldType = {
  id: string;
  label: string;
  name: string;
  variant: "outlined" | "standard" | "filled";
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  select?: false;
};

export type LocalizationType = {
  latitude: number;
  longitude: number;
};

export type Difficulty = "facile" | "medio" | "difficile";
