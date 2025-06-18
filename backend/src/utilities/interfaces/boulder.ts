import { Difficulty } from "../enums/enums";

export interface IBoulder {
  name: string;
  description: string;
  difficulty: Difficulty;
  latitude: number;
  longitude: number;
  createdAt: string;
  userId?: number;
}
