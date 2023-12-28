"use client";

import { FC, useState } from "react";
import { useQuery } from "react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import ReactTextArea from "react-textarea-autosize";
import { UserRound } from "lucide-react";
import type { Session } from "next-auth";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { linkVariants } from "@/components/ui/Link";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import { UserType, userSchema } from "@/lib/zod/user";
import { get_user_details } from "@/services/user";
import LoaderScreen from "@/components/shared/LoaderScreen";
import { Input } from "@/components/ui/Input";
import { Switch } from "@/components/ui/Switch";

interface AccountSettingsFormProps {
  session: Session | null;
}

const AccountSettingsForm: FC<AccountSettingsFormProps> = ({ session }) => {
  const user = session?.user;

  const [error, setError] = useState<string | null>(null);

  // user details query
  const { data: userData, isFetched } = useQuery(
    "user",
    async () => get_user_details(user?.username as string),
    {
      retry: false,
      refetchOnMount: false,
    }
  );

  const definedUserData = userData && {
    ...userData,
    name: userData.name || "",
    phone: userData.phone || "",
    bio: userData.bio || "",
  };

  const form = useForm<UserType>({
    mode: "onBlur",
    reValidateMode: "onBlur",
    resolver: zodResolver(userSchema),
    values: userData && definedUserData,
  });

  if (!isFetched) {
    return <LoaderScreen />;
  }

  console.log(form.formState.defaultValues);

  const onSubmit = (data: UserType) => {
    console.log("Inside OnSubmit");
    console.log(data);
  };

  return (
    <Form {...form}>
      <form
        noValidate
        className="w-full bg-zinc-50 p-6 rounded-lg space-y-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex justify-between gap-4">
          <h3 className="text-xl font-semibold tracking-tighter">Profile</h3>
        </div>
        <div className="flex flex-col sm:flex-row justify-between gap-4 sm:items-end">
          <div className="flex items-center gap-6">
            <Avatar size="2xl">
              <AvatarImage src={user?.image as string} />
              <AvatarFallback>
                <UserRound className="w-12 h-12" />
              </AvatarFallback>
            </Avatar>

            <div className="space-y-2 flex flex-col items-center text-center">
              <Button size="sm" variant="outline">
                Upload Image
              </Button>
              <button
                className={cn(
                  linkVariants({ variant: "destructive", size: "xs" })
                )}
              >
                Remove Image
              </button>
            </div>
          </div>

          <FormField
            control={form.control}
            name="isPrivate"
            render={({ field }) => (
              <FormItem className="flex items-center self-end">
                <FormLabel className="mt-2 mr-2">Private Profile</FormLabel>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="jhonsmith" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="jhon@smith.com" {...field} disabled />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input
                    placeholder="999 999 9999"
                    {...field}
                    required={false}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bio</FormLabel>
                <FormControl>
                  <ReactTextArea
                    className="flex min-h-[6rem] w-full rounded-md border border-zinc-300 bg-transparent px-3 py-2 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-zinc-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-500 ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Describe yourself..."
                    {...field}
                  />
                </FormControl>
                <FormDescription>Max chracters limit is 160.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="w-fit ml-auto flex items-center gap-2">
          <Button variant="outline">Cancel</Button>
          <Button type="submit">Save</Button>
        </div>
      </form>
    </Form>
  );
};

export default AccountSettingsForm;
