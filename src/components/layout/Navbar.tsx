"use client";

import { FC, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import type { Session } from "next-auth";
import {
  Bell,
  Bookmark,
  LogOut,
  Menu,
  Plus,
  Settings,
  StickyNoteIcon,
  User,
  UserRound,
} from "lucide-react";

import Logo from "../shared/Logo";
import Container from "./Container";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "../ui/Button";
import ProfileDropdown from "../shared/ProfileDropdown";
import { Sheet, SheetContent } from "../ui/Sheet";
import SidebarLink from "../shared/SidebarLink";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/Dropdown";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/Avatar";
import { getInitials } from "@/lib/helpers/stringsFormat";
import { appNavigation } from "@/data";
import { Separator } from "../ui/Separator";

interface NavbarProps {
  session: Session | null;
  type?: "home" | "app";
}

const Navbar: FC<NavbarProps> = ({ session, type = "app" }) => {
  const pathname = usePathname();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <header className="w-full border-b bg-white">
      <Container className="w-full flex items-center justify-between h-14">
        {type === "app" && !!session && (
          <Button
            size="icon"
            variant="ghost"
            className="md:hidden"
            onClick={() => setIsDrawerOpen(true)}
          >
            <Menu className="w-5 h-5" />
          </Button>
        )}

        <Link href="/">
          <Logo />
        </Link>

        <span className="w-5 md:hidden"></span>

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
        ) : type === "home" ? (
          <nav className="flex items-center gap-3">
            <Link
              href="/app"
              className={cn(buttonVariants({ variant: "ghost", size: "link" }))}
            >
              Workspace
            </Link>
            <ProfileDropdown session={session} />
          </nav>
        ) : (
          <>
            <div className="ml-6 hidden md:flex items-center w-full justify-between">
              <nav className="flex items-center gap-2">
                {session?.user &&
                  appNavigation.map((link) => (
                    <Link
                      href={link.href}
                      key={link.id}
                      className={cn(
                        buttonVariants({
                          variant: "ghost",
                          className: link.disabled
                            ? "pointer-events-none text-zinc-400"
                            : pathname === link.href
                            ? "text-blue-500 hover:text-blue-500/70"
                            : "",
                          size: "link",
                        })
                      )}
                    >
                      {link.text}
                    </Link>
                  ))}
              </nav>
              <div className="flex items-center gap-3">
                <Link
                  href="/app/notifications"
                  className={cn(
                    buttonVariants({
                      size: "icon",
                      variant: "ghost",
                      className: "relative",
                    })
                  )}
                >
                  <Bell className="w-4 h-4" />
                </Link>
                <ProfileDropdown session={session} />
              </div>
            </div>

            <Sheet open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
              <SheetContent>
                <div className="mt-12 pb-10 flex flex-col justify-between h-full">
                  <nav className="flex flex-col gap-1">
                    {appNavigation.map((link) => (
                      <SidebarLink
                        key={link.id}
                        href={link.href}
                        text={link.text}
                        disabled={link.disabled}
                      />
                    ))}
                    {type === "app" && (
                      <>
                        <Separator className="my-2" />
                        <SidebarLink href={"/app/create"} variant={"active"}>
                          <Plus className="w-4 h-4" /> Create
                        </SidebarLink>
                        <SidebarLink href={"/app"} variant={"disabled"}>
                          <Bookmark className="w-4 h-4" /> Bookmarks
                        </SidebarLink>
                        <SidebarLink href={"#"} variant={"disabled"}>
                          <StickyNoteIcon className="w-4 h-4" /> All Notes
                        </SidebarLink>
                        {/* <Separator className="mt-3 mb-4" />
                        <nav className="flex flex-col gap-1 px-3">
                          <span className="mb-2 font-medium text-xs">
                            Teams
                          </span>
                          <SidebarLink href={"#"} variant={"disabled"}>
                            Team 1
                          </SidebarLink>
                        </nav> */}
                      </>
                    )}
                  </nav>
                  <div className="flex item-center gap-2 my-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <div className="flex px-2 items-center data-[state=open]:bg-zinc-100 rounded-md w-full">
                          <Avatar>
                            <AvatarImage src={session.user.image as string} />
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

                      <DropdownMenuContent
                        className="min-w-[14.5rem]"
                        side="top"
                      >
                        <DropdownMenuItem asChild>
                          <Link href={`/${session.user.username}`}>
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
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </>
        )}
      </Container>
    </header>
  );
};

export default Navbar;
