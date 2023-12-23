import AppNavLink from "@/components/shared/PrimaryNavLink";
import { getAuthSession } from "@/lib/auth";
import Link from "next/link";

export default async function Home() {
  const session = await getAuthSession();

  return (
    <main className="container mx-auto mt-20 space-y-4">
      <h1 className="font-bold text-2xl text-center">Hello World!</h1>
      {session?.user && (
        <p className="text-md text-center">
          Signed in with{" "}
          <span className="font-medium">{session.user.email}</span>
        </p>
      )}
      <div className="p-1 rounded-full bg-zinc-50 flex items-center justify-center mx-auto w-fit gap-1">
        {session?.user ? (
          <div className="flex items-center gap-3">
            <AppNavLink href="/app" text="Workspace" />
            <AppNavLink href="/user/abdulrehman" text="User Profile" />
            <AppNavLink href="/auth/sign-out" text="Sign out" />
          </div>
        ) : (
          <Link
            href="/auth/sign-in"
            className="hover:bg-zinc-100 rounded-sm px-3 py-1"
          >
            Sign in
          </Link>
        )}
      </div>
    </main>
  );
}
