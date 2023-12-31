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
    <main className="py-6">
      <Container className="max-w-4xl">
        <h2 className="font-semibold text-xl tracking-tighter">
          Notifications
        </h2>
        <div className="space-y-4 mt-4">
          <NotificationsSection session={session} />
        </div>
      </Container>
    </main>
  );
};

export default NotificationsPage;
