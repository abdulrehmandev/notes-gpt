"use client";

import { Logo } from "@/components/layout/logo";
import { ProvidersForm } from "@/components/providers-form";
import { Link } from "@/components/ui/link";
import { Container } from "@/components/layout/container";
import { FC } from "react";
import { useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm, SubmitHandler } from "react-hook-form";

interface SignUpPageProps {}

const SignUpPage: FC<SignUpPageProps> = ({}) => {
  const { register, handleSubmit } = useForm<{ email: string }>();
  const searchParams = useSearchParams();

  const isEmailProvider = searchParams.has("email");

  const onSubmit: SubmitHandler<{ email: string }> = (data) => {
    console.log(data);
  };

  return (
    <main>
      <Container className="flex items-center justify-center text-center min-h-[70vh]">
        {/* body */}
        <div className="flex flex-col gap-3 items-center">
          <Logo className="mb-2" size="sm" />
          <h1 className="font-bold text-2xl">Create Your Account</h1>

          {isEmailProvider ? (
            <form
              className="flex flex-col gap-2 text-left items-center my-2"
              onSubmit={handleSubmit(onSubmit)}
            >
              <Input
                className="mt-1"
                type="email"
                required
                {...register("email", { required: true })}
                placeholder="Enter your email"
              />
              <Button type="submit" className="w-full">
                Continue with email
              </Button>
            </form>
          ) : (
            <ProvidersForm />
          )}

          <p className="opacity-60 text-xs">
            Already have an account?
            <Link href="/auth/sign-in">Sign in</Link>
          </p>
        </div>
      </Container>
    </main>
  );
};

export default SignUpPage;
