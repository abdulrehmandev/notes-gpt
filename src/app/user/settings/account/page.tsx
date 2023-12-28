import React from "react";
import { redirect } from "next/navigation";

import { getAuthSession } from "@/lib/auth";
import ProfileSettingsForm from "@/components/settings/ProfileSettingsForm";
import AccountDetailsSettingsForm from "@/components/settings/AccountDetailsSettingsForm";

const AccountSettingsPage = async () => {
  const session = await getAuthSession();

  if (!session?.user) {
    return redirect("/auth/sign-in");
  }

  return (
    <main className="max-w-xl pb-4 px-6">
      <h2 className="font-semibold text-xl tracking-tighter mb-4">
        Account Settings
      </h2>
      <div className="space-y-4">
        <ProfileSettingsForm session={session} />
        <AccountDetailsSettingsForm session={session} />
      </div>
    </main>
  );
};

export default AccountSettingsPage;
