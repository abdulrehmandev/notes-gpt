"use client";

import { useState } from "react";
import { Label } from "./ui/Label";
import { Input } from "./ui/Input";
import { Button } from "./ui/Button";
import { signIn } from "next-auth/react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

const LoginAuthForm = () => {
  const [formData, setFormData] = useState<{
    email: string;
    password: string;
  }>({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();
  const { push } = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        // callbackUrl: window.location.origin + "/dashboard",
        redirect: false,
      }).then((data) => data);

      setIsLoading(false);

      console.log(res);

      // if (!res?.error) {
      //   push("/dashboard");
      // } else {
      //   toast({
      //     title: "Please try again.",
      //     variant: "destructive",
      //     description: res?.error as string,
      //   });
      // }
    } catch (error) {
      setIsLoading(false);
      toast({
        title: "Something went wrong",
        variant: "destructive",
        description:
          "There seems to be some problem. Please try again after sometime",
      });
      console.log(error);
    }

    setFormData({ email: "", password: "" });
  };

  return (
    <form className="text-left max-w-xs mx-auto w-full" onSubmit={handleSubmit}>
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
        isLoading={isLoading}
        type="submit"
        variant="default"
        className="w-full mt-2 mb-3"
      >
        Continue with email
      </Button>
    </form>
  );
};

export default LoginAuthForm;
