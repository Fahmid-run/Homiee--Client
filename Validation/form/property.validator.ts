import { z } from "zod";

export const propertySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Property name must be at least 2 characters."),
  address: z.string().trim().min(5, "Enter a complete street address."),
  description: z
    .string()
    .trim()
    .min(10, "Description must be at least 10 characters."),
  city: z.string().trim().min(2, "City must be at least 2 characters."),
  totalrooms: z.coerce
    .number()
    .int("Total rooms must be a whole number.")
    .min(1, "Add at least one room."),
});

export type PropertyValues = z.infer<typeof propertySchema>;
