import { z } from "zod";

export const resetPasswordSchema = z
  .object({
    email: z.email("Please enter a valid email"),

    newPassword: z
      .string()
      .min(6, "Password must be at least 6 characters"),

    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export type ResetPasswordType = z.infer<typeof resetPasswordSchema>;