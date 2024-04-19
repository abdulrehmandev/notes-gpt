"use client";

import type { Session } from "next-auth";
import React from "react";
import { Inbox } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card";

interface NotificationsSectionProps {
  session: Session;
}

const NotificationsSection: React.FC<NotificationsSectionProps> = ({
  session,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Notification</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2 items-center justify-center min py-2 w-full">
          <Inbox className="w-12 h-12 text-zinc-300" />
          <p className="text-sm text-zinc-700">
            No notifications at the moment.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default NotificationsSection;
