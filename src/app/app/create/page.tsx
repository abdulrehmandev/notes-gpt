import Container from "@/components/layout/Container";
import CreateNoteForm from "@/components/note/CreateNoteForm";
import { getAuthSession } from "@/lib/auth";

const CreateNotePage = async () => {
  const session = await getAuthSession();

  if (!session) {
    return null;
  }

  return (
    <main className="py-4 w-full">
      <Container className="max-w-full" removeStyles>
        <CreateNoteForm session={session} />
      </Container>
    </main>
  );
};

export default CreateNotePage;
