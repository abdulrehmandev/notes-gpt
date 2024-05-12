import React from "react";
import SidebarLink from "../shared/SidebarLink";
import { Bell, BookmarkCheck, Plus, StickyNoteIcon, Users } from "lucide-react";
import Logo from "../shared/Logo";
import AppNavigationContent from "./AppNavigationContent";
import { Session } from "next-auth";

interface AppSidebarProps {
  session: Session;
}

const AppSidebar: React.FC<AppSidebarProps> = ({ session }) => {
  return (
    <aside className="bg-zinc-100/70 hidden fixed md:block h-screen w-64 py-3 px-3 overflow-hidden">
      <Logo className="mt-2 ml-3 mb-4" />
      <AppNavigationContent session={session} />
    </aside>
  );
};

export default AppSidebar;
