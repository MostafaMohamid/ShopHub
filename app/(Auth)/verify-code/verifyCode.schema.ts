import { z } from "zod";

export const verifyCodeSchema = z.object({
  resetCode: z
    .string()
    .length(6, "Verification code must be 6 digits"),
});

export type VerifyCodeType = z.infer<typeof verifyCodeSchema>;