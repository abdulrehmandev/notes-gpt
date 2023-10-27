"use client";

import { Mail } from "lucide-react";
import { signIn } from "next-auth/react";
import React, { FC, useState } from "react";

import { Icons } from "@/components/icons";
import { Button, buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ProvidersFormProps {}

export const ProvidersForm: FC<ProvidersFormProps> = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  // Continue with google handler
  const handleSignInWithProvider = async (
    provider: "google" | "github" | "apple"
  ) => {
    setIsLoading(true);

    try {
      await signIn(provider);
    } catch (error) {
      console.log(error);
      // error notifier
      toast({
        title: "Something went wrong!",
        description: `There was an error logging in with ${provider}. Please try again later.`,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto py-2 px-4 max-w-sm flex flex-col items-center gap-2 text-foreground">
      <Button
        variant="outline"
        className="w-full font-normal px-5"
        disabled
        onClick={() => handleSignInWithProvider("google")}
      >
        <span>Continue with Google</span>
        <Icons.google className="ml-1 w-4 h-4" />
      </Button>
      <Button
        disabled
        variant="outline"
        className="w-full font-normal px-5"
        onClick={() => handleSignInWithProvider("apple")}
      >
        <span>Continue with Apple</span>
        <Icons.apple className="ml-1 w-4 h-4" />
      </Button>
      <Button
        variant="outline"
        className="w-full font-normal px-5"
        disabled={isLoading}
        onClick={() => handleSignInWithProvider("github")}
      >
        <span>Continue with Github</span>
        <Icons.github className="ml-1 w-4 h-4" />
      </Button>

      <Separator className="w-[80%] my-1 px-2" />

      <Link
        className={cn(
          buttonVariants({
            variant: "outline",
            className: "w-full font-normal hover:border-primary",
          })
        )}
        href={{
          query: "email",
        }}
      >
        <span>Continue with Email</span>
        <Mail className="ml-1" size="14" />
      </Link>
    </div>
  );
};
