import * as z from "zod";

export const EventSchema = z.object({
  city: z.string().min(1, "Il nome della citta è obbligatorio."),
  name: z.string().min(1, "Il nome dell'evento è obbligatorio."),
  description: z.string().min(1, "La descrizione è obbligatoria"),
  date: z
    .string()
    .min(1, "La data è obbligatoria")
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "Inserisci una data valida",
    }),
});
