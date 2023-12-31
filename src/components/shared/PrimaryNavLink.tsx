import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import Link, { LinkProps } from "next/link";
import { FC } from "react";

export const appNavLinkVariants = cva("rounded-full px-4 py-0.5 text-sm", {
  variants: {
    variant: {
      default: "text-zinc-950 hover:text-blue-500",
      active: "text-blue-500 bg-blue-50",
      disabled: "text-zinc-300 cursor-not-allowed",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

interface AppNavLinkProps
  extends LinkProps,
    VariantProps<typeof appNavLinkVariants> {
  text: string;
  className?: string;
}

const AppNavLink: FC<AppNavLinkProps> = ({
  text,
  className,
  variant,
  ...props
}) => {
  return (
    <Link className={cn(appNavLinkVariants({ variant, className }))} {...props}>
      {text}
    </Link>
  );
};

export default AppNavLink;
