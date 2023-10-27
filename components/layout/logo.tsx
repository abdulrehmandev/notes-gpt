import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import { BookOpenCheck } from "lucide-react";
import { FC } from "react";

// logo variants for different sizes
const logoVariants = cva("font-semibold rounded-md cursor-default", {
  variants: {
    variant: {
      default: "flex items-center",
      icon: "",
    },
    size: {
      default: "text-lg gap-3",
      xs: "text-xs gap-2",
      sm: "text-sm gap-2",
      md: "text-base gap-2",
      lg: "text-xl gap-3",
      xl: "text-2xl gap-4",
    },
  },
  defaultVariants: {
    size: "default",
    variant: "default",
  },
});

// variants for logo icon to adapt to different sizes
const logoIconVariants = cva("", {
  variants: {
    size: {
      default: "w-5 h-5",
      xs: "w-4 h-4",
      sm: "w-4 h-4",
      md: "w-4 h-4",
      lg: "w-6 h-6",
      xl: "w-8 h-8",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

interface LogoProps extends VariantProps<typeof logoVariants> {
  className?: string;
}

export const Logo: FC<LogoProps> = ({ className, size, variant }) => {
  return (
    <div className={cn(logoVariants({ size, className }), "w-fit")}>
      <BookOpenCheck className={cn(logoIconVariants({ size }))} />
      {variant === "icon" ? null : <span>Notes GPT</span>}
    </div>
  );
};
