import { z } from "zod";
import validator from "validator";
import { looseOptional } from "../helpers/zodHelpers";

export const userSchema = z.object({
  id: z.string().uuid(),
  name: looseOptional(z.string().min(3).max(100)),
  username: z.string(),
  email: z.string().email(),
  bio: looseOptional(z.string().max(160)),
  created_at: z.date(),
  image: looseOptional(z.string().url()),
  phone: looseOptional(z.string().refine(validator.isMobilePhone)),
});
export type UserType = z.infer<typeof userSchema>;

export const usernameSchema = z.object({
  username: z
    .string()
    .min(3)
    .max(32)
    .regex(/^[a-zA-Z0-9_]+$/),
});
export type UsernameType = z.infer<typeof usernameSchema>;

export const userDetailsSchema = z.object({
  name: userSchema.shape.name,
  bio: userSchema.shape.bio,
  phone: userSchema.shape.phone,
});
export type UserDetailsType = z.infer<typeof userDetailsSchema>;
