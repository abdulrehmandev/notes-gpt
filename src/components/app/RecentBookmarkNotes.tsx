"use client";

import { get_recent_notes } from "@/services/note";
import React, { FC } from "react";
import { useQuery } from "react-query";
import RecentNote from "../note/RecentNote";
import { Skeleton } from "../ui/Skeleton";
import CreateNewNoteCTA from "./CreateNewNoteCTA";
import { get_bookmarks } from "@/services/bookmark";

const RecentBookmarkNotes = () => {
  const notes = useQuery(["bookmarks"], () => get_bookmarks());

  if (!notes.isLoading && !notes.data) {
    return null;
  }

  if (notes.data?.data?.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6 mt-4 mb-2">
      <h2 className="text-lg font-bold">Recent Bookmarks</h2>
      <div className="flex gap-4 overflow-auto pb-2">
        {notes.isLoading
          ? [1, 2, 3].map((i) => (
              <div key={i} className="flex flex-col space-y-3">
                <Skeleton className="h-6 w-[250px] rounded-lg" />
                <div className="space-y-2">
                  <Skeleton className="h-8 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
            ))
          : notes.data?.data?.map((note) => (
              <RecentNote note={note} key={note.id} />
            ))}
      </div>
    </div>
  );
};

export default RecentBookmarkNotes;
