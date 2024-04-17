"use client";

import { FC } from "react";
import Link from "next/link";
import type { Session } from "next-auth";
import Logo from "../shared/Logo";
import Container from "./Container";
import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/Button";
import ProfileDropdown from "../shared/ProfileDropdown";

interface NavbarProps {
  session: Session | null;
}

const Navbar: FC<NavbarProps> = ({ session }) => {
  return (
    <header className="w-full border-b bg-white">
      <Container className="w-full flex items-center justify-between h-14">
        <Link href="/">
          <Logo />
        </Link>

        {!session ? (
          <nav className="flex items-center gap-3">
            <Link
              href="/auth/sign-in"
              className={cn(buttonVariants({ variant: "ghost", size: "link" }))}
            >
              Sign in
            </Link>
            <Link
              href="/auth/sign-up"
              className={cn(
                buttonVariants({ variant: "primary", size: "link" })
              )}
            >
              Sign up
            </Link>
          </nav>
        ) : (
          <nav className="flex items-center gap-3">
            <Link
              href="/app"
              className={cn(
                buttonVariants({ variant: "secondary", size: "link" })
              )}
            >
              Go to App
            </Link>
            <ProfileDropdown session={session} />
          </nav>
        )}
      </Container>
    </header>
  );
};

export default Navbar;
