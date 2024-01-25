import { cn } from "@/lib/utils";
import React, { FC } from "react";

interface ContainerProps {
  children?: React.ReactNode;
  className?: string;
  removeStyles?: boolean;
}

const Container: FC<ContainerProps> = ({
  children,
  className,
  removeStyles = false,
}) => {
  return (
    <div
      className={cn(
        "container mx-auto w-full",
        !removeStyles ? "px-4 md:px-6" : "p-0",
        className
      )}
    >
      {children}
    </div>
  );
};

export default Container;
