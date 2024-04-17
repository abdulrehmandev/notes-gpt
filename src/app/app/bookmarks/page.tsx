"use client";

import GPTCreditsCard from "@/components/app/GPTCreditsCard";
import Container from "@/components/layout/Container";
import AllNotesPagination from "@/components/note/NotesPagination";
import NoteProfileCard from "@/components/note/NoteProfileCard";
import LoadingScreen from "@/components/shared/LoaderScreen";
import { get_bookmarks } from "@/services/bookmark";
import { useSearchParams } from "next/navigation";
import React from "react";
import { useQuery } from "react-query";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

interface BookmarksPageProps {}

const BookmarksPage: React.FC<BookmarksPageProps> = ({}) => {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;

  const bookmarksQuery = useQuery(["bookmarks", page], () =>
    get_bookmarks(page)
  );

  return (
    <main className="py-4 w-full">
      <h1 className="tracking-tighter font-medium text-4xl mb-8 ml-4 md:ml-6">
        Bookmarks
      </h1>
      <Container className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-full">
        <div className="md:col-span-3">
          <div className="mb-6">
            <div className="flex flex-col gap-2">
              {bookmarksQuery.isLoading ? (
                <LoadingScreen />
              ) : bookmarksQuery.data ? (
                bookmarksQuery.data.data.map((note) => (
                  <NoteProfileCard note={note} key={note.id} />
                ))
              ) : null}
            </div>
          </div>
          {!bookmarksQuery.isLoading &&
            (bookmarksQuery.data?.data.length ? (
              <AllNotesPagination
                hasNextPage={bookmarksQuery.data?.metadata.hasNextPage ?? false}
              />
            ) : (
              <div className="p-4 rounded-lg border -mt-6">
                <h4 className="text-xl font-semibold">
                  Let's create your first Note!
                </h4>
                <p className="text-zinc-500 mt-3 text-sm">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <Link
                  href="/app/create"
                  className={cn(buttonVariants({ variant: "primary" }), "mt-4")}
                >
                  Create Note
                </Link>
              </div>
            ))}
        </div>
        <GPTCreditsCard />
      </Container>
    </main>
  );
};

export default BookmarksPage;
