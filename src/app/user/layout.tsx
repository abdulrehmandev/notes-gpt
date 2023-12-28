import { FC } from "react";
import dynamic from "next/dynamic";

import { getAuthSession } from "@/lib/auth";

const PrimaryNav = dynamic(() => import("@/components/shared/PrimaryNav"), {
  ssr: false,
});

interface UserLayoutProps {
  children: React.ReactNode;
}

const UserLayout: FC<UserLayoutProps> = async ({ children }) => {
  const session = await getAuthSession();

  return (
    <>
      <PrimaryNav session={session} />
      <div className="pt-14">{children}</div>
    </>
  );
};

export default UserLayout;
