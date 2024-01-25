"use client";

import { FC } from "react";
import { useSession } from "next-auth/react";
import { useQuery } from "react-query";
import { Loader, UserRound } from "lucide-react";
import { AvatarImage } from "@radix-ui/react-avatar";
import NextLink from "next/link";

import { Avatar, AvatarFallback } from "@/components/ui/Avatar";
import Container from "@/components/layout/Container";
import { get_user_details } from "@/services/user";
import LoaderScreen from "@/components/shared/LoaderScreen";
import Link from "@/components/ui/Link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/Button";
import { get_public_notes_by_user_id } from "@/services/note";
import NoteProfileCard from "@/components/note/NoteProfileCard";

interface UserProfilePageProps {
  params: {
    username: string;
  };
}

const UserProfilePage: FC<UserProfilePageProps> = ({ params }) => {
  const { username } = params;

  const { data: session } = useSession();

  const {
    data: user,
    isFetched: isUserFetched,
    error,
  } = useQuery("user", () => get_user_details(username), {
    retry: false,
  });

  const notesQuery = useQuery(
    "user-notes",
    () => get_public_notes_by_user_id(user?.id as string),
    {
      enabled: (user?.publicNotes as number) > 0,
    }
  );

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
          <div className="px-4 md:px-6">
            <div className="grid grid-cols-6 gap-3 sm:border-b border-zinc-200 sm:pb-6">
              <Avatar
                className="col-span-2 justify-self-center self-center"
                size="2xl"
              >
                <AvatarImage src={user.image as string} />
                <AvatarFallback>
                  <UserRound className="w-14 h-14" />
                </AvatarFallback>
              </Avatar>
              <div className="col-span-4">
                <div className="flex flex-col sm:items-center sm:flex-row gap-3 sm:gap-6">
                  <h1 className="font-medium text-base">{user?.username}</h1>
                  {user?.username === session?.user.username && (
                    <NextLink
                      href="/user/settings/account"
                      className={cn(
                        buttonVariants({ size: "sm", variant: "secondary" })
                      )}
                    >
                      Edit Profile
                    </NextLink>
                  )}
                </div>

                <div className="hidden mt-4 sm:flex items-center gap-8 font-semibold text-sm">
                  <p>
                    {user.publicNotes} public note
                    {user.publicNotes !== 1 && "s"}
                  </p>
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
          <div className="sm:hidden mt-4 flex justify-evenly gap-3 border-y border-zinc-200 py-3 text-sm">
            <div className="text-center">
              <p className="font-semibold">{user.publicNotes}</p>
              <h4 className="text-zinc-700">
                public note{user.publicNotes !== 1 && "s"}
              </h4>
            </div>
          </div>

          {/* notes */}
          {user.publicNotes > 0 ? (
            notesQuery.isLoading ? (
              <div className="flex mt-4 flex-col items-center justify-center gap-3 h-full min-h-[300px]">
                <Loader className="w-5 h-5 animate-spin" />
              </div>
            ) : (
              <div className="px-4 md:px-6 mt-4">
                {notesQuery.data?.map((note) => (
                  <NoteProfileCard note={note} key={note.id} />
                ))}
              </div>
            )
          ) : (
            <div className="flex mt-4 flex-col items-center justify-center gap-3 h-full min-h-[300px]">
              <p className="w-fit mx-auto">{user.name} has no public notes.</p>
            </div>
          )}
        </Container>
      )}
    </main>
  );
};

export default UserProfilePage;
