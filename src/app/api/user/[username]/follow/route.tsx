import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";

export async function POST(
  req: Request,
  { params }: { params: { username: string } }
) {
  try {
    const session = await getAuthSession();

    if (!session) {
      return new Response("Unauthorized", { status: 401 });
    }

    const { username } = params;

    const user = await db.user.findFirst({
      where: {
        username,
      },
    });

    if (!user) {
      return new Response("User not found", { status: 404 });
    }

    if (user.id === session.user.id) {
      return new Response("Invalid Request! You can not follow yourself.", {
        status: 400,
      });
    }

    const follower = await db.follower.findFirst({
      where: {
        userId: session.user.id,
        followingId: user.id,
      },
    });

    if (follower) {
      return new Response("Already followed!", {
        status: 400,
      });
    }

    await db.follower.create({
      data: {
        userId: session.user.id,
        followingId: user.id,
        status: user.isPrivate ? "PENDING" : "ACCEPTED",
      },
    });

    return new Response("OK", { status: 200 });
  } catch (error) {
    return new Response("Internal server error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { username: string } }
) {
  try {
    const session = await getAuthSession();

    if (!session) {
      return new Response("Unauthorized", { status: 401 });
    }

    const { username } = params;

    const user = await db.user.findFirst({
      where: {
        username,
      },
    });

    if (!user) {
      return new Response("User not found", { status: 404 });
    }

    if (user.id === session.user.id) {
      return new Response("Invalid Request! You can not follow yourself.", {
        status: 400,
      });
    }

    const follower = await db.follower.findFirst({
      where: {
        userId: session.user.id,
        followingId: user.id,
      },
    });

    if (!follower) {
      return new Response("Not followed!", {
        status: 200,
      });
    }

    return new Response(JSON.stringify(follower), { status: 200 });
  } catch (error) {
    return new Response("Internal server error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { username: string } }
) {
  try {
    const session = await getAuthSession();

    if (!session) {
      return new Response("Unauthorized", { status: 401 });
    }

    const { username } = params;

    const user = await db.user.findFirst({
      where: {
        username,
      },
    });

    if (!user) {
      return new Response("User not found", { status: 404 });
    }

    if (user.id === session.user.id) {
      return new Response("Invalid Request! You can not unfollow yourself.", {
        status: 400,
      });
    }

    const follower = await db.follower.findFirst({
      where: {
        userId: session.user.id,
        followingId: user.id,
      },
    });

    if (!follower) {
      return new Response("Not followed!", {
        status: 400,
      });
    }

    await db.follower.delete({
      where: {
        id: follower.id,
      },
    });

    return new Response("OK", { status: 200 });
  } catch (error) {
    return new Response("Internal server error", { status: 500 });
  }
}
