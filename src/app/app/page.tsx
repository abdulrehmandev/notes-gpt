import HomeBanner from "@/components/app/HomeBanner";
import Container from "@/components/layout/Container";
import React from "react";

const AppPage = () => {
  return (
    <main className="py-4">
      <Container className="grid grid-cols-4">
        <div className="col-span-3">
          <HomeBanner />
        </div>
      </Container>
    </main>
  );
};

export default AppPage;
