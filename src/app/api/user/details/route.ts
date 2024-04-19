import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { userDetailsSchema } from "@/lib/definitions/user";

export async function PATCH(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const body = userDetailsSchema.parse(await req.json());

    await db.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        name: body.name,
        phone: body.phone,
        bio: body.bio,
      },
    });
    return new Response("OK", { status: 200 });
  } catch (error) {
    return new Response("Internal Server Error", { status: 500 });
  }
}
