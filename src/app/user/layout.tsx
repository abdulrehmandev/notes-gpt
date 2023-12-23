import PrimaryNav from "@/components/shared/PrimaryNav";
import { getAuthSession } from "@/lib/auth";
import { FC } from "react";

interface UserLayoutProps {
  children: React.ReactNode;
}

const UserLayout: FC<UserLayoutProps> = async ({ children }) => {
  const session = await getAuthSession();
  // console.log(session?.user);
  return (
    <>
      <PrimaryNav session={session} />
      {children}
    </>
  );
};

export default UserLayout;
