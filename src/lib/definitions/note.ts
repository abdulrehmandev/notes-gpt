import { z } from "zod";
import { looseOptional } from "../helpers/zodHelpers";

export const noteSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1).max(255),
  content: z.any(),
  userId: z.string(),
  isPublic: z.boolean(),
  tags: looseOptional(z.array(z.string())),
  createdAt: z.date(),
  updatedAt: z.date(),
});
export type NoteType = z.infer<typeof noteSchema>;
