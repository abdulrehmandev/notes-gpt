import { FC } from "react";
import dynamic from "next/dynamic";

import { getAuthSession } from "@/lib/auth";

const PrimaryNav = dynamic(() => import("@/components/shared/PrimaryNav"), {
  ssr: false,
});

interface ProfilePageProps {
  children: React.ReactNode;
}

const ProfilePage: FC<ProfilePageProps> = async ({ children }) => {
  const session = await getAuthSession();

  return (
    <>
      <PrimaryNav session={session} />
      <div className="pb-8">{children}</div>
    </>
  );
};

export default ProfilePage;
