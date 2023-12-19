import { VariantProps, cva } from "class-variance-authority";
import { FC } from "react";
import NextLink, { LinkProps as NextLinkProps } from "next/link";
import { cn } from "@/lib/utils";

const linkVariants = cva("w-fit", {
  variants: {
    variant: {
      accent: "no-underline text-blue-600 hover:underline",
      underline: "underline hover:text-blue-600",
      fade: "no-underline hover:opacity-60",
    },
    size: {
      default: "",
      sm: "text-sm",
      xs: "text-xs",
    },
  },
  defaultVariants: {
    variant: "accent",
    size: "default",
  },
});

interface LinkProps extends NextLinkProps, VariantProps<typeof linkVariants> {
  text: string;
  className?: string;
}

const Link: FC<LinkProps> = ({ text, variant, size, className, ...props }) => {
  return (
    <NextLink
      className={cn(linkVariants({ variant, size, className }))}
      {...props}
    >
      {text}
    </NextLink>
  );
};

export default Link;
