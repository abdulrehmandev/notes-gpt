import Navbar from "@/components/layout/Navbar";
import { getAuthSession } from "@/lib/auth";

const HomeLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getAuthSession();

  return (
    <div>
      <Navbar session={session} />
      {children}
    </div>
  );
};

export default HomeLayout;
