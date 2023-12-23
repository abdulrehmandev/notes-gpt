import AppNav from "@/components/shared/PrimaryNav";
import { getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import React, { FC } from "react";

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
      <AppNav session={session} />
      {children}
    </>
  );
};

export default AppLayout;
