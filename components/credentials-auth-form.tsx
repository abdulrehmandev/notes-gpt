import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { SkipBack } from "lucide-react";
import { Link } from "./ui/link";

export type Credentials = {
  email: string;
  password: string;
};

interface CredentialsAuthFormProps {}

export const CredentialsAuthForm: React.FC<CredentialsAuthFormProps> = ({}) => {
  const { register, handleSubmit } = useForm<Credentials>();

  const onSubmit: SubmitHandler<Credentials> = (data) => {
    console.log(data);
  };

  return (
    <form
      className="text-left flex items-center flex-col gap-2 mt-2"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div>
        <label htmlFor="email" className="text-xs">
          Email
        </label>
        <Input
          className="mt-1"
          type="email"
          required
          {...register("email", { required: true })}
          placeholder="Enter your email"
        />
      </div>
      <div>
        <label htmlFor="password" className="text-xs">
          Password
        </label>
        <Input
          className="mt-1"
          type="password"
          required
          {...register("password", { required: true, min: 6 })}
          placeholder="Enter your password"
        />
      </div>

      <Link
        href="/forgot-password"
        className="text-2xs text-muted-foreground -my-1"
      >
        Forgot Passwrod?
      </Link>

      <Button disabled type="submit" className="w-full">
        Sign In
      </Button>
    </form>
  );
};
