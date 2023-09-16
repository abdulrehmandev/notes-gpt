"use client";

import SigninButton from "@/components/SigninButton";
import { Button, buttonVariants } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Home } from "lucide-react";
import Link from "next/link";
import { FC, useState } from "react";

interface LoginProps {}

const Login: FC<LoginProps> = () => {
  const [formData, setFormData] = useState<{
    email: string;
    password: string;
  }>({ email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <main>
      <div className="container mx-auto py-8 h-screen">
        {/* Back home link */}
        <Link href="/" className={buttonVariants({ variant: "ghost" })}>
          <Home size={13} />
          <span className="ml-2">Home</span>
        </Link>

        <div className="w-full h-full flex items-center justify-center mt-2">
          <div className="w-fit mx-auto text-center">
            <h1 className="font-semibold text-3xl mb-4">Hey, Welcome Back</h1>
            <p className="max-w-xs mx-auto text-xs">
              By continuing, you are setting up a NotesGPT account and agree to
              our User Agreement and Privacy Policy.
            </p>

            {/* providers signin buttons */}
            <div className="flex flex-col gap-3 mt-6">
              <SigninButton provider="google" />
              <SigninButton provider="apple" />
            </div>

            {/* or divider */}
            <span className="mt-8 mb-6 w-full flex items-center text-sm text-stone-400 before:h-0.5 before:w-full before:bg-stone-200 after:h-0.5 after:w-full after:bg-stone-200">
              <span className="w-full -mx-6">or with</span>
            </span>

            {/* email login form */}
            <form className="text-left" onSubmit={handleSubmit}>
              <Label htmlFor="email">Email</Label>
              <Input
                required
                type="email"
                className="mt-1 mb-2"
                placeholder="Enter your email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              <Label htmlFor="password">Password</Label>
              <Input
                className="mt-1 mb-2"
                placeholder="Enter your password"
                type="password"
                required
                minLength={8}
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
              <Button
                type="submit"
                variant="default"
                className="w-full mt-2 mb-3"
              >
                Continue with email
              </Button>
            </form>

            {/* other links */}
            <Link
              href="/forget-password"
              className={buttonVariants({
                variant: "secondaryLink",
                size: "sm",
                // className: "text-stone-500",
              })}
            >
              Forgot password?
            </Link>
            <p className="text-xs text-center text-stone-600 mt-2">
              Don{"’"}t have a account?{" "}
              <Link
                href="/forget-password"
                className={buttonVariants({
                  variant: "link",
                  size: "sm",
                  className: "px-0",
                })}
              >
                Signup
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
