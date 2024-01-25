import React from "react";

import { getAuthSession } from "@/lib/auth";
import Container from "@/components/layout/Container";
import CreateNoteWidget from "@/components/app/CreateNoteWidget";

const AppPage = async () => {
  const session = await getAuthSession();

  return (
    <main className="py-4">
      <Container removeStyles>
        <div>
          <h1 className="tracking-tighter font-medium text-4xl mb-8">
            Hi, {session?.user.name?.split(" ")[0]} 👋
          </h1>
        </div>
        {/* <div className="col-span-2">
          <CreateNoteWidget />
        </div> */}
      </Container>
    </main>
  );
};

export default AppPage;
