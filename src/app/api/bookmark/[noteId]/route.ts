import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET(
  req: Request,
  { params }: { params: { noteId: string } }
) {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const bookmark = await db.bookmark.findFirst({
      where: {
        noteId: params.noteId,
        userId: session.user.id,
      },
    });

    if (!bookmark) {
      return new Response(null, { status: 200 });
    }

    return new Response(JSON.stringify(bookmark), { status: 200 });
  } catch (error) {
    return new Response("Internal Server Error", { status: 500 });
  }
}
