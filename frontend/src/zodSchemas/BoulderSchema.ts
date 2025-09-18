import * as z from "zod";

export const BoulderSchema = z.object({
  name: z.string().min(1, "Il nome del boulder è obbligatorio."),
});
