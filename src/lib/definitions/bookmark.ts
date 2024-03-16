import { z } from "zod";
import { NoteType } from "./note";

export const bookmarkSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  noteId: z.string().uuid(),
  created_at: z.date(),
});
export type BookmarkType = z.infer<typeof bookmarkSchema>;
