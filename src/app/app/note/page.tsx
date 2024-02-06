import Container from "@/components/layout/Container";
import AllNotesPagination from "@/components/note/AllNotesPagination";
import { Pagination } from "@/components/ui/Pagination";

const NotesPage = () => {
  return (
    <main className="py-4">
      <Container className="grid grid-cols-1 md:grid-cols-5">
        <div>
          <div>
            <h1 className="tracking-tighter font-medium text-4xl mb-8">
              Your Notes
            </h1>
          </div>
          <AllNotesPagination />
        </div>
        <div></div>
      </Container>
    </main>
  );
};

export default NotesPage;
