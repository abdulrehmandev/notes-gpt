import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import React, { FC } from "react";

const kbdVariants = cva(
  "inline-flex items-center justify-center rounded-md transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "font-medium bg-input text-input-foreground font-medium",
      },
      size: {
        default: "h-5 px-2 text-[11px]",
        sm: "h-4 px-2 text-[9px]",
        xs: "h-3 px-1 text-[8px] rounded-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

interface KbdProps
  extends VariantProps<typeof kbdVariants>,
    React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const Kbd: FC<KbdProps> = ({
  children,
  variant,
  size,
  className,
  ...props
}) => {
  return (
    <kbd className={cn(kbdVariants({ variant, size, className }))} {...props}>
      {children}
    </kbd>
  );
};
