"use client";

import { Container } from "./container";
import { Link } from "../ui/link";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "../ui/button";
import { Logo } from "./logo";
import { ThemeToggle } from "../theme-toggle";
import { default as NextLink } from "next/link";
import { Menu } from "lucide-react";
import { Sheet, SheetContent } from "../ui/sheet";
import { Separator } from "../ui/separator";
import { useState } from "react";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";

interface NavbarProps {
  session: Session | null;
}

export const Navbar: React.FC<NavbarProps> = ({ session }) => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <header className="w-full">
      {/* main navbar body */}
      <Container>
        <div className="flex items-center justify-between h-16">
          {/* app logo */}
          <NextLink href="/">
            <Logo size="md" className="hover:cursor-pointer pl-2 md:pl-0" />
          </NextLink>

          {/* navigation links */}
          <nav className="hidden items-center gap-3 text-sm md:flex">
            <Link variant="navlink" href="/pricing">
              Pricing
            </Link>
            <Link variant="navlink" href="/about">
              About
            </Link>

            <ThemeToggle />

            {session ? (
              <>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => {
                    signOut({
                      callbackUrl: `${window.location.origin}/auth/sign-in`,
                    });
                  }}
                >
                  Sign out
                </Button>
                <Link
                  className={cn(
                    buttonVariants({
                      className: "hover:no-underline",
                      size: "sm",
                    })
                  )}
                  href="/workspace"
                >
                  Go to Workspace
                </Link>
              </>
            ) : (
              <>
                {/* auth links */}
                <Link
                  variant="navlink"
                  className={cn(
                    buttonVariants({
                      size: "sm",
                      variant: "outline",
                    })
                  )}
                  href="/auth/sign-in"
                >
                  Sign in
                </Link>
                <Link
                  className={cn(
                    buttonVariants({
                      className: "hover:no-underline",
                      size: "sm",
                    })
                  )}
                  href="/auth/sign-up"
                >
                  Get Started
                </Link>
              </>
            )}
          </nav>

          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            {/* nav toggler */}
            <Button
              variant="ghost"
              size={"sm"}
              onClick={() => setIsNavOpen(true)}
            >
              <Menu size="16" />
            </Button>
          </div>

          {/* mobile nav */}
          <Sheet open={isNavOpen} onOpenChange={setIsNavOpen}>
            <SheetContent className="flex flex-col justify-between gap-2 pt-20 pb-0 px-0">
              <div className="flex flex-col">
                <NextLink
                  href="/pricing"
                  className="w-full py-1.5 px-6 border-b border-border font-medium"
                >
                  Pricing
                </NextLink>
                <NextLink
                  href="/about"
                  className="w-full py-1.5 px-6 border-b border-border font-medium"
                >
                  About
                </NextLink>
              </div>

              <div className="flex w-full items-center py-6 px-6 gap-2 self-end">
                {session ? (
                  <>
                    <Link
                      className={cn(
                        buttonVariants({
                          className: "hover:no-underline w-full",
                          size: "sm",
                        })
                      )}
                      href="/workspace"
                    >
                      Go to Workspace
                    </Link>
                    <Button
                      size="sm"
                      variant="secondary"
                      className="w-full"
                      onClick={() => {
                        signOut({
                          callbackUrl: `${window.location.origin}/auth/sign-in`,
                        });
                      }}
                    >
                      Sign out
                    </Button>
                  </>
                ) : (
                  <>
                    <NextLink
                      className={cn(
                        buttonVariants({
                          variant: "outline",
                          className: "w-full",
                        })
                      )}
                      href="/auth/sign-in"
                    >
                      Sign in
                    </NextLink>
                    <NextLink
                      className={cn(buttonVariants({ className: "w-full" }))}
                      href="/auth/sign-up"
                    >
                      Sign up
                    </NextLink>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </Container>
    </header>
  );
};
