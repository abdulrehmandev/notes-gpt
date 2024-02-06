import { NoteType } from "@/lib/zod/note";
import React, { FC } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/Card";
import Link from "next/link";

interface RecentNoteProps {
  note: NoteType;
}

const RecentNote: FC<RecentNoteProps> = ({ note }) => {
  return (
    <Link href={`/app/note/${note.id}`}>
      <Card className="md:max-w-xs max-w-[250px] min-w-[250px] md:min-w-[300px] hover:shadow">
        <CardHeader>
          <CardTitle className="truncate">{note.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="truncate">
            {note.content.blocks[0].data.text ||
              note.content.blocks[0].data.link ||
              note.content.blocks[0].data.items[0].text}
          </CardDescription>
          <p className="w-fit mt-2 ml-auto text-xs text-zinc-400">
            {new Date(note.createdAt).toLocaleDateString()}{" "}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
};

export default RecentNote;
