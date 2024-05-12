import { z } from "zod";

import { getAuthSession } from "@/lib/auth";
import { supabaseClient } from "@/lib/supabase";
import edjsHtml from "@/lib/edjs-html";
import openai from "@/lib/openai";
// import fs from "fs";

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const { message } = z
      .object({
        message: z
          .string()
          .min(10, { message: "Message must be larger than 10 charaters" }),
      })
      .parse(await req.json());

    const {
      data: [{ embedding: embeddings }],
    } = await openai.embeddings.create({
      model: "text-embedding-ada-002",
      input: message,
    });

    // const embeddings = JSON.parse(
    //   (await fs.promises.readFile("emb.txt")).toString()
    // );

    const { data, error } = await supabaseClient.rpc("vector_search", {
      query_embeddings: embeddings,
      similarity_threshold: 0.7,
      match_count: 1,
      user_id: session.user.id,
    });

    if (error) {
      throw new Error(error.message);
    }

    const note = data[0];

    const context = `Title: ${note.title} 

      ${edjsHtml.parse(note.content).join(" ")}

      ${note.tags.length > 0 ? "Tags: " + note.tags.toString() : ""}`;

    return new Response(JSON.stringify({ context }), { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 400 });
    }
    return new Response("Internal Server Error", { status: 500 });
  }
}
