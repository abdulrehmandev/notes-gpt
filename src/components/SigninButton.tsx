"use client";

import { FC } from "react";
import { Icons } from "./Icons";
import { useToast } from "@/hooks/use-toast";
import { signIn } from "next-auth/react";

export interface SigninButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  provider: "google" | "apple" | "github";
}

const SigninButton: FC<SigninButtonProps> = ({ provider, ...props }) => {
  const { toast } = useToast();

  const handleSignin = async () => {
    try {
      await signIn(provider);
    } catch (error) {
      toast({
        title: "Something went wrong!",
        description:
          "There was an error logging in with Google. Please try again later.",
        variant: "destructive",
      });
    }
  };

  return (
    <button
      className="flex items-center justify-center gap-2 max-w-xs w-full mx-auto rounded-md text-sm font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-white text-gray-900 hover:bg-accent border border-stone-200 p-2"
      onClick={handleSignin}
      {...props}
    >
      {provider === "google" ? (
        <Icons.google className="w-6" />
      ) : provider === "github" ? (
        <Icons.github className="w-6" />
      ) : (
        <Icons.apple className="w-6" />
      )}
      <span>
        Continue with{" "}
        {provider === "google"
          ? "Google"
          : provider === "github"
          ? "Github"
          : "Apple"}
      </span>
    </button>
  );
};

export default SigninButton;
