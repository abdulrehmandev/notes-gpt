import { FC } from "react";
import Link, { LinkProps } from "next/link";
import { VariantProps, cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

export const appNavLinkVariants = cva(
  "flex items-center gap-2 md:text-sm rounded-md px-3 py-1",
  {
    variants: {
      variant: {
        default: "text-zinc-950 hover:text-blue-500",
        disabled: "text-zinc-300 cursor-not-allowed",
        active: "text-blue-500 bg-zinc-100",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface SidebarLinkProps
  extends LinkProps,
    VariantProps<typeof appNavLinkVariants> {
  text?: string;
  className?: string;
  disabled?: boolean;
  children?: React.ReactNode;
}

const SidebarLink: FC<SidebarLinkProps> = ({
  text,
  className,
  variant,
  children,
  disabled = false,
  ...props
}) => {
  return (
    <Link
      className={cn(
        appNavLinkVariants({ variant, className }),
        disabled ? "pointer-events-none text-zinc-400" : ""
      )}
      {...props}
    >
      {text || children}
    </Link>
  );
};

export default SidebarLink;
