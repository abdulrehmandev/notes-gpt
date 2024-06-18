"use client";

import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, Info } from "lucide-react";
import { useMutation } from "react-query";
import axios, { AxiosError } from "axios";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/Form";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import Link from "../ui/Link";
import { Alert, AlertDescription, AlertTitle } from "../ui/Alert";
import { signUpSchema, SignUpType } from "@/lib/definitions/auth";

interface SignUpFormProps {}

const SignUpForm: FC<SignUpFormProps> = ({}) => {
  const form = useForm<SignUpType>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [error, setError] = useState<string | undefined>();

  const { mutate: signUp, isLoading } = useMutation({
    mutationFn: async (payload: SignUpType) => {
      const { data } = await axios.post("/api/auth/sign-up", payload);

      return data;
    },
    onSuccess: () => {
      window.location.replace("/auth/sign-in");
    },
    onError: (error: AxiosError) => {
      setError(error.response?.data as string);
    },
  });

  const onSubmit = (data: SignUpType) => {
    if (data.password !== data.confPassword) {
      setError("Passwords do not match!");
      return;
    }

    // signUp(data);
    return;
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-3 py-4 max-w-xs w-full"
        onChange={() => setError("")}
      >
        <Alert>
          <Info className="w-4 h-4" />
          <AlertTitle>Sign up is not avaialbe at the moment.</AlertTitle>
          <AlertDescription>
            We are currently in a closed beta. Sign up will be available soon.
          </AlertDescription>
        </Alert>
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="w-4 h-4" />
            <AlertTitle>{error}</AlertTitle>
          </Alert>
        )}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="Jhon Smith" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
              <FormDescription>Minimum length is 6 characters.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input placeholder="••••••••" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          // disabled={!!error}
          disabled
          loading={isLoading}
          type="submit"
          className="block w-full"
        >
          Sign up
        </Button>

        <p className="text-xs">
          By clicking Register you accept the NotesGPT{" "}
          <Link
            href="#"
            text="Terms of Use and acknowledge the Privacy
          Statement and Cookie Policy"
          />
          .
        </p>

        <p className="text-xs text-center">
          Already have an account? <Link href="/auth/sign-in" text="Sign in" />
        </p>
      </form>
    </Form>
  );
};

export default SignUpForm;
