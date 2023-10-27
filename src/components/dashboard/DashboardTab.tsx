import { cn } from "@/lib/utils";
import { LucideProps } from "lucide-react";
import Link, { LinkProps } from "next/link";
import { FC } from "react";

interface DashboardTabProps extends LinkProps {
  icon?: FC<LucideProps>;
  text: string;
  className?: string;
}

const DashboardTab: FC<DashboardTabProps> = ({
  icon: Icon,
  text,
  className,
  ...props
}) => {
  return (
    <>
      <Link
        className={cn(
          "flex items-center gap-4 w-full rounded-md hover:bg-gray-100 py-1 px-4 font-medium text-lg text-zinc-500",
          className
        )}
        {...props}
      >
        {Icon && <Icon className="w-4 h-4" />}
        <span>{text}</span>
      </Link>
    </>
  );
};

export default DashboardTab;
