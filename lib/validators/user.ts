import { z } from "zod";

export const UserProfileValidator = z.object({
  fullName: z
    .string()
    .min(3, { message: "Name must be atleast 3 characters" })
    .max(120, { message: "Name must be less than 120 characters" }),
  username: z
    .string()
    .min(1, { message: "Username must be atleast 1 characters" })
    .max(40, { message: "Username must be less than 40 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  bio: z
    .string()
    .max(1000, { message: "Bio must be less than 1000 characters" }),
  isPublic: z.boolean().default(false),
});

export type UserData = z.infer<typeof UserProfileValidator>;
