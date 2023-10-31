import { Container } from "@/components/layout/container";
import Link from "next/link";
import { Home } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen py-0">
      {/* auth custom header */}
      <header className="w-full">
        <Container className="my-10">
          {/* return to home link for auth routes */}
          <Link
            href="/"
            className={cn(
              buttonVariants({
                variant: "ghost",
                size: "default",
                className: "ml-8",
              })
            )}
          >
            <Home className="w-3 h-3" />
            <span className="ml-2">Home</span>
          </Link>
        </Container>
      </header>
      {children}
    </main>
  );
}
