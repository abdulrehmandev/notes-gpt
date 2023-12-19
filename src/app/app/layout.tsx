import { getAuthSession } from "@/lib/auth";
import React from "react";

const AppLayout = async () => {
  const session = await getAuthSession();

  if (!session?.user) {
    return <div>loading...</div>;
  }

  return <div>AppLayout</div>;
};

export default AppLayout;
