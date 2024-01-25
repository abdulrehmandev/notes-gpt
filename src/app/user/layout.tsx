import { FC } from "react";

import { getAuthSession } from "@/lib/auth";
import Navbar from "@/components/layout/Navbar";

interface UserLayoutProps {
  children: React.ReactNode;
}

const UserLayout: FC<UserLayoutProps> = async ({ children }) => {
  const session = await getAuthSession();

  return (
    <>
      <Navbar session={session} />
      <div className="pb-8">{children}</div>
    </>
  );
};

export default UserLayout;
