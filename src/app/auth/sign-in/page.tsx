import { FC } from "react";
import type { Metadata } from "next";

import SignInForm from "@/components/auth/SignInForm";
import Container from "@/components/layout/Container";
import { getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Sign in - NotesGPT",
  description: "Sign in to your account.",
};

interface SignInPageProps {}

const SignInPage: FC<SignInPageProps> = async ({}) => {
  const session = await getAuthSession();

  if (session?.user) {
    redirect("/auth/sign-out");
  }

  return (
    <Container className="min-h-[80vh] flex flex-col items-center justify-center py-8">
      <h1 className="text-3xl font-bold tracking-tighter mb-4">
        Welcome Back!
      </h1>
      <SignInForm />
    </Container>
  );
};

export default SignInPage;
