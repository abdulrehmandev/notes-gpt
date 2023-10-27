"use client";

import {
  Bell,
  ChevronDown,
  Command,
  Plus,
  Search,
  Sidebar,
  Sparkles,
} from "lucide-react";
import { Button } from "../../ui/button";

import React, { FC } from "react";
import { useAtom } from "jotai";
import { sideBarAtom, searchCommandAtom, findSheetAtom } from "@/lib/atoms";
import { Kbd } from "../../ui/kbd";

import {
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
  CommandDialog,
} from "@/components/ui/command";
import { SearchCommand } from "./search-command";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { NotificationDropDown } from "@/components/notification/notification-dropdown";
import { ThemeToggle } from "@/components/theme-toggle";

interface DashboardNavBarProps {}

export const DashboardNavBar: FC<DashboardNavBarProps> = ({}) => {
  const [sideBarOpen, setSideBarOpen] = useAtom(sideBarAtom);
  const [, setSearchOpen] = useAtom(searchCommandAtom);
  const [, setFindOpen] = useAtom(findSheetAtom);

  return (
    <div className="w-full bg-background border-b border-border px-3 py-2 flex items-center justify-between gap-3">
      {/* button to toggle sidebar */}
      <Button
        variant="icon"
        className="md:hidden"
        onClick={() => setSideBarOpen(!sideBarOpen)}
      >
        <Sidebar size={16} />
      </Button>

      <Button
        className="hidden md:flex"
        size="sm"
        onClick={() => setFindOpen(true)}
      >
        <span className=" xs:block">Find with AI</span>
        <Sparkles size={13} className="ml-2" />
      </Button>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          className="md:flex gap-2 items-center px-2 text-input-foreground text-xs hidden"
          onClick={() => {
            setSearchOpen(true);
          }}
        >
          <Search size={13} />
          <span className="text-muted-foreground mr-2">Search ...</span>
          <Kbd size="sm">Ctrl + K</Kbd>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="outline" size="sm">
              <span className="hidden sm:block">New</span>
              <Plus size={15} className="block sm:hidden" />
              <ChevronDown size={11} className="ml-1" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem disabled>Note</DropdownMenuItem>
            <DropdownMenuItem disabled>Room</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <ThemeToggle />

        <NotificationDropDown />
      </div>
    </div>
  );
};
