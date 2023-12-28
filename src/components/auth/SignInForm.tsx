"use client";

import { FC, useState } from "react";
import { SignInResponse, signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle } from "lucide-react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/Form";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { Checkbox } from "../ui/Checkbox";
import { Label } from "../ui/Label";
import Link from "../ui/Link";
import { Alert, AlertTitle } from "../ui/Alert";
import { signInSchema, SignInType } from "@/lib/zod/auth";

interface SignInFormProps {}

const SignInForm: FC<SignInFormProps> = ({}) => {
  const form = useForm<SignInType>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [error, setError] = useState<string | undefined>();
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = (data: SignInType) => {
    setLoading(true);
    signIn("credentials", {
      ...data,
      redirect: false,
    }).then((res: SignInResponse | undefined) => {
      if (res?.ok) {
        window.location.replace("/app");
      }
      if (res?.error) {
        setError(res.error);
        setLoading(false);
      }
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-3 py-4 max-w-xs w-full"
        onChange={() => setError("")}
      >
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="w-4 h-4" />
            <AlertTitle>Credentials do not match!</AlertTitle>
          </Alert>
        )}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="jhon@smith.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="••••••••" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Link
          href="#"
          className="block text-xs ml-auto"
          text="Forgot your password?"
        />

        <div className="flex items-center space-x-2">
          <Checkbox id="rememberMe" />
          <Label htmlFor="rememberMe">Remember me</Label>
        </div>

        <Button
          disabled={!!error}
          loading={loading}
          type="submit"
          className="block w-full"
        >
          Sign In
        </Button>

        <p className="text-xs">
          By signing in you accept the{" "}
          <Link
            href="#"
            text="Terms of Use and acknowledge the Privacy
          Statement and Cookie Policy"
          />
          .
        </p>

        <p className="text-xs text-center">
          Don&apos;t have an account yet?{" "}
          <Link href="/auth/sign-up" text="Register now" />
        </p>
      </form>
    </Form>
  );
};

export default SignInForm;
