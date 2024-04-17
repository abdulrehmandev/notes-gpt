"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import { useQuery } from "react-query";
import { get_notes } from "@/services/note";
import LoadingScreen from "@/components/shared/LoaderScreen";
import NoteProfileCard from "@/components/note/NoteProfileCard";
import GPTCreditsCard from "@/components/app/GPTCreditsCard";
import NotesPagination from "@/components/note/NotesPagination";
import { Card, CardHeader } from "@/components/ui/Card";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/Button";

const AppPage = () => {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;

  const notesQuery = useQuery(["notes", page], () => get_notes(page));

  return (
    <main className="py-4 w-full">
      <h1 className="tracking-tighter font-medium text-4xl mb-8 ml-4 md:ml-6">
        Your Notes
      </h1>
      <div className="px-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-3">
          <div className="flex flex-col gap-2 mb-6">
            {notesQuery.isLoading ? (
              <LoadingScreen />
            ) : notesQuery.data ? (
              notesQuery.data.data.map((note) => (
                <NoteProfileCard note={note} key={note.id} />
              ))
            ) : null}
          </div>
          {!notesQuery.isLoading &&
            (notesQuery.data?.data.length ? (
              <NotesPagination
                hasNextPage={notesQuery.data?.metadata.hasNextPage ?? false}
              />
            ) : (
              <div className="p-4 rounded-lg border -mt-6">
                <h4 className="text-xl font-semibold">
                  Let&apos;s create your first Note!
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
      </div>
    </main>
  );
};

export default AppPage;
