import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { z } from "zod";

export async function PATCH(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    console.log(body);
    const isPrivate = z.boolean().parse(body.isPrivate);

    // check if username is taken
    const user = await db.user.findFirst({
      where: {
        username: session.user.username,
      },
    });

    if (!user) {
      return new Response("User does not exist", { status: 409 });
    }

    await db.user.update({
      where: {
        id: user.id,
      },
      data: {
        isPrivate: isPrivate,
      },
    });

    return new Response("OK", { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 400 });
    }
    return new Response("Internal Server Error", { status: 500 });
  }
}
