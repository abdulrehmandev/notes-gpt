import { getAuthSession } from "@/app/api/auth/[...nextauth]/route";
import { ProfileSettingsForm } from "@/components/profile-settings-form";
import { AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar } from "@radix-ui/react-avatar";
import Image from "next/image";
import { redirect } from "next/navigation";
import ReactTextareaAutosize from "react-textarea-autosize";

const ProfilePage = async () => {
  const session = await getAuthSession();

  if (!session) {
    redirect("/auth/sign-in");
  }

  return (
    <section className="px-2">
      <h1 className="font-medium text-4xl mt-4">Profile</h1>

      <ProfileSettingsForm session={session} />
    </section>
  );
};

export default ProfilePage;
