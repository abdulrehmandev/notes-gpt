import { z } from "zod";

export const NoteValidator = z.object({
  id: z.string(),
  title: z
    .string()
    .min(3, { message: "Title must be atleast 3 characters" })
    .max(100),
  content: z
    .string()
    .min(3, { message: "content must be atleast 3 characters" })
    .max(1000),
  tags: z.array(
    z.string().min(3, { message: "Tag must be atleast 3 characters" }).max(100)
  ),
  coverImg: z.string(),
  createdAt: z.string(),
});

export type NoteData = z.infer<typeof NoteValidator>;
