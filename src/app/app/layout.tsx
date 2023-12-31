import React, { FC } from "react";
import { redirect } from "next/navigation";

import { getAuthSession } from "@/lib/auth";
import dynamic from "next/dynamic";

const PrimaryNav = dynamic(() => import("@/components/shared/PrimaryNav"), {
  ssr: false,
});

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: FC<AppLayoutProps> = async ({ children }) => {
  const session = await getAuthSession();

  if (!session?.user) {
    redirect("/auth/sign-in");
  }

  return (
    <>
      <PrimaryNav session={session} />
      <div>{children}</div>
    </>
  );
};

export default AppLayout;
