import AlreadyLoggedIn from "@/components/AlreadyLoggedIn";
import OrDivider from "@/components/OrDivider";
import SigninButton from "@/components/SigninButton";
import SignupAuthForm from "@/components/SignupAuthForm";
import { buttonVariants } from "@/components/ui/Button";
import { getAuthSession } from "@/lib/auth";
import { Home } from "lucide-react";
import Link from "next/link";
import { FC } from "react";

interface SignupProps {}

const Signup: FC<SignupProps> = async () => {
  const session = await getAuthSession();

  // if already logged in then no need to show signup form
  if (session) {
    return <AlreadyLoggedIn session={session} />;
  }

  return (
    <main>
      <div className="container mx-auto py-8 h-screen">
        {/* Back home link */}
        <Link href="/" className={buttonVariants({ variant: "ghost" })}>
          <Home size={13} />
          <span className="ml-2">Home</span>
        </Link>
        <div className="w-full h-full flex items-center justify-center mt-6">
          <div className="w-fit max-w-sm mx-auto text-center">
            <h1 className="font-semibold text-2xl md:text-3xl mb-4">
              Create your new Account
            </h1>
            <p className="max-w-xs mx-auto text-xs">
              By continuing, you are setting up a NotesGPT account and agree to
              our User Agreement and Privacy Policy.
            </p>

            {/* providers signin buttons */}
            <div className="flex flex-col gap-3 mt-6">
              {/* <SigninButton provider="google" /> */}
              <SigninButton provider="github" />
            </div>

            {/* or divider */}
            {/* <OrDivider className="mt-6 mb-8" /> */}

            {/* email Signup form */}
            {/* <SignupAuthForm /> */}

            {/* other links */}
            {/* <p className="text-xs text-center text-stone-600 mt-2">
              Already have a account?{" "}
              <Link
                href="/login"
                className={buttonVariants({
                  variant: "link",
                  size: "sm",
                  className: "px-0",
                })}
              >
                Login
              </Link>
            </p> */}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Signup;
