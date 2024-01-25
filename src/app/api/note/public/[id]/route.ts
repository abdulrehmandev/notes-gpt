import { db } from "@/lib/db";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const notes = await db.note.findMany({
      where: {
        userId: params.id,
        isPublic: true,
      },
    });
    return new Response(JSON.stringify(notes), { status: 200 });
  } catch (error) {
    return new Response("Internal Server Error", { status: 500 });
  }
}
