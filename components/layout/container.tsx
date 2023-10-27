import { cn } from "@/lib/utils";
import React, { FC, HtmlHTMLAttributes } from "react";

interface ContainerProps extends HtmlHTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

// base container component for all components
export const Container: FC<ContainerProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div
      className={cn(
        "contianer mx-auto max-w-7xl px-4 sm:px-6 lg:px-8",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
