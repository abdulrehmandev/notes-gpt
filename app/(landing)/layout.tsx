import { Navbar } from "@/components/layout/navbar";
import { getAuthSession } from "../api/auth/[...nextauth]/route";

export default async function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAuthSession();

  return (
    <main>
      <Navbar session={session} />
      {children}
    </main>
  );
}
