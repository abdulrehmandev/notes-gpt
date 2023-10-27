import React, { FC } from "react";
import NextLink, { LinkProps as NextLinkProps } from "next/link";
import { VariantProps, cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const linkVariants = cva("p-1 rounded-md", {
  variants: {
    variant: {
      default: "hover:underline",
      navlink:
        "font-medium py-1 px-3 hover:bg-neutral-100 dark:hover:bg-neutral-800 dark:hover:text-neutral-100",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export interface LinkProps
  extends NextLinkProps,
    VariantProps<typeof linkVariants> {
  children: React.ReactNode;
  className?: string;
}

// custom next link component with variants
export const Link: FC<LinkProps> = ({
  className,
  children,
  variant,
  ...props
}) => {
  return (
    <NextLink className={cn(linkVariants({ variant, className }))} {...props}>
      {children}
    </NextLink>
  );
};
