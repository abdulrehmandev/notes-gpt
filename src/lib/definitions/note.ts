import { z } from "zod";
import { looseOptional } from "../helpers/zodHelpers";
import { BookmarkType } from "./bookmark";

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

type NoteWithBookmarkType = NoteType & { bookmarks: BookmarkType[] };
export type NotesFeedType = {
  data: NoteWithBookmarkType[];
  metadata: {
    hasNextPage: boolean;
    totalPages: number;
  };
};
