import { db } from "@/lib/db";

export async function GET(
  req: Request,
  { params }: { params: { username: string } }
) {
  try {
    const { username } = params;

    // gets user from username
    const user = await db.user.findFirst({
      where: {
        username: username,
      },
    });

    if (!user) {
      return new Response("User not found", { status: 400 });
    }

    const followingCount = await db.follower.count({
      where: {
        userId: user.id,
        status: "ACCEPTED",
      },
    });

    const followerCount = await db.follower.count({
      where: {
        followingId: user.id,
        status: "ACCEPTED",
      },
    });

    // if user found, return user details
    return new Response(
      JSON.stringify({
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email,
        bio: user.bio,
        phone: user.phone,
        isPrivate: user.isPrivate,
        followers: followerCount,
        following: followingCount,
        created_at: user.createdAt,
      }),
      { status: 200 }
    );
  } catch (error) {
    return new Response("Internal Server Error", { status: 500 });
  }
}
