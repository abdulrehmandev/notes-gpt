import { cn } from "@/lib/utils";
import { LucideIcon, LucideProps } from "lucide-react";
import Link, { LinkProps } from "next/link";
import React from "react";

interface SideBarLinkProps extends LinkProps {
  className?: string;
  children: React.ReactNode;
}

export const SideBarLink = ({
  className,
  children,
  href,
  ...props
}: SideBarLinkProps) => {
  return (
    <Link
      className={cn(
        "flex items-center gap-2 text-sm hover:bg-neutral-200/50 dark:hover:bg-neutral-800 opacity-90 px-2 py-1 rounded-md",
        className
      )}
      href={href}
      {...props}
    >
      {children}
    </Link>
  );
};
