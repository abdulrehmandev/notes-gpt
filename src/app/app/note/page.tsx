import Container from "@/components/layout/Container";
import AllNotesPagination from "@/components/note/AllNotesPagination";
import NoteProfileCard from "@/components/note/NoteProfileCard";
import { Button } from "@/components/ui/Button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
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
        <Card className="h-fit">
          <CardHeader>
            <CardTitle>GPT Credits</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Available Credits: 121</p>
          </CardContent>
          <CardFooter className="gap-3">
            <Button size="sm" variant="secondary">
              View Details
            </Button>
            <Button variant="primary" size="sm">
              Buy More
            </Button>
          </CardFooter>
        </Card>
      </Container>
    </main>
  );
};

export default NotesPage;
