import { NoteData } from "@/lib/validators/note";
import Image from "next/image";
import { FC } from "react";

interface NotesCardProps {
  note: NoteData;
}

export const NotesCard: FC<NotesCardProps> = ({ note }) => {
  return (
    <div className="bg-white dark:bg-black border border-border rounded-xl shadow-sm min-w-[120px] w-full flex flex-col overflow-hidden">
      <div className="relative w-full overflow-hidden max-h-16">
        <Image
          className="w-full h-full object-cover"
          src={note.coverImg}
          alt="Note Image"
          width={240}
          height={150}
        />
        {/* <div className="absolute inset-0 -bottom-1 bg-gradient-to-t from-white to-70%" /> */}
      </div>
      <div className="pt-2 pb-3 px-3">
        <h3 className="font-semibold text-sm line-clamp-1 mb-1">
          {note.title}
        </h3>
        <p className="text-xs line-clamp-3 opacity-80">{note.content}</p>
        <div className="flex gap-1 mt-2">
          {note.tags.slice(0, 3).map((tag) => (
            <span className="bg-muted text-muted-foreground px-2 py-1 text-2xs rounded-full">
              {tag}
            </span>
          ))}
        </div>
        <p className="opacity-70 text-2xs text-right mt-1">{note.createdAt}</p>
      </div>
    </div>
  );
};
