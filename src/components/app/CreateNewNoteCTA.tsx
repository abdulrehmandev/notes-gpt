import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import { buttonVariants } from "../ui/Button";

const CreateNewNoteCTA = () => {
  return (
    <div className="bg-neutral-100 p-6 space-y-4 rounded-lg min-w-[600px]">
      <h5 className="font-semibold text-base">
        You don&apos;t have any Note yet. Click below to create one
      </h5>
      <Link
        href="/app/create"
        className={cn(buttonVariants({ variant: "primary" }))}
      >
        Create Note
      </Link>
    </div>
  );
};

export default CreateNewNoteCTA;
