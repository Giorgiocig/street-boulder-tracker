import * as z from "zod";

import { DIFFICULTY_SELECT_MENU_ITEMS } from "../utilities";

export const BoulderSchema = z.object({
  name: z.string().min(1, "Il nome del boulder è obbligatorio."),
  description: z.string().min(1, "la descrizione è obbligatoria."),
  difficulty: z.enum(DIFFICULTY_SELECT_MENU_ITEMS, {
    error: "La difficoltà è obbligatoria.",
  }),
  latitude: z.number().min(1, "latitudine è obbligatoria."),
});
