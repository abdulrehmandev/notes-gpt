import { NoteType } from "@/lib/zod/note";
import Link from "next/link";
import { FC } from "react";

interface NoteProfileCardProps {
  note: NoteType;
}

const NoteProfileCard: FC<NoteProfileCardProps> = ({ note }) => {
  return (
    <Link href={`/app/note/{${note.id}}`}>
      <div className="w-full border shadow rounded-md px-4 md:px-6 py-4 hover:shadow-md">
        <h3 className="text-xl font-semibold mb-1 truncate">{note.title}</h3>
        <p className="text-sm text-zinc-500 truncate mb-1">
          {note.content.blocks[0].data.text ||
            note.content.blocks[0].data.link ||
            note.content.blocks[0].data.items[0].text}
        </p>
        <p className="w-fit ml-auto text-xs text-zinc-400">
          {new Date(note.createdAt).toLocaleDateString()}
        </p>
      </div>
    </Link>
  );
};

export default NoteProfileCard;
