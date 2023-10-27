import { getAuthSession } from "@/lib/auth";
import { FC } from "react";

interface DashboardProps {}
const DashboardPage: FC<DashboardProps> = async ({}) => {
  const session = await getAuthSession();

  if (!session) {
    window.location.href = window.location.origin + "/login";
  }
  return (
    <main className="pl-[250px] w-full">
      <div className="">hellow</div>
    </main>
  );
};

export default DashboardPage;
