"use client";

import { ChevronUp, LogOut, Settings, User } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "../../../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../ui/dropdown-menu";
import { signOut, useSession } from "next-auth/react";

interface SideBarProfileProps {}

export const SideBarProfile = ({}: SideBarProfileProps) => {
  const { data: session } = useSession();

  if (!session) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="text-left hover:bg-neutral-200/50 dark:hover:bg-neutral-800 px-2 py-1.5 rounded-md text-sm flex items-center gap-3 bg-background border border-border">
        <Avatar className="w-6 h-6">
          <AvatarImage src={session.user?.image as string | undefined} />
          <AvatarFallback>AR</AvatarFallback>
        </Avatar>
        <p className="font-semibold">{session.user?.name}</p>
        <ChevronUp size={15} className="ml-auto mr-1" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[220px]">
        <DropdownMenuLabel className="text-xs font-normal">
          <p className="font-semibold">{session.user?.name}</p>
          <p className="opacity-70">{session.user?.email}</p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <User className="w-4 h-4" />
          <span className="ml-2">Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Settings className="w-4 h-4" />
          <span className="ml-2">Settings</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onSelect={(e: Event) => {
            e.preventDefault();
            signOut({ callbackUrl: `${window.location.origin}/auth/sign-in` });
          }}
        >
          <LogOut className="w-4 h-4" />
          <span className="ml-2">Sign Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
