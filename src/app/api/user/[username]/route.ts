import { db } from "@/lib/db";

export async function GET(
  req: Request,
  { params }: { params: { username: string } }
) {
  try {
    const { username } = params;

    const user = await db.user.findFirst({
      where: {
        username: username,
      },
    });

    if (!user) {
      return new Response("User not found", { status: 400 });
    }

    return new Response(
      JSON.stringify({
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email,
        bio: user.bio,
        created_at: user.createdAt,
      }),
      { status: 200 }
    );
  } catch (error) {
    return new Response("Internal Server Error", { status: 500 });
  }
}
