import { FindSheet } from "@/components/layout/workspace/find-sheet";
import { DashboardNavBar } from "@/components/layout/workspace/navbar";
import { SearchCommand } from "@/components/layout/workspace/search-command";
import { SideBar } from "@/components/layout/workspace/sidebar/sidebar";

export default function WorkspaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="h-screen relative w-full md:pl-[240px]">
      <SideBar />
      <main>
        <DashboardNavBar />
        {children}
        <FindSheet />
        <SearchCommand />
      </main>
    </section>
  );
}
