import HomeBanner from "@/components/app/HomeBanner";
import Container from "@/components/layout/Container";
import { getAuthSession } from "@/lib/auth";
import React from "react";

const AppPage = async () => {
  const session = await getAuthSession();

  return (
    <main className="py-4">
      <Container className="grid grid-cols-4">
        <div className="col-span-3">
          {/* <HomeBanner /> */}
          <h1 className="tracking-tighter font-semibold text-4xl mb-8">
            Hi, {session?.user.name?.split(" ")[0]} 👋
          </h1>
          <p className="text-zinc-700 text-sm max-w-md">
            Notes are comming soon. In the meantime, explore other things.
          </p>
        </div>
      </Container>
    </main>
  );
};

export default AppPage;
