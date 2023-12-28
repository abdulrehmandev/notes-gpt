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
          <h1 className="tracking-tighter font-semibold text-4xl">
            Hi, {session?.user.name?.split(" ")[0]} 👋
          </h1>
        </div>
      </Container>
    </main>
  );
};

export default AppPage;
