"use client";

import React from "react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { UserRound, User, Settings, LogOut } from "lucide-react";
import type { Session } from "next-auth";

import { getInitials } from "@/lib/helpers/stringsFormat";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/Avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "../ui/Dropdown";
import { redirect } from "next/navigation";

interface ProfileDropdownProps {
  session: Session;
}

const ProfileDropdown: React.FC<ProfileDropdownProps> = ({ session }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar size="md">
          <AvatarImage src={session.user.image as string} />
          <AvatarFallback className="text-xs">
            {session?.user.name ? (
              getInitials(session?.user.name)
            ) : (
              <UserRound />
            )}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[200px]">
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
        <DropdownMenuItem
          onClick={() => {
            signOut();
            redirect("/");
          }}
        >
          <LogOut className="w-4 h-4 mr-2" /> Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileDropdown;
