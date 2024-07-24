import React, { FC } from "react";
import { getAuthSession } from "@/lib/auth";
import AppSidebar from "@/components/layout/AppSidebar";
import AppNavbar from "@/components/layout/AppNavbar";
import { redirect } from "next/navigation";

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: FC<AppLayoutProps> = async ({ children }) => {
  const session = await getAuthSession();

  if (process.env.DEV_ENV !== "development") {
    return redirect("/access-denied");
  }

  if (!session?.user) {
    return redirect("/auth/sign-in");
  }

  return (
    <main>
      <div className="flex w-full px-0">
        <AppSidebar session={session} />
        <div className="w-full md:pl-64">
          <AppNavbar session={session} />
          <div className="flex overflow-auto w-full">{children}</div>
        </div>
      </div>
    </main>
  );
};

export default AppLayout;
