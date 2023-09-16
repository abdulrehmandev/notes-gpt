import { FC } from "react";
import { Icons } from "./Icons";

export interface SigninButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  provider: "google" | "apple";
}

const SigninButton: FC<SigninButtonProps> = ({ provider, ...props }) => {
  return (
    <button
      className="flex items-center justify-center gap-2 rounded-md text-sm font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-white text-gray-900 hover:bg-accent border border-stone-200 p-2"
      {...props}
    >
      {provider === "google" ? (
        <Icons.google className="w-6" />
      ) : (
        <Icons.apple className="w-6" />
      )}
      <span>Continue with {provider === "google" ? "Google" : "Apple"}</span>
    </button>
  );
};

export default SigninButton;
