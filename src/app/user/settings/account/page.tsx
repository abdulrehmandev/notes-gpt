import React from "react";
import { redirect } from "next/navigation";

import { getAuthSession } from "@/lib/auth";
import ProfileSettingsForm from "@/components/settings/ProfileSettingsForm";
import AccountDetailsSettingsForm from "@/components/settings/AccountDetailsSettingsForm";
import GeneralProfileDetails from "@/components/settings/GeneralProfileDetails";
import DeleteAccount from "@/components/settings/DeleteAccount";

const AccountSettingsPage = async () => {
  const session = await getAuthSession();

  if (!session?.user) {
    return redirect("/auth/sign-in");
  }

  return (
    <main className="pb-4 md:px-6 max-w-4xl mx-auto">
      <h2 className="font-semibold text-xl tracking-tighter mb-4">
        Account Settings
      </h2>
      <div className="space-y-4">
        <GeneralProfileDetails session={session} />
        <ProfileSettingsForm session={session} />
        <AccountDetailsSettingsForm session={session} />
        <DeleteAccount session={session} />
      </div>
    </main>
  );
};

export default AccountSettingsPage;
