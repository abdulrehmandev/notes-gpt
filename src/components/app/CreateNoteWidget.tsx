"use client";

import React, { FC } from "react";
import ReactTextArea from "react-textarea-autosize";
import { redirect, useRouter } from "next/navigation";

import { cn } from "@/lib/utils";

interface CreateNoteWidgetProps {}

const CreateNoteWidget: FC<CreateNoteWidgetProps> = ({}) => {
  const router = useRouter();

  return (
    <div className="pb-6 border-b">
      <ReactTextArea
        className={cn(
          "flex h-9 min-h-[100px] w-full rounded-md border border-zinc-300 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-zinc-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-500 ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
        )}
        placeholder="Write something..."
        onFocus={() => {
          router.push("/app/create");
        }}
      />
    </div>
  );
};

export default CreateNoteWidget;
