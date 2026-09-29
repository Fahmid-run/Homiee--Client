import z from "zod";

export const RegistrationZodSchema = z.object({
  name: z.string().min(3, "Name must at least 3 characters long!!!"),
  email: z.email("Plz Provide a Valid Email!!"),
  password: z
    .string()
    .min(8, "Password Must Minimum 8 Characters Long.")
    .regex(/[a-z]/, "Password must contain atleast 1 Lowercase Letter")
    .regex(/[A-Z]/, "Password must contain atleast 1 Uppercase Letter")

    .regex(/[0-9]/, "Password must contain atleast 1 Number")
    .regex(/[^A-Za-z0-9]/, "Password must contain atleast 1 Special Character"),
  role: z
    .enum(
      ["PROPERTY_MANAGER", "TENANT", "PROPERTY_OWNER", "TENANT"],
      "Plz Choose a valid role",
    )
    .optional(),
});

export const LoginZodSchema = RegistrationZodSchema.pick({
  email: true,
  password: true,
});

export type FormValues = z.infer<typeof RegistrationZodSchema>;
