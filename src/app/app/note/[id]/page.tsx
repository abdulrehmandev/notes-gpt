import { FC } from "react";
import { notFound } from "next/navigation";

import { get_note_by_id } from "@/services/note";
import Container from "@/components/layout/Container";
import Link from "@/components/ui/Link";
import CreateNoteForm from "@/components/note/CreateNoteForm";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";

interface NotePageProps {
  params: {
    id: string;
  };
}

const NotePage: FC<NotePageProps> = async ({ params }) => {
  const session = await getAuthSession();
  const note = await db.note.findUnique({
    where: {
      id: params.id,
    },
  });

  if (!note) {
    return notFound();
  }

  if (!session?.user.id) {
    return (
      <main>
        <Container className="max-w-5xl mt-12">
          <div className="py-4 px-6 space-y-2 text-center">
            <h1 className="font-semibold text-xl">
              Sorry, this page isn&apos;t available.
            </h1>
            <p className="text-sm max-w-xl mx-auto ">
              The page you requested is either private, or the link you followed
              may be broken, or the page may have been removed.{" "}
              <Link href="/app" text="Go back to Workspace" />.
            </p>
          </div>
        </Container>
      </main>
    );
  }

  return (
    <main className="py-4">
      <Container removeStyles>
        <CreateNoteForm note={note} session={session} />
      </Container>
    </main>
  );
};

export default NotePage;
