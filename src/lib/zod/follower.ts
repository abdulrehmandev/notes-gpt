import { z } from "zod";

export const followerSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  followingId: z.string().uuid(),
  status: z.enum(["PENDING", "ACCEPTED"]),
  createdAt: z.date(),
  updatedAt: z.date(),
});
export type FollowerType = z.infer<typeof followerSchema>;
