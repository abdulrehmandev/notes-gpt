"use client";

import { FC } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { SessionProvider } from "next-auth/react";

const queryClient = new QueryClient();

interface ProvidersProps {
  children: React.ReactNode;
}

const Providers: FC<ProvidersProps> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>{children}</SessionProvider>
    </QueryClientProvider>
  );
};

export default Providers;
