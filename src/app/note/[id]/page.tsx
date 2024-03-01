"use client";

import { FC } from "react";
import { useQuery } from "react-query";
import { notFound } from "next/navigation";
import NextLink from "next/link";
import { useSession } from "next-auth/react";
import { Globe, Loader, Lock } from "lucide-react";

import { get_note_by_id } from "@/services/note";
import Container from "@/components/layout/Container";
import NoteOutput from "@/components/note/NoteOutput";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/Button";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/Tooltip";
import Link from "@/components/ui/Link";
import { Badge } from "@/components/ui/Badge";
import BookmarkButton from "@/components/note/BookmarkButton";

interface NotePageProps {
  params: {
    id: string;
  };
}

const NotePage: FC<NotePageProps> = ({ params }) => {
  const { data: session } = useSession();
  const { data: note, isFetched } = useQuery(
    "getNoteById",
    () => get_note_by_id(params.id),
    {
      retry: false,
    }
  );

  if (!isFetched) {
    return <Loader className="mx-auto mt-20 animate-spin" />;
  }

  if (!note) {
    return notFound();
  }

  if (!note.isPublic && session?.user.id !== note.userId) {
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
    <main>
      <Container className="max-w-5xl mt-12">
        <div className="flex justify-between flex-col md:flex-row">
          <div className="flex flex-col gap-5">
            <h1 className="font-semibold text-4xl">{note.title}</h1>
            {note.tags && (
              <div className="flex gap-2 flex-wrap">
                {note.tags.map((tg: string) => (
                  <Badge key={tg} variant={"default"}>
                    {tg}
                  </Badge>
                ))}
              </div>
            )}
          </div>
          <div className="flex items-center gap-5 mt-3 md:mt-0 ml-auto">
            {session?.user.id === note.userId && (
              <>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      {note.isPublic ? (
                        <Globe className="h-5 w-5 text-zinc-500" />
                      ) : (
                        <Lock className="h-5 w-5 text-zinc-500" />
                      )}
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>
                        {note.isPublic
                          ? "Everyone with the link can view"
                          : "Only you can see this note"}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <BookmarkButton noteId={params.id} />

                <NextLink
                  href={`/app/note/${note.id}/edit`}
                  className={cn(buttonVariants({ variant: "secondary" }))}
                >
                  Edit Note
                </NextLink>
              </>
            )}
          </div>
        </div>
        {!!note.content && <NoteOutput content={note.content} />}
      </Container>
    </main>
  );
};

export default NotePage;
