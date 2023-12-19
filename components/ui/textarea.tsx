import { FC } from "react";
import TextareaAutosize from "react-textarea-autosize";

import { cn } from "@/lib/utils";

export interface TextareaProps {
  className?: string;
  placeholder?: string;
  maxRows?: number;
  minRows?: number;
}

export const Textarea: FC<TextareaProps> = ({
  className,
  placeholder = "",
  maxRows = 6,
  minRows = 2,
  ...props
}) => {
  return (
    <TextareaAutosize
      className={cn(
        "flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      placeholder={placeholder}
      maxRows={maxRows}
      minRows={minRows}
      {...props}
    />
  );
};
