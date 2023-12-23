import { FC } from "react";
import { VariantProps, cva } from "class-variance-authority";
import { Shell } from "lucide-react";

import { cn } from "@/lib/utils";

const logoVariants = cva("", {
  variants: {
    variant: {
      primary: "text-blue-500",
      secondary: "text-zinc-950",
    },
    size: {
      default: "w-8 h-8",
      sm: "w-6 h-6",
      lg: "w-10 h-10",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "default",
  },
});

interface LogoProps extends VariantProps<typeof logoVariants> {
  className?: string;
}

const Logo: FC<LogoProps> = ({ variant, size, className }) => {
  return <Shell className={cn(logoVariants({ variant, size, className }))} />;
};

export default Logo;
