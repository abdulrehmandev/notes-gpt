"use client";

import { FC, useState } from "react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut, Menu, Settings, User, UserRound } from "lucide-react";
import type { Session } from "next-auth";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/Dropdown";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/Avatar";
import { getInitials } from "@/lib/helpers/stringsFormat";
import AppNavLink from "./PrimaryNavLink";
import Logo from "./Logo";
import Container from "../layout/Container";
import PrimaryNavLink from "./PrimaryNavLink";
import { useBreakpoint } from "@/lib/hooks/use-breakpoint";
import { Button, buttonVariants } from "../ui/Button";

import { Sheet, SheetContent } from "../ui/Sheet";
import SidebarLink from "./SidebarLink";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/Accordion";

const navLinks = [
  { id: 1, href: "/app", text: "Home" },
  { id: 2, href: "groups", text: "Groups" },
  { id: 3, href: "ai", text: "Ask AI" },
];

interface AppNavProps {
  session: Session | null;
}

const AppNav: FC<AppNavProps> = ({ session }) => {
  const { isMd } = useBreakpoint("md");

  return isMd ? (
    <AppNavDesktop session={session} />
  ) : (
    <AppNavMobile session={session} />
  );
};

const AppNavMobile: FC<AppNavProps> = ({ session }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const pathname = usePathname();
  return (
    <>
      <Container>
        <div className="py-2 w-full flex justify-between items-center">
          <Button
            size="icon"
            variant="ghost"
            onClick={() => setIsDrawerOpen(true)}
          >
            <Menu className="w-5 h-5" />
          </Button>
          <Logo />
          <span className="w-6"></span>
        </div>
      </Container>

      <Sheet open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <SheetContent>
          <div className="mt-12 pb-10 flex flex-col justify-between h-full">
            <nav className="flex flex-col gap-2">
              {session?.user &&
                navLinks.map((link) => (
                  <SidebarLink
                    key={link.id}
                    href={link.href}
                    text={link.text}
                    variant={pathname === link.href ? "active" : "default"}
                  />
                ))}
            </nav>
            <div className="flex item-center gap-2 my-2">
              {session?.user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <div className="flex px-2 items-center data-[state=open]:bg-zinc-100 rounded-md w-full">
                      <Avatar>
                        <AvatarImage src="" />
                        <AvatarFallback>
                          {session?.user.name ? (
                            getInitials(session?.user.name)
                          ) : (
                            <UserRound />
                          )}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex items-center justify-start gap-2 p-2">
                        <div className="flex flex-col space-y-1 leading-none">
                          {session.user.name && (
                            <p className="font-medium w-fit">
                              {session.user.name}
                            </p>
                          )}
                          {session.user.email && (
                            <p className="truncate text-sm text-muted-foreground">
                              {session.user.email}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent className="min-w-[14.5rem]" side="top">
                    <DropdownMenuItem asChild>
                      <Link href={`/user/${session.user.username}`}>
                        <User className="w-4 h-4 mr-2" /> Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/user/settings">
                        <Settings className="w-4 h-4 mr-2" /> Settings
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => signOut()}>
                      <LogOut className="w-4 h-4 mr-2" /> Sign out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <>
                  <Link
                    className={cn(
                      buttonVariants({
                        size: "sm",
                        variant: "primary",
                        className: "w-full",
                      })
                    )}
                    href="/auth/sign-up"
                  >
                    Sign up
                  </Link>
                  <Link
                    className={cn(
                      buttonVariants({
                        size: "sm",
                        variant: "outline",
                        className: "w-full",
                      })
                    )}
                    href="/auth/sign-in"
                  >
                    Sign in
                  </Link>
                </>
              )}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

const AppNavDesktop: FC<AppNavProps> = ({ session }) => {
  const pathname = usePathname();

  return (
    <Container className="w-full py-3 bg-white border-b-0 border-zinc-200 flex items-center justify-between fixed left-0 right-0 z-10">
      <nav className="flex items-center gap-4">
        <Logo className="mr-6" />
        {session?.user &&
          navLinks.map((link) => (
            <AppNavLink
              key={link.id}
              href={link.href}
              text={link.text}
              variant={pathname === link.href ? "active" : "default"}
            />
          ))}
      </nav>

      {session?.user ? (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarImage src="" />
              <AvatarFallback>
                {session?.user.name ? (
                  getInitials(session?.user.name)
                ) : (
                  <UserRound />
                )}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <div className="flex items-center justify-start gap-2 p-2">
              <div className="flex flex-col space-y-1 leading-none">
                {session.user.name && (
                  <p className="font-medium">{session.user.name}</p>
                )}
                {session.user.email && (
                  <p className="w-[200px] truncate text-sm text-muted-foreground">
                    {session.user.email}
                  </p>
                )}
              </div>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href={`/user/${session.user.username}`}>
                <User className="w-4 h-4 mr-2" /> Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/user/settings">
                <Settings className="w-4 h-4 mr-2" /> Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => signOut()}>
              <LogOut className="w-4 h-4 mr-2" /> Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <PrimaryNavLink href="/auth/sign-in" text="Sign In" />
      )}
    </Container>
  );
};

export default AppNav;
