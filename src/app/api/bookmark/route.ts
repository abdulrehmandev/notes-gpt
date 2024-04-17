import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const { noteId } = await req.json();

    if (!noteId) {
      return new Response("Bad Request", { status: 400 });
    }

    const existingBookmark = await db.bookmark.findFirst({
      where: { noteId, userId: session.user.id },
    });

    if (existingBookmark) {
      return new Response("Already bookmarked", { status: 400 });
    }

    const bookmark = await db.bookmark.create({
      data: {
        userId: session.user.id,
        noteId,
      },
    });

    return new Response(JSON.stringify(bookmark), { status: 200 });
  } catch (error) {
    return new Response("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const { noteId } = await req.json();

    if (!noteId) {
      return new Response("Bad Request", { status: 400 });
    }

    const existingBookmark = await db.bookmark.findFirst({
      where: { noteId, userId: session.user.id },
    });

    if (!existingBookmark) {
      return new Response("Not found!", { status: 404 });
    }

    await db.bookmark.delete({
      where: { id: existingBookmark.id },
    });

    return new Response("OK", { status: 200 });
  } catch (error) {
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

    const bookmarks = await db.bookmark.findMany({
      skip,
      take,
      where: {
        userId: session.user.id,
      },
      select: {
        note: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });
    const bookmarkedNotes = bookmarks.map((bookmark) => bookmark.note);

    const total = await db.bookmark.count({
      where: { userId: session.user.id },
    });

    return new Response(
      JSON.stringify({
        data: bookmarkedNotes,
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
