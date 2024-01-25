import { db } from "@/lib/db";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const note = await db.note.findFirst({
      where: {
        id: params.id,
      },
    });

    if (!note) {
      return new Response("Not Found", { status: 400 });
    }

    console.log(note.isPublic);

    return new Response(JSON.stringify(note), { status: 200 });
  } catch (error) {
    return new Response("Internal Server Error", { status: 500 });
  }
}
