import Logo from "@/components/shared/Logo";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import React from "react";

const AccessDenied = () => {
  return (
    <div className="flex items-center justify-center flex-col gap-4 min-h-screen w-full">
      <Logo />
      <h3 className="font-semibold text-lg max-w-xs text-center">
        NotesGPT is only accessible for Beta user. Sorry for the inconvenience.
      </h3>
      <Button asChild variant="secondary">
        <Link href="/">Back to homepage</Link>
      </Button>
    </div>
  );
};

export default AccessDenied;
