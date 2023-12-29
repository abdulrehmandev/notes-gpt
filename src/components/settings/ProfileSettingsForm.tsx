"use client";

import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { UserRound } from "lucide-react";
import type { Session } from "next-auth";

import { cn } from "@/lib/utils";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/Avatar";
import { Switch } from "@/components/ui/Switch";
import { Button } from "../ui/Button";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
  FormDescription,
} from "../ui/Form";
import { linkVariants } from "../ui/Link";
import { Label } from "../ui/Label";
import { update_user_privacy, update_user_username } from "@/services/user";
import { UsernameType, usernameSchema } from "@/lib/zod/user";
import { Input } from "../ui/Input";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card";
import { Separator } from "../ui/Separator";

interface ProfileSettingsFormProps {
  session: Session;
}

const ProfileSettingsForm: FC<ProfileSettingsFormProps> = ({ session }) => {
  const user = session.user;
  const [isPrivate, setIsPrivate] = useState<boolean>(user?.isPrivate || false);

  // separate form for username as it is changed separately from other details
  const usernameForm = useForm<UsernameType>({
    mode: "onBlur",
    reValidateMode: "onBlur",
    resolver: zodResolver(usernameSchema),
    values: {
      username: user?.username || "",
    },
  });
  // form submit handler
  const onUsernameFormSubmit = async (data: UsernameType) => {
    if (data.username !== user.username) {
      toast.promise(update_user_username(data.username), {
        loading: "Updating username...",
        success: "Username updated successfully!",
        error: "Failed to update username.",
      });
    }
  };

  // on privacy change update the privacy settings
  useEffect(() => {
    if (isPrivate !== user.isPrivate) {
      toast.promise(update_user_privacy(isPrivate), {
        loading: "Updating privacy settings...",
        success: async (data) => {
          return "Privacy settings updated!";
        },
        error: "Something went wrong!",
      });
    }
  }, [isPrivate]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* avatar */}
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
        </div>

        {/* privacy switch */}
        <div className="flex justify-between">
          <div>
            <Label>Private Profile</Label>
            <p className="text-[0.8rem] text-zinc-700">
              Switch to private mode to keep your shared notes confidential.
            </p>
          </div>
          <Switch
            className="mt-1"
            checked={isPrivate}
            onCheckedChange={(val) => setIsPrivate(val)}
          />
        </div>

        <Separator />

        {/* username form */}
        <Form {...usernameForm}>
          <form
            onSubmit={usernameForm.handleSubmit(onUsernameFormSubmit)}
            className="max-w-xl"
          >
            <div>
              <FormField
                control={usernameForm.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="jhonsmith" {...field} />
                    </FormControl>
                    <FormMessage />
                    <FormDescription className="space-y-1.5">
                      <span>
                        Your username is your unique identifier on the platform
                        and is used for your profile URL.
                      </span>
                      <span>
                        Username length must be between 3 and 32 characters.
                      </span>
                    </FormDescription>
                  </FormItem>
                )}
              />
              <Button type="submit" className="px-3 mt-6">
                Save Username
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ProfileSettingsForm;
