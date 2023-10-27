import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { FC } from "react";

interface DashboardProps {
    params: { id: string },
}

const page: FC<DashboardProps> = ({ params }) => {
    const { data } = useSession();
    const { id } = params;

//   if (!session) {
//     redirect("/login");
//   }

  return <div className="text-red-500">{session.user.id}</div>;
};

export default page;
