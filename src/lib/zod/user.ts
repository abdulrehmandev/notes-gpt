import { z } from "zod";

export const userSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  username: z.string(),
  email: z.string().email(),
  bio: z.string(),
  created_at: z.date(),
});
export type UserType = z.infer<typeof userSchema>;
