"use client";

import { CredentialsAuthForm } from "@/components/credentials-auth-form";
import { Container } from "@/components/layout/container";
import { Logo } from "@/components/layout/logo";
import { ProvidersForm } from "@/components/providers-form";
import { Link } from "@/components/ui/link";
import { useSearchParams } from "next/navigation";
import { FC } from "react";

interface SignInPageProps {}

const SignInPage: FC<SignInPageProps> = ({}) => {
  const searchParams = useSearchParams();

  const isEmailProvider = searchParams.has("email");

  return (
    <main>
      <Container className="flex items-center justify-center text-center min-h-[70vh]">
        {/* body */}
        <div className="flex flex-col gap-3 items-center">
          <Logo className="mb-2" size="sm" />
          <h1 className="font-bold text-2xl">Welcome Back!</h1>

          {isEmailProvider ? <CredentialsAuthForm /> : <ProvidersForm />}

          <p className="opacity-60 text-xs">
            Don't have an account?
            <Link href="/auth/sign-up">Sign up</Link>
          </p>
        </div>
      </Container>
    </main>
  );
};

export default SignInPage;
