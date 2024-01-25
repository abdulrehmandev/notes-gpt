import { appSidebarNavigation } from "@/data";
import React from "react";
import SidebarLink from "../shared/SidebarLink";
import { Bookmark, Home, Plus, StickyNoteIcon, User } from "lucide-react";
import { Separator } from "../ui/Separator";

interface AppSidebarProps {}

const AppSidebar: React.FC<AppSidebarProps> = ({}) => {
  return (
    <aside className="hidden md:block h-[calc(100vh-80px)] w-60 border-r py-3">
      <nav className="flex flex-col gap-1 px-3">
        <SidebarLink href={"/app/create"} variant={"active"}>
          <Plus className="w-4 h-4" /> Create
        </SidebarLink>
        <SidebarLink href={"/app"} variant={"disabled"}>
          <Bookmark className="w-4 h-4" /> Bookmarks
        </SidebarLink>
        <SidebarLink href={"#"} variant={"disabled"}>
          <StickyNoteIcon className="w-4 h-4" /> All Notes
        </SidebarLink>
      </nav>
      <Separator className="mt-3 mb-4" />
      <nav className="flex flex-col gap-1 px-3">
        <span className="mb-2 font-medium text-xs">Teams</span>
        <SidebarLink href={"#"} variant={"disabled"}>
          Team 1
        </SidebarLink>
      </nav>
    </aside>
  );
};

export default AppSidebar;
