import { NotesCard } from "@/components/notes/notes-card";
import { NoteData } from "@/lib/validators/note";
import { FC } from "react";

const tempNote: NoteData = {
  title: "Favourite movies",
  content:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  createdAt: "3 days ago",
  coverImg:
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80",
  tags: ["movies", "favourites"],
};

interface NotesPageProps {}

const NotesPage: FC<NotesPageProps> = async ({}) => {
  return (
    <section className="">
      <div className="w-full py-2 px-4 my-2">
        <h1 className="font-semibold text-3xl">Notes</h1>
      </div>

      {/* recently visited notes */}
      <div className="w-full py-2 px-4">
        <h2 className="font-medium text-lg mb-2">Recently Visited</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          <NotesCard note={tempNote} />
          <NotesCard note={tempNote} />
          <NotesCard note={tempNote} />
        </div>
      </div>
    </section>
  );
};

export default NotesPage;
