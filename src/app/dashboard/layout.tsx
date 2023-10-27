import { buttonVariants } from "@/components/ui/Button";
import { SearchIcon, Settings, Trash } from "lucide-react";
import Link from "next/link";
import React from "react";

interface DashboardLayoutProps {
  children: React.ReactNode;
}
const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <main className="w-full relative h-screen">
      <aside className="absolute top-0 left-0 bottom-0 w-full max-w-[250px] bg-gray-50 border-r border-r-gray-300 py-6 px-2">
        <div className="w-full flex flex-col gap-1">
          <Link
            href="/find"
            className="flex items-center gap-3 w-full rounded-md hover:bg-gray-100 py-1 px-4 font-medium text-base text-zinc-500"
          >
            <SearchIcon className="w-4 h-4" />
            <span>Find</span>
          </Link>
          <Link
            href="/find"
            className="flex items-center gap-3 w-full rounded-md hover:bg-gray-100 py-1 px-4 font-medium text-base text-zinc-500"
          >
            <Settings className="w-4 h-4" />
            <span>Settings</span>
          </Link>
          <Link
            href="/find"
            className="flex items-center gap-3 w-full rounded-md hover:bg-gray-100 py-1 px-4 font-medium text-base text-zinc-500"
          >
            <Trash className="w-4 h-4" />
            <span>Trash</span>
          </Link>
        </div>

        <div className="w-full flex flex-col gap-1 mt-8">
          <p className="uppercase text-xs font-medium tracking-wider text-zinc-500 ml-3 mb-2">
            Workspaces
          </p>
          <Link
            href="/find"
            className="flex items-center gap-4 w-full rounded-md hover:bg-gray-100 py-1 px-4 font-medium text-base text-zinc-500"
          >
            Creatives
          </Link>
          <Link
            href="/find"
            className="flex items-center gap-4 w-full rounded-md hover:bg-gray-100 py-1 px-4 font-medium text-base text-zinc-500"
          >
            Platform Launch
          </Link>
        </div>
      </aside>
      {children}
    </main>
  );
};

export default DashboardLayout;
