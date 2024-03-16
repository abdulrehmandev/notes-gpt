"use client";

import React from "react";
import Container from "@/components/layout/Container";
import { useSearchParams } from "next/navigation";
import { useQuery } from "react-query";
import { get_notes } from "@/services/note";
import LoadingScreen from "@/components/shared/LoaderScreen";
import NoteProfileCard from "@/components/note/NoteProfileCard";
import GPTCreditsCard from "@/components/app/GPTCreditsCard";
import NotesPagination from "@/components/note/NotesPagination";

const AppPage = () => {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;

  const notesQuery = useQuery(["notes", page], () => get_notes(page));

  return (
    <main className="py-4 w-full">
      <h1 className="tracking-tighter font-medium text-4xl mb-8 ml-4 md:ml-6">
        Your Notes
      </h1>
      <Container className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-3">
          <div className="mb-6">
            <div className="flex flex-col gap-2">
              {notesQuery.isLoading ? (
                <LoadingScreen />
              ) : notesQuery.data ? (
                notesQuery.data.data.map((note) => (
                  <NoteProfileCard note={note} key={note.id} />
                ))
              ) : null}
            </div>
          </div>
          <NotesPagination
            hasNextPage={notesQuery.data?.metadata.hasNextPage ?? false}
          />
        </div>
        <GPTCreditsCard />
      </Container>
    </main>
  );
};

export default AppPage;
