import { z } from "zod";

export const loginSchema = z.object({
  name: z.string().min(1, "Name cannot be empty"), // Ensures name is a non-empty string
  email: z.string().email("Invalid email address"), // Ensures valid email format
  image: z.string().url("Invalid image URL"), // Ensures image is a valid URL
});

export type LoginFormInputs = z.infer<typeof loginSchema>;
