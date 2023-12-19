"use client";

import { Session } from "next-auth";
import { Input } from "./ui/input";
import { FC } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Switch } from "./ui/switch";
import { SubmitHandler, useForm } from "react-hook-form";
import { UserData, UserProfileValidator } from "@/lib/validators/user";
import { zodResolver } from "@hookform/resolvers/zod";

interface ProfileSettingsFormProps {
  session: Session | null;
}

export const ProfileSettingsForm: FC<ProfileSettingsFormProps> = ({
  session,
}) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<UserData>({
    resolver: zodResolver(UserProfileValidator),
    defaultValues: {
      fullName: session?.user?.name,
      username: session?.user?.username,
      // bio: session?.user?.bio,
      email: session?.user?.email,
    },
  });

  const onSubmit: SubmitHandler<UserData> = (data) => {
    console.log(data);
  };

  return (
    <form className="mt-10 max-w-2xl" onSubmit={handleSubmit(onSubmit)}>
      {/* <Avatar>
          <AvatarImage src={session.user?.image} />
        </Avatar> */}
      <div className="flex justify-between items-end">
        <div className="flex items-center gap-10">
          <img
            className="w-32 aspect-square rounded-full"
            src={session.user?.image}
            alt="Profile Picture"
          />
          <div className="flex flex-col gap-2">
            <Button size="sm">Change Image</Button>
            <Button variant="outline" size="sm">
              Remove Image
            </Button>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <label
            htmlFor="isPublic"
            {...register("isPublic")}
            className="text-sm font-medium"
          >
            Public Profile
          </label>
          <Switch name="isPublic" {...register("isPublic")} />
        </div>
      </div>

      <div className="mt-6 w-full flex flex-col gap-2">
        <div className="flex gap-4">
          <div className=" w-full">
            <label htmlFor="fullName" className="font-medium text-xs">
              Full Name
            </label>
            <Input
              className="mt-2"
              {...register("fullName")}
              name="fullName"
              placeholder="Full Name"
            />
          </div>
          <div className="w-full">
            <label htmlFor="username" className="font-medium text-xs">
              Username
            </label>
            <Input
              className="mt-2"
              {...register("username")}
              name="username"
              placeholder="Username"
            />
          </div>
        </div>

        <div className="w-full">
          <label htmlFor="bio" className="font-medium text-xs">
            Bio
          </label>
          {/* <TextareaAutosize
            placeholder="Bio"
            className="mt-2 w-full resize-none appearance-none overflow-hidden focus:outline-none"
          /> */}
          <Textarea {...register("bio")} placeholder="Bio" />
        </div>
      </div>

      <div className="flex gap-2 justify-end mt-8">
        <Button variant="secondary">Cancel</Button>
        <Button variant="primary" type="submit">
          Save
        </Button>
      </div>
    </form>
  );
};
