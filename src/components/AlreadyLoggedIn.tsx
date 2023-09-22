"use client";

import { Session } from "next-auth";
import Link from "next/link";
import { FC } from "react";
import { Button, buttonVariants } from "./ui/Button";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

interface AlreadyLoggedInProps {
  session: Session;
}

const AlreadyLoggedIn: FC<AlreadyLoggedInProps> = ({ session }) => {
  return (
    <div className="container mx-auto py-8 h-screen">
      <div className="w-full h-full flex items-center justify-center flex-col text-stone-400">
        {/* Logged in user */}
        <p className="text-stone-800 font-medium">
          Already logged in as{" "}
          <span className="text-primary">{session.user.name}</span>
        </p>

        {/* Back to Dashboard Link */}
        <Link
          href="/dashboard"
          className={buttonVariants({
            variant: "secondary",
            size: "sm",
            className: "mt-2 mb-6",
          })}
        >
          Back to Home
        </Link>

        {/* Logout button and then redirect to /login */}
        <Button
          onClick={() => {
            signOut({ callbackUrl: window.location.origin + "/login" });
          }}
          variant={"outlineSecondary"}
          size={"sm"}
        >
          Logout <LogOut className="ml-2" size={13} />
        </Button>
      </div>
    </div>
  );
};

export default AlreadyLoggedIn;
