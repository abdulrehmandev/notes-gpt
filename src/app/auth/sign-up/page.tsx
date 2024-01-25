import { FC } from "react";
import type { Metadata } from "next";

import Container from "@/components/layout/Container";
import SignUpForm from "@/components/auth/SignUpForm";
import { getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Sign Up - NotesGPT",
  description: "Sign up to your account.",
};

interface SignUpPageProps {}

const SignUpPage: FC<SignUpPageProps> = async ({}) => {
  const session = await getAuthSession();

  if (session?.user) {
    redirect("/auth/sign-out");
  }

  return (
    <Container className="min-h-[70vh] flex flex-col items-center justify-center pt-2 md:pt-6 pb-8">
      <h1 className="text-3xl font-bold tracking-tighter mb-2">Sign Up</h1>
      <SignUpForm />
    </Container>
  );
};

export default SignUpPage;
