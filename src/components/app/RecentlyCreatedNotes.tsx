"use client";

import { get_recent_notes } from "@/services/note";
import React, { FC } from "react";
import { useQuery } from "react-query";
import RecentNote from "../note/RecentNote";
import { Skeleton } from "../ui/Skeleton";
import CreateNewNoteCTA from "./CreateNewNoteCTA";

interface RecentlyCreatedNotesProps {}

const RecentlyCreatedNotes: FC<RecentlyCreatedNotesProps> = ({}) => {
  const notes = useQuery("notes", get_recent_notes, { retry: false });

  return (
    <div className="space-y-6 mb-2">
      <h2 className="text-lg font-bold">Recently Created Notes</h2>
      <div className="flex gap-4 overflow-auto pb-2">
        {notes.isLoading ? (
          [1, 2, 3].map((i) => (
            <div key={i} className="flex flex-col space-y-3">
              <Skeleton className="h-6 w-[250px] rounded-lg" />
              <div className="space-y-2">
                <Skeleton className="h-8 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>
          ))
        ) : notes.data?.length === 0 ? (
          <CreateNewNoteCTA />
        ) : (
          notes.data?.map((note) => <RecentNote note={note} key={note.id} />)
        )}
      </div>
    </div>
  );
};

export default RecentlyCreatedNotes;
