import React, { FC } from "react";
import { redirect } from "next/navigation";

import Container from "@/components/layout/Container";
import { getAuthSession } from "@/lib/auth";
import SignOutForm from "@/components/auth/SignOutForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign out - NotesGPT",
  description: "Sign out of your account.",
};

interface SignOutPageProps {}

const SignOutPage: FC<SignOutPageProps> = async ({}) => {
  const session = await getAuthSession();

  if (!session?.user) {
    redirect("/auth/sign-in");
  }

  return (
    <Container>
      <div className="flex items-center justify-center w-full min-h-[60vh] text-center">
        <SignOutForm session={session} />
      </div>
    </Container>
  );
};

export default SignOutPage;
