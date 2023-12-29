import { FC } from "react";
import Link, { LinkProps } from "next/link";
import { VariantProps, cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

export const appNavLinkVariants = cva("rounded-md px-3 py-1", {
  variants: {
    variant: {
      default: "text-zinc-950 hover:text-blue-500",
      disabled: "text-zinc-300 cursor-not-allowed",
      active: "text-blue-500 bg-zinc-50",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

interface SidebarLinkProps
  extends LinkProps,
    VariantProps<typeof appNavLinkVariants> {
  text: string;
  className?: string;
}

const SidebarLink: FC<SidebarLinkProps> = ({
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

export default SidebarLink;
