import React from "react";
import Link from "next/link";
import { Pencil } from "lucide-react";

import { getAuthSession } from "@/lib/auth";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { redirect } from "next/navigation";

const SettingsPage = async () => {
  const session = await getAuthSession();
  const user = session?.user;

  if (!user) {
    return redirect("/auth/sign-in");
  }

  return (
    <main className="px-6">
      <h2 className="font-semibold text-2xl tracking-tighter mb-4">
        Contact Info
      </h2>

      <Card className="max-w-xl">
        <CardHeader className="pb-1">
          <div className="flex justify-between gap-4">
            <CardTitle>Account</CardTitle>
            <Link
              href="/user/settings/account"
              className={cn(buttonVariants({ size: "icon", variant: "ghost" }))}
            >
              <Pencil className="w-4 h-4" />
            </Link>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
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
        </CardContent>
      </Card>
    </main>
  );
};

export default SettingsPage;
