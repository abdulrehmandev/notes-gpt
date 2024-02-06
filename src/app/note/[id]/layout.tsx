import { FC } from "react";

import { getAuthSession } from "@/lib/auth";
import Navbar from "@/components/layout/Navbar";

interface ProfilePageProps {
  children: React.ReactNode;
}

const NotePage: FC<ProfilePageProps> = async ({ children }) => {
  const session = await getAuthSession();

  return (
    <>
      <Navbar type="home" session={session} />
      <div className="pb-8">{children}</div>
    </>
  );
};

export default NotePage;
