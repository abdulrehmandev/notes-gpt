import { z } from "zod";

export const CredentialsValidator = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(100),
});

export type CredentialsPayload = z.infer<typeof CredentialsValidator>;
