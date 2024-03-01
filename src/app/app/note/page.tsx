import GPTCreditsCard from "@/components/app/GPTCreditsCard";
import Container from "@/components/layout/Container";
import AllNotesPagination from "@/components/note/NotesPagination";
import NoteProfileCard from "@/components/note/NoteProfileCard";
import { Pagination } from "@/components/ui/Pagination";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";

const NotesPage = async () => {
  const session = await getAuthSession();
  const notes = await db.note.findMany({
    where: {
      userId: session?.user.id,
    },
  });
  return (
    <main className="py-4">
      <h1 className="tracking-tighter font-medium text-4xl mb-8 ml-4 md:ml-6">
        Your Notes
      </h1>
      <Container className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-3">
          <div className="mb-6">
            <div className="flex flex-col gap-2">
              {notes.map((note) => (
                <NoteProfileCard note={note} key={note.id} />
              ))}
            </div>
          </div>
          <AllNotesPagination />
        </div>
        <GPTCreditsCard />
      </Container>
    </main>
  );
};

export default NotesPage;
