import React from "react";
import { redirect } from "next/navigation";

import Container from "@/components/layout/Container";
import { getAuthSession } from "@/lib/auth";
import NotificationsSection from "@/components/notifications/NotificationsSection";

interface NotificationsPageProps {}

const NotificationsPage: React.FC<NotificationsPageProps> = async ({}) => {
  const session = await getAuthSession();

  if (!session) {
    return redirect("/auth/sign-in");
  }
  return (
    <main className="py-4 w-full">
      <h1 className="tracking-tighter font-medium text-4xl mb-8 ml-4 md:ml-6">
        Notifications
      </h1>
      <Container className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="mt-4 col-span-3">
          <NotificationsSection session={session} />
        </div>
      </Container>
    </main>
  );
};

export default NotificationsPage;
