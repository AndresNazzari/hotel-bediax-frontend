import { z } from "zod";

export const createDestinationSchema = z.object({
    name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
    description: z.string().max(500, "Máximo 500 caracteres").optional().or(z.literal("")),
});

export type CreateDestinationFormData = z.infer<typeof createDestinationSchema>;
