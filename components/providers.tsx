"use client";

import { Provider as JotaiProvider } from "jotai";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";

interface ProvidersProps {
  children: React.ReactNode;
  session: Session | null;
}

export default function Providers({ children, session }: ProvidersProps) {
  return (
    <JotaiProvider>
      <SessionProvider session={session}>
        <ThemeProvider attribute="class" enableSystem={false}>
          {children}
        </ThemeProvider>
      </SessionProvider>
    </JotaiProvider>
  );
}
