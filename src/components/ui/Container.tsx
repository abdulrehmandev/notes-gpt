import { cn } from "@/lib/utils";
import React, { FC } from "react";

interface ContainerProps {
  children: React.ReactNode;
}
const Container: FC<ContainerProps> = ({ children }) => {
  return <div className={cn("container mx-auto max-w-6xl")}>{children}</div>;
};

export default Container;
