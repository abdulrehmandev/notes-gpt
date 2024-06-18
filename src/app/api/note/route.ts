import { z } from "zod";
import openai from "@/lib/openai";

import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { noteSchema } from "@/lib/definitions/note";
import { supabaseClient } from "@/lib/supabase";
import edjsHtml from "@/lib/edjs-html";

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

    const textToEmbed = Object.values({
      title: note.title,
      content: edjsHtml.parse(note.content).join(" "),
      tags: note.tags,
    }).join(" ");

    const {
      data: [{ embedding: embeddings }],
    } = await openai.embeddings.create({
      model: "text-embedding-ada-002",
      input: textToEmbed,
    });

    const { id } = await db.note.create({
      data: {
        ...note,
        content: note.content,
      },
      select: {
        id: true,
      },
    });

    const { error, data } = await supabaseClient
      .from("Note")
      .update({
        embeddings,
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return new Response(JSON.stringify(data), { status: 200 });
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
      include: {
        bookmarks: {
          where: {
            userId: session.user.id,
          },
        },
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
