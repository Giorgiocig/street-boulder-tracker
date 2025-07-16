import * as z from "zod";

export const EventSchema = z.object({
  name: z.string().min(1, "Il nome dell'evento è obbligatorio."),
  description: z.string().min(1, "La descrizione è obbligatoria."),
  lat: z.string().min(1, "La latitudine é obbligatoria."),
  long: z.string().min(1, "La longitudine é obbligatoria."),
});
