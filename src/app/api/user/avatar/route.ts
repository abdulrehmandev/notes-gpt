import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { url, username } = await req.json();

    const data = await db.user.update({
      where: {
        username,
      },
      data: {
        image: url,
      },
    });

    if (!data) {
      return new Response("User not found", { status: 404 });
    }

    return new Response("OK", { status: 200 });
  } catch (err) {
    return new Response("Internal Server Error", { status: 500 });
  }
}
