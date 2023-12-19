"use client";

import { UserSideBar } from "@/components/layout/settings/sidebar";
import { Button } from "@/components/ui/button";
import { userSideBarAtom } from "@/lib/atoms";
import { useAtom } from "jotai";
import { Sidebar } from "lucide-react";

const UserLayout = ({ children }: { children: React.ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useAtom(userSideBarAtom);

  return (
    <main className="relative md:pl-[280px]">
      {/* <UserSideBar /> */}
      <div>
        <Button
          variant="outline"
          size="sm"
          className={`absolute top-6 left-6 ${
            sidebarOpen ? "hidden" : "flex md:hidden"
          }`}
          onClick={() => setSidebarOpen(true)}
        >
          <Sidebar size={16} />
        </Button>
        <div className="pt-8 md:pt-4 pb-4 px-4">{children}</div>
      </div>
    </main>
  );
};

export default UserLayout;
