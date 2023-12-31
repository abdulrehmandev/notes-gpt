"use client";

import React from "react";
import Link from "next/link";
import { useMutation } from "react-query";
import { toast } from "sonner";
import { UserRound } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { FollowerType } from "@/lib/zod/follower";
import { UserType } from "@/lib/zod/user";
import {
  delete_follow_request,
  update_follow_request,
} from "@/services/follower";

interface FollowRequestProps {
  user: Pick<UserType, "id" | "username" | "name" | "image">;
  request: Pick<FollowerType, "id" | "status">;
  refetch: () => void;
}

const FollowRequest: React.FC<FollowRequestProps> = ({
  user,
  request,
  refetch,
}) => {
  const { mutate: updateRequest } = useMutation({
    mutationKey: "acceptRequest",
    mutationFn: async (req: typeof request) => update_follow_request(req),
    onSuccess: () => {
      toast.success("Follow request accepted!");
      refetch();
    },
    onError: () => {
      toast.error("Something went wrong!");
    },
  });

  const { mutate: deleteRequest } = useMutation({
    mutationKey: "deleteRequest",
    mutationFn: async () => delete_follow_request(request.id),
    onSuccess: () => {
      toast.success(
        "Removed " + (user.username || "request") + " successfully"
      );
      refetch();
    },
    onError: () => {
      toast.error("Failed to remove " + (user.username || "request"));
    },
  });

  return (
    <div className="flex items-center gap-3 py-2 border-b border-zinc-100 rounded-md">
      <Avatar>
        <AvatarImage src={user.image} />
        <AvatarFallback>
          <UserRound />
        </AvatarFallback>
      </Avatar>
      <Link href={`/${user.username}`} className="w-full">
        <p className="font-medium">{user.name}</p>
        <p className="text-sm text-muted-foreground">{user.username}</p>
      </Link>
      <div className="flex items-center gap-2">
        <Button
          size="sm"
          variant="primary"
          onClick={() => updateRequest({ ...request, status: "ACCEPTED" })}
        >
          Accept Request
        </Button>
        <Button size="sm" variant="secondary" onClick={() => deleteRequest()}>
          Remove
        </Button>
      </div>
    </div>
  );
};

export default FollowRequest;
