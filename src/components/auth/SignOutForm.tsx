"use client";

import { FC } from "react";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import type { Session } from "next-auth";

import { Button } from "../ui/Button";

interface SignOutFormProps {
  session: Session | null;
}

const SignOutForm: FC<SignOutFormProps> = ({ session }) => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center gap-4">
      <h5 className="text-zinc-700 leading-snug">
        Already signed in {session?.user.name ? "as" : "with"}{" "}
        <span className="font-semibold">
          {session?.user.name || session?.user.email}
        </span>
      </h5>
      <div className="flex gap-2 items-center">
        <Button onClick={() => router.back()} variant="outline">
          Go back
        </Button>
        <Button onClick={() => signOut()} className="gap-2" variant="ghost">
          Sign out <LogOut className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default SignOutForm;
