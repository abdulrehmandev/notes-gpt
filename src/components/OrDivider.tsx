import { cn } from "@/lib/utils";

interface OrDividerProps {
  className?: string;
  text?: string;
}

const OrDivider = ({ className, text = "or with" }: OrDividerProps) => {
  return (
    <span
      className={cn(
        "mx-auto my-4 w-full max-w-xs flex items-center text-sm text-stone-400 before:h-0.5 before:w-full before:bg-stone-200 after:h-0.5 after:w-full after:bg-stone-200",
        className
      )}
    >
      <span className="w-fit whitespace-nowrap mx-4">{text}</span>
    </span>
  );
};

export default OrDivider;
