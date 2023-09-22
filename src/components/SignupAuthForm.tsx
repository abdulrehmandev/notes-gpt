"use client";

import { useState } from "react";
import { Label } from "./ui/Label";
import { Input } from "./ui/Input";
import { Button } from "./ui/Button";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "react-query";
import { CredentialsPayload } from "@/lib/validators/credentials";
import axios, { AxiosError } from "axios";
import { redirect } from "next/navigation";

const SignupAuthForm = () => {
  const [formData, setFormData] = useState<{
    email: string;
    password: string;
    confPassword: string;
  }>({ email: "", password: "", confPassword: "" });
  const { toast } = useToast();

  // signup query
  const { mutate: register, isLoading } = useMutation({
    mutationFn: async () => {
      const payload: CredentialsPayload = formData;

      const { data } = await axios.post("/api/register", payload);
      return data as string;
    },
    onError: (err: AxiosError) => {
      toast({
        title: "Error",
        description: err.response?.data as string,
        variant: "destructive",
      });
    },
    onSuccess: () => {
      redirect("/login");
    },
  });

  // event handlers
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.password !== formData.confPassword) {
      return toast({
        title: "Passwords do not match",
        variant: "destructive",
        description: "Please make sure both the passwords match",
      });
    }

    try {
      await register();
    } catch (error) {
      toast({
        title: "Something went wrong",
        variant: "destructive",
        description:
          "There seems to be some problem. Please try again after sometime",
      });
    }

    setFormData({ email: "", password: "", confPassword: "" });
  };

  return (
    <form className="text-left max-w-xs mx-auto" onSubmit={handleSubmit}>
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
      <Label htmlFor="confPassword">Confirm Password</Label>
      <Input
        className="mt-1 mb-2"
        placeholder="Enter your password again"
        type="password"
        required
        minLength={8}
        name="confPassword"
        value={formData.confPassword}
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

export default SignupAuthForm;
