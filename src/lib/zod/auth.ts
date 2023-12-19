import { z } from "zod";

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(100),
});
export type SignInType = z.infer<typeof signInSchema>;

export const signUpSchema = z.object({
  name: z.string().min(3).max(100),
  email: z.string().email(),
  password: z.string().min(6).max(100),
  confPassword: z.string().min(6).max(100),
});
export type SignUpType = z.infer<typeof signUpSchema>;
