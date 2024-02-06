import React, { FC } from "react";

import { getAuthSession } from "@/lib/auth";
import Navbar from "@/components/layout/Navbar";
import AppSidebar from "@/components/layout/AppSidebar";

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: FC<AppLayoutProps> = async ({ children }) => {
  const session = await getAuthSession();

  return (
    <main>
      <Navbar session={session} />
      <div className="flex w-full container px-0">
        <AppSidebar />
        <div className="w-full">{children}</div>
      </div>
    </main>
  );
};

export default AppLayout;
