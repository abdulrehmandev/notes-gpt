import { FC } from "react";
import NextLink from "next/link";
import { Home } from "lucide-react";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/Button";
import Link from "@/components/ui/Link";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen relative pb-10">
      {/* header */}
      <nav className="w-full py-6">
        <div className="container max-w-5xl">
          <NextLink
            href="/app"
            className={cn(
              buttonVariants({ variant: "ghost", className: "gap-2" })
            )}
          >
            Home <Home className="w-4 h-4" />
          </NextLink>
        </div>
      </nav>

      {children}

      {/* footer */}
      <footer className="absolute bottom-0 w-full pt-2 pb-3 border-t border-zinc-200">
        <nav className="flex items-center flex-wrap justify-center gap-3 md:gap-8 container max-w-5xl">
          <Link href="#" size="xs" text="Explore" />
          <Link href="#" size="xs" text="Help" />
          <Link href="#" size="xs" text="About NotesGPT" />
          <Link href="#" size="xs" text="Community" />
        </nav>
      </footer>
    </div>
  );
};

export default AuthLayout;
