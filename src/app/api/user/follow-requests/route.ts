import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { z } from "zod";

export async function GET(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session) {
      return new Response("Unauthorized", { status: 401 });
    }

    const followRequests = await db.follower.findMany({
      where: {
        followingId: session.user.id,
        status: "PENDING",
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            image: true,
            name: true,
          },
        },
      },
    });

    return new Response(
      JSON.stringify({
        totalRequests: followRequests.length,
        requests: followRequests,
      }),
      { status: 200 }
    );
  } catch (error) {
    return new Response("Internal Server Error", { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session) {
      return new Response("Unauthorized", { status: 401 });
    }

    const { status, id } = z
      .object({
        status: z.enum(["ACCEPTED"]),
        id: z.string(),
      })
      .parse(JSON.parse(await req.text()));

    const follower = await db.follower.findFirst({
      where: {
        id,
      },
    });

    if (!follower) {
      return new Response("Not Found", { status: 404 });
    }

    if (follower.followingId !== session.user.id) {
      return new Response("Unauthorized", { status: 401 });
    }

    await db.follower.update({
      where: {
        id,
      },
      data: {
        status,
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

export async function DELETE(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session) {
      return new Response("Unauthorized", { status: 401 });
    }

    const { id } = z
      .object({
        id: z.string(),
      })
      .parse(await req.json());

    const follower = await db.follower.findFirst({
      where: {
        id,
      },
    });

    if (!follower) {
      return new Response("Not Found", { status: 404 });
    }

    if (follower.followingId !== session.user.id) {
      return new Response("Unauthorized", { status: 401 });
    }

    await db.follower.delete({
      where: {
        id,
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
