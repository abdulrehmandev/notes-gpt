"use client";

import { FC } from "react";
import { useForm } from "react-hook-form";
import ReactTextArea from "react-textarea-autosize";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import type { Session } from "next-auth";

import { Card, CardHeader, CardTitle, CardContent } from "../ui/Card";
import { UserDetailsType, userDetailsSchema } from "@/lib/zod/user";
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
import { update_user_details } from "@/services/user";

interface AccountDetailsSettingsFormProps {
  session: Session;
}

const AccountDetailsSettingsForm: FC<AccountDetailsSettingsFormProps> = ({
  session,
}) => {
  const user = session.user;

  //   form initialization
  const form = useForm<UserDetailsType>({
    mode: "onBlur",
    reValidateMode: "onBlur",
    resolver: zodResolver(userDetailsSchema),
    defaultValues: {
      name: user.name || "",
      bio: user.bio || "",
      phone: user.phone || "",
    },
  });
  // form submit handler
  const onFormSubmit = async (data: UserDetailsType) => {
    if (
      data.name !== user.name ||
      data.bio !== user.bio ||
      data.phone !== user.phone
    ) {
      toast.promise(update_user_details(data), {
        loading: "Updating details...",
        success: "Details updated successfully!",
        error: "Failed to update details.",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Form {...form}>
          <form
            className="space-y-4"
            onSubmit={form.handleSubmit(onFormSubmit)}
          >
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
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="123 123 1234" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
            <Button type="submit" className="px-3 ml-auto block">
              Save Changes
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default AccountDetailsSettingsForm;
