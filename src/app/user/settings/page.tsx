import React from "react";
import Link from "next/link";
import { Pencil } from "lucide-react";

import { getAuthSession } from "@/lib/auth";

const SettingsPage = async () => {
  const session = await getAuthSession();
  const user = session?.user;

  return (
    <main>
      <h2 className="font-semibold text-2xl tracking-tighter mb-4">
        Contact Info
      </h2>
      <div className="w-full bg-zinc-50 p-6 rounded-lg space-y-5">
        <div className="flex justify-between gap-4">
          <h3 className="text-xl font-semibold tracking-tighter">Account</h3>
          <Link
            href="/user/settings/account"
            className="p-2 rounded-full border border-zinc-200 hover:bg-zinc-100"
          >
            <Pencil className="w-4 h-4" />
          </Link>
        </div>

        <div>
          <h5 className="font-medium">User ID</h5>
          <p className="text-zinc-700">{user?.id}</p>
        </div>

        <div>
          <h5 className="font-medium">Name</h5>
          <p className="text-zinc-700">{user?.name}</p>
        </div>

        <div>
          <h5 className="font-medium">Email Address</h5>
          <p className="text-zinc-700">{user?.email}</p>
        </div>
      </div>
    </main>
  );
};

export default SettingsPage;
