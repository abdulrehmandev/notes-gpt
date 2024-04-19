import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { usernameSchema } from "@/lib/definitions/user";
import { z } from "zod";

// UPDATE username
export async function PATCH(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    // validate request body for username
    const body = await req.json();
    const { username: newUsername } = usernameSchema.parse(body);

    // check if username is taken
    const user = await db.user.findFirst({
      where: {
        username: newUsername,
      },
    });

    if (user) {
      return new Response("Username is already taken", { status: 409 });
    }

    // update username
    await db.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        username: newUsername,
      },
    });

    return new Response("OK");
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 400 });
    }
    return new Response(
      "Unable to update username at this moment. Please try later",
      { status: 500 }
    );
  }
}
