"use client";

import type { Session } from "next-auth";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { ChevronDown, Inbox, Loader } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card";
import { get_follow_requests } from "@/services/follower";
import FollowRequest from "./FollowRequest";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/Collapsible";
import { cn } from "@/lib/utils";
import { linkVariants } from "../ui/Link";

interface NotificationsSectionProps {
  session: Session;
}

const NotificationsSection: React.FC<NotificationsSectionProps> = ({
  session,
}) => {
  const [isNotifCollapsed, setIsNotifCollapsed] = useState(false);

  const {
    isFetched,
    data: followRequests,
    refetch,
  } = useQuery("followRequests", () => get_follow_requests(), {
    retry: false,
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Follow Requests</CardTitle>
      </CardHeader>
      <CardContent>
        {!isFetched ? (
          <div className="text-zinc-700 flex items-center font-medium text-sm">
            <Loader className="w-6 h-6 animate-spin mr-2" /> Loading
          </div>
        ) : followRequests.totalRequests === 0 ? (
          <div className="flex flex-col gap-2 items-center justify-center min py-2 w-full">
            <Inbox className="w-12 h-12 text-zinc-300" />
            <p className="text-sm text-zinc-700">No requests at the moment.</p>
          </div>
        ) : (
          // <div className="space-y-1">
          //   {followRequests.requests.map((req: any) => (
          //     <FollowRequest
          //       key={req.id}
          //       user={req.user}
          //       request={{ id: req.id, status: req.status }}
          //       refetch={refetch}
          //     />
          //   ))}
          // </div>
          <Collapsible>
            <FollowRequest
              key={followRequests.requests[0].id}
              user={followRequests.requests[0].user}
              request={{
                id: followRequests.requests[0].id,
                status: followRequests.requests[0].status,
              }}
              refetch={refetch}
            />
            <CollapsibleContent>
              {followRequests.requests.map((req: any) => (
                <FollowRequest
                  key={req.id}
                  user={req.user}
                  request={{ id: req.id, status: req.status }}
                  refetch={refetch}
                />
              ))}
            </CollapsibleContent>
            {followRequests.totalRequests > 2 && (
              <CollapsibleTrigger asChild>
                <button className="mx-auto text-sm bg-zinc-100 rounded-full py-0.5 px-3 flex items-center font-semibold mt-3">
                  More
                </button>
              </CollapsibleTrigger>
            )}
          </Collapsible>
        )}
      </CardContent>
    </Card>
  );
};

export default NotificationsSection;
