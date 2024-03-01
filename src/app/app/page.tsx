import React from "react";

import { getAuthSession } from "@/lib/auth";
import Container from "@/components/layout/Container";
import RecentlyCreatedNotes from "@/components/app/RecentlyCreatedNotes";
import RecentBookmarkNotes from "@/components/app/RecentBookmarkNotes";

const AppPage = async () => {
  const session = await getAuthSession();

  return (
    <main className="py-4">
      <Container>
        <div>
          <h1 className="tracking-tighter font-medium text-4xl mb-8">
            Hi, {session?.user.name?.split(" ")[0]} 👋
          </h1>
        </div>
        <RecentlyCreatedNotes />
        {/* <RecentBookmarkNotes /> */}
      </Container>
    </main>
  );
};

export default AppPage;
