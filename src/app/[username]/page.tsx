"use client";

import { FC } from "react";
import { useSession } from "next-auth/react";
import { useMutation, useQuery } from "react-query";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader, Lock, UserRound } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/Avatar";
import Container from "@/components/layout/Container";
import { Button, buttonVariants } from "@/components/ui/Button";
import { get_user_details } from "@/services/user";
import { follow_user, get_follower, unfollow_user } from "@/services/follower";
import LoaderScreen from "@/components/shared/LoaderScreen";
import Link from "@/components/ui/Link";
import { cn } from "@/lib/utils";

interface UserProfilePageProps {
  params: {
    username: string;
  };
}

const UserProfilePage: FC<UserProfilePageProps> = ({ params }) => {
  const { username } = params;

  const { data: session } = useSession();
  const router = useRouter();

  const {
    data: user,
    isFetched: isUserFetched,
    error,
    refetch: refetchUser,
  } = useQuery("user", () => get_user_details(username), {
    retry: false,
  });

  const {
    data: follower,
    refetch: refetchFollower,
    isFetched: isFollowerFetched,
  } = useQuery("follower", () => get_follower(username), {
    retry: false,
  });

  console.log(follower);

  const { mutate: follow, isLoading: isFollowLoading } = useMutation({
    mutationFn: async () => follow_user(username),
    onSuccess: () => {
      toast.success("Followed " + (user?.username || "user") + " successfully");
    },
    onError: () => {
      toast.error("Failed to follow " + (user?.username || "user"));
    },
  });

  const { mutate: unfollow, isLoading: isUnfollowLoading } = useMutation({
    mutationFn: async () => unfollow_user(username),
    onSuccess: () => {
      toast.success(
        "Unfollowed " + (user?.username || "user") + " successfully"
      );
      refetchFollower();
      refetchUser();
    },
    onError: () => {
      toast.error("Failed to unfollow " + (user?.username || "user"));
    },
  });

  if (!isUserFetched) {
    return <LoaderScreen />;
  }

  return (
    <main className="py-6">
      {error || !user ? (
        <div className="py-4 px-6 space-y-2 text-center">
          <h1 className="font-semibold text-xl">
            Sorry, this page isn&apos;t available.
          </h1>
          <p className="text-sm max-w-md mx-auto ">
            The link you followed may be broken, or the page may have been
            removed. <Link href="/app" text="Go back to Workspace" />.
          </p>
        </div>
      ) : (
        <Container className="px-0 max-w-4xl">
          <div className="px-6 pb-4">
            <div className="grid grid-cols-6 gap-3 sm:border-b border-zinc-200 sm:pb-6">
              <Avatar
                className="col-span-2 justify-self-center self-center"
                size="2xl"
              >
                <AvatarFallback>
                  <UserRound className="w-14 h-14" />
                </AvatarFallback>
              </Avatar>
              <div className="col-span-4">
                <div className="flex flex-col sm:items-center sm:flex-row gap-3 sm:gap-6">
                  <h1 className="font-medium text-base">{user?.username}</h1>
                  {session?.user.username !== user.username ? (
                    follower?.id ? (
                      <Button
                        variant="secondary"
                        loading={isUnfollowLoading}
                        onClick={() => unfollow()}
                        disabled={!isFollowerFetched}
                        className="w-full sm:w-fit"
                      >
                        {isFollowerFetched ? (
                          follower.status === "PENDING" ? (
                            "Requested"
                          ) : (
                            "Unfollow"
                          )
                        ) : (
                          <Loader className="w-4 h-4 animate-spin" />
                        )}
                      </Button>
                    ) : (
                      <Button
                        variant="primary"
                        loading={isFollowLoading}
                        onClick={() => follow()}
                        className="w-full sm:w-fit"
                      >
                        Follow
                      </Button>
                    )
                  ) : (
                    <NextLink
                      href="/user/settings/account"
                      className={cn(buttonVariants({ variant: "secondary" }))}
                    >
                      Edit Profile
                    </NextLink>
                  )}
                </div>

                <div className="hidden mt-4 sm:flex items-center gap-8 font-semibold text-sm">
                  <p>{user.followers} followers</p>
                  <p>{user.following} following</p>
                </div>

                <div className="hidden sm:block space-y-1 mt-4">
                  <h2 className="font-semibold text-base">{user?.name}</h2>
                  {user?.bio && <p className="text-sm">{user?.bio}</p>}
                </div>
              </div>
            </div>

            <div className="block sm:hidden space-y-1 mt-4">
              <h2 className="font-semibold text-xl">{user?.name}</h2>
              {user?.bio && <p className="text-sm">{user?.bio}</p>}
            </div>
          </div>

          {/* details */}
          <div className="sm:hidden flex justify-evenly gap-3 border-y border-zinc-200 py-3 text-sm">
            <div className="text-center">
              <p className="font-semibold">{user.followers}</p>
              <h4 className="text-zinc-700">followers</h4>
            </div>
            <div className="text-center">
              <p className="font-semibold">{user.following}</p>
              <h4 className="text-zinc-700">following</h4>
            </div>
          </div>

          {/* notes */}
          <div className="flex flex-col items-center justify-center gap-3 h-full min-h-[300px]">
            {user.isPrivate ? (
              <>
                <Lock className="w-16 h-16 text-zinc-700" />
                <h3 className="text-sm text-center">
                  This Account&apos;s notes are Private.
                </h3>
              </>
            ) : (
              <h3 className="text-sm text-center">Notes comming soon.</h3>
            )}
          </div>
        </Container>
      )}
    </main>
  );
};

export default UserProfilePage;
