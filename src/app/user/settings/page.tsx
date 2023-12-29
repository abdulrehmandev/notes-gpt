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
  } else {
    return redirect("/user/settings/account");
  }

  return null;
};

export default SettingsPage;
