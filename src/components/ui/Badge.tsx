import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex gap-2 items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-blue-500 text-white shadow hover:bg-blue-500/80",
        secondary:
          "border-transparent bg-zinc-200/50 text-zinc-500 hover:bg-zinc-100/80",
        destructive:
          "border-transparent bg-red-600 text-white shadow hover:bg-red-600/80",
        outline: "text-black",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  removable?: boolean;
}

function Badge({
  className,
  variant,
  removable = false,
  children,
  ...props
}: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props}>
      {children} {removable && <X className="w-3 h-3" />}
    </div>
  );
}

export { Badge, badgeVariants };
