import { getAuthSession } from "@/lib/auth";
import Link from "next/link";

export default async function Home() {
  const session = await getAuthSession();

  return (
    <main className="container mx-auto mt-20 space-y-4">
      <h1 className="font-bold text-xl text-center">Hello World!</h1>
      {session?.user && (
        <p className="text-md text-center">
          Signed in with {session.user.email}
        </p>
      )}
      <div className="p-1 rounded-md bg-zinc-50 flex items-center justify-center mx-auto w-fit gap-1">
        {session?.user ? (
          <Link
            href="/auth/sign-out"
            className="hover:bg-zinc-100 rounded-sm px-3 py-1"
          >
            Sign out
          </Link>
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
