"use client";

import React, { FC } from "react";
import SidebarLink from "../shared/SidebarLink";
import {
  Bell,
  BookmarkCheck,
  LogOut,
  Plus,
  Settings,
  StickyNoteIcon,
  User,
  UserRound,
  Users,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/Dropdown";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/Avatar";
import { getInitials } from "@/lib/helpers/stringsFormat";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { Session } from "next-auth";

interface AppNavigationContentProps {
  session: Session;
}

const AppNavigationContent: FC<AppNavigationContentProps> = ({ session }) => {
  return (
    <div className="pt-4 flex flex-col justify-between h-full md:h-[88vh]">
      <nav className="flex flex-col gap-1">
        <SidebarLink href={"/app/create"}>
          <Plus className="w-4 h-4" /> Create
        </SidebarLink>
        <SidebarLink href={"/app"}>
          <StickyNoteIcon className="w-4 h-4" /> Notes
        </SidebarLink>
        <SidebarLink href={"/app/bookmarks"}>
          <BookmarkCheck className="w-4 h-4" /> Bookmarks
        </SidebarLink>
        <span className="h-3" />
        <SidebarLink href={"/app/notifications"}>
          <Bell className="w-4 h-4" /> Notifications
        </SidebarLink>
      </nav>

      <span className="h-full flex-1 block w-1" />
      <div className="flex item-center gap-2 mb-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex px-2 items-center data-[state=open]:bg-zinc-100 hover:bg-zinc-200/50 cursor-pointer rounded-md w-full">
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
              <div className="flex items-center justify-start gap-2 p-2 text-sm">
                <div className="flex flex-col space-y-1 leading-none">
                  {session.user.name && (
                    <p className="font-medium w-fit">{session.user.name}</p>
                  )}
                  {session.user.email && (
                    <p className="truncate text-xs text-muted-foreground">
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
            align="start"
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
  );
};

export default AppNavigationContent;
