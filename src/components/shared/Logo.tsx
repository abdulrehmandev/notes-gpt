import { FC } from "react";
import { VariantProps, cva } from "class-variance-authority";
import { LucideProps } from "lucide-react";

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
    variant: "secondary",
    size: "default",
  },
});

interface LogoProps extends VariantProps<typeof logoVariants> {
  className?: string;
}

const Logo: FC<LogoProps> = ({ variant, size, className }) => {
  return <LogoSvg className={cn(logoVariants({ variant, size, className }))} />;
};

const LogoSvg = (props: LucideProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    {...props}
    viewBox="0 0 212 137"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M211.5 45C211.5 69.5767 191.577 89.5 167 89.5H115V52.5L167 52.5C171.142 52.5 174.5 49.1421 174.5 45C174.5 40.8579 171.142 37.5 167 37.5H118.989V0.500007L167 0.500011C191.577 0.500006 211.5 20.4233 211.5 45Z"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0.5 45C0.5 20.4233 20.4233 0.5 45 0.5C69.5767 0.5 89.5 20.4233 89.5 45V65.6542H52.5V45C52.5 40.8579 49.1421 37.5 45 37.5C40.8579 37.5 37.5 40.8579 37.5 45V115H0.5V45Z"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M52.5 68.75C52.5 31.0566 83.0566 0.5 120.75 0.5H146V37.5H120.75C103.491 37.5 89.5 51.4911 89.5 68.75C89.5 86.0089 103.491 100 120.75 100H146V137H120.75C83.0566 137 52.5 106.443 52.5 68.75Z"
    />
  </svg>
);

export default Logo;
