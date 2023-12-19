"use client";

import React, { FC, Suspense } from "react";
import {
  Bell,
  ChevronsLeft,
  File,
  Loader,
  Plus,
  Search,
  Sparkles,
  Users,
} from "lucide-react";
import { useAtom } from "jotai";

import { Logo } from "@/components/layout/logo";
import { SideBarLink } from "@/components/workspace-sidebar/sidebar-link";
import { SideBarProfile } from "./sidebar-profile";
import { findSheetAtom, searchCommandAtom, sideBarAtom } from "@/lib/atoms";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Kbd } from "../ui/kbd";
import { Separator } from "@/components/ui/separator";
import { ThemeToggle } from "../theme-toggle";

interface SideBarProps {}

export const SideBar: FC<SideBarProps> = ({}) => {
  const [sideBarOpen, setSideBarOpen] = useAtom(sideBarAtom);
  const [, setFindOpen] = useAtom(findSheetAtom);
  const [, setSearchOpen] = useAtom(searchCommandAtom);

  // collapse side bar using escape key
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setSideBarOpen(false);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <aside
      className={cn(
        `fixed top-0 left-0 bottom-0 max-w-[240px] flex flex-col justify-between w-full bg-background pt-6 pb-4 px-3 border-r border-border transition-transform duration-300 shadow-lg md:shadow-none ${
          sideBarOpen ? "" : "-translate-x-full md:translate-x-0"
        }`,
        sideBarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      )}
    >
      <div>
        {/* <Logo className="ml-2 mb-5 hidden md:flex" /> */}

        <div className="flex justify-between mb-5 pl-3 w-full">
          <Logo variant="icon" size="lg" />
          <div className="flex gap-1">
            <ThemeToggle />
            <Button
              variant="outline"
              className="px-2 gap-1 md:hidden"
              size="sm"
              onClick={() => setSideBarOpen(false)}
            >
              <ChevronsLeft size={16} />
            </Button>
          </div>
        </div>

        {/* <Button
          variant="outline"
          size="sm"
          className="flex gap-2 items-center px-2 text-input-foreground text-xs w-full justify-between mb-2"
          onClick={() => setSearchOpen(true)}
        >
          <div className="flex items-center gap-2">
            <Search size={13} />
            <span className="text-muted-foreground mr-2">Search ...</span>
          </div>
          <Kbd size="sm">Ctrl + K</Kbd>
        </Button> */}

        <Button
          size="sm"
          variant="primary"
          className="flex w-full mb-6"
          onClick={() => setFindOpen(true)}
        >
          <span>Find with AI</span>
          <Sparkles size={13} className="ml-2" />
        </Button>

        <div className="flex flex-col gap-0.5">
          <SideBarLink href={"#"}>
            <Search className="w-4 h-4" />
            <span>Search</span>
          </SideBarLink>
          <SideBarLink href={"#"}>
            <Bell className="w-4 h-4" />
            <span>Notifications</span>
          </SideBarLink>
          <SideBarLink
            className="text-primary opacity-100"
            href={"/workspace/notes/create"}
          >
            <Plus className="w-4 h-4" />
            <span>Create note</span>
          </SideBarLink>
        </div>

        <Separator className="my-4" />

        <Suspense
          fallback={
            <div className="flex w-full h-full items-center justify-center text-muted-foreground">
              <Loader size={23} />
            </div>
          }
        >
          <div className="flex flex-col gap-0.5">
            <SideBarLink href={"/workspace/notes"}>
              <File className="w-4 h-4" />
              <span>Notes</span>
            </SideBarLink>
            <SideBarLink href={"/workspace/rooms"}>
              <Users className="w-4 h-4" />
              <span>Spaces</span>
            </SideBarLink>
          </div>
        </Suspense>
      </div>

      <SideBarProfile />
    </aside>
  );
};
