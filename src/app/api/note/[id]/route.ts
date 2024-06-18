import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { noteSchema } from "@/lib/definitions/note";
import { z } from "zod";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const note = await db.note.findFirst({
      where: {
        id: params.id,
      },
    });

    if (!note) {
      return new Response("Not Found", { status: 400 });
    }

    return new Response(JSON.stringify(note), { status: 200 });
  } catch (error) {
    return new Response("Internal Server Error", { status: 500 });
  }
}

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const note = await db.note.findFirst({
      where: {
        id: params.id,
      },
    });

    if (!note) {
      return new Response("Not Found", { status: 400 });
    }

    if (note.userId !== session.user.id) {
      return new Response("Unauthorized", { status: 401 });
    }

    const noteBody = noteSchema
      .pick({
        title: true,
        content: true,
        tags: true,
        isPublic: true,
      })
      .parse(await req.json());

    await db.note.update({
      where: {
        id: note.id,
      },
      data: noteBody,
    });

    return new Response("OK", { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 400 });
    }
    return new Response("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const note = await db.note.findFirst({
      where: {
        id: params.id,
      },
    });

    if (!note) {
      return new Response("Not Found", { status: 400 });
    }

    if (note.userId !== session.user.id) {
      return new Response("Unauthorized", { status: 401 });
    }

    await db.note.delete({
      where: {
        id: note.id,
      },
      include: {
        bookmarks: {
          where: {
            noteId: note.id,
          },
        },
      },
    });

    return new Response("OK", { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
