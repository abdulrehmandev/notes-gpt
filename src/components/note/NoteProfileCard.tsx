import { NoteType } from "@/lib/definitions/note";
import Link from "next/link";
import { FC } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/Card";
import edjsHtml from "@/lib/edjs-html";
import { Globe, Lock } from "lucide-react";
import { Badge } from "../ui/Badge";

interface NoteProfileCardProps {
  note: NoteType;
}

const NoteProfileCard: FC<NoteProfileCardProps> = ({ note }) => {
  return (
    <Link href={`/note/${note.id}`}>
      <Card className="hover:shadow transition-shadow">
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between">
            <CardTitle>{note.title}</CardTitle>
            {note.isPublic ? (
              <Globe className="w-4 h-4 text-slate-400" />
            ) : (
              <Lock className="w-4 h-4 text-slate-400" />
            )}
          </div>
        </CardHeader>
        <CardContent>
          <CardDescription className="line-clamp-2">
            {edjsHtml
              .parse(note.content)
              .join(". ")
              .replace(/<[^>]*>?/gm, "")}
          </CardDescription>
          <div className="flex items-center justify-end gap-3 mt-2">
            {note.tags?.slice(0, 2).map((tag) => (
              <Badge variant="secondary" key={tag} className="text-xs">
                {tag}
              </Badge>
            ))}
            <p className="w-fit ml-auto text-xs text-zinc-400">
              {new Date(note.createdAt).toLocaleDateString()}{" "}
            </p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default NoteProfileCard;
