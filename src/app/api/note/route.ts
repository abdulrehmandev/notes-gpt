import { z } from "zod";

import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { noteSchema } from "@/lib/definitions/note";

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const note = noteSchema
      .pick({
        title: true,
        content: true,
        userId: true,
        tags: true,
        isPublic: true,
      })
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

export async function GET(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const take = Number(searchParams.get("take")) || 5;
    const skip = Number(searchParams.get("page")) * take - take || 0;

    const notes = await db.note.findMany({
      skip,
      take,
      where: {
        userId: session.user.id,
      },
      orderBy: {
        updatedAt: "desc",
      },
    });

    const total = await db.note.count({ where: { userId: session.user.id } });

    return new Response(
      JSON.stringify({
        data: notes,
        metadata: {
          hasNextPage: skip + take < total,
          totalPages: Math.ceil(total / take),
        },
      }),
      { status: 200 }
    );
  } catch (error) {
    return new Response("Internal Server Error", { status: 500 });
  }
}
