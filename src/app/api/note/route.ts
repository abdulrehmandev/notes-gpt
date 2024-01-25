import { z } from "zod";

import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { noteSchema } from "@/lib/zod/note";

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const note = noteSchema
      .pick({ title: true, content: true, userId: true })
      .parse(await req.json());

    const newNote = await db.note.create({
      data: {
        ...note,
        content: note.content,
      },
    });

    return new Response(JSON.stringify(newNote), { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 400 });
    }
    return new Response("Internal Server Error", { status: 500 });
  }
}
