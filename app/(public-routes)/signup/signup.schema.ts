import { z } from "zod";

// This matches the GenderEnum in your backend
export const genderEnum = z.enum(["MALE", "FEMALE", "OTHER", "UNKNOWN"]);

export const signupSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  // Optional fields
  phone: z.string().optional(),
  gender: genderEnum.default("UNKNOWN"),
});

export type SignupFormValues = z.infer<typeof signupSchema>;
