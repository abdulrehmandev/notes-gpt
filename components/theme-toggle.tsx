"use client";

import { cn } from "@/lib/utils";
import * as SwitchPrimitives from "@radix-ui/react-switch";
import { FC } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

interface ThemeToggleProps {}

export const ThemeToggle: FC<ThemeToggleProps> = ({}) => {
  const { theme, setTheme } = useTheme();
  return (
    <div className="px-1 lg:px-2 flex items-center justify-center">
      <SwitchPrimitives.Root
        className={cn(
          "w-[35px] h-[21px] bg-muted rounded-full relative border border-border hover:border-primary outline-none cursor-default"
        )}
        checked={theme === "dark"}
        onCheckedChange={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        <SwitchPrimitives.Thumb
          className={cn(
            "block w-[18px] h-[18px] bg-white dark:bg-black border border-input text-muted-foreground p-[3px] rounded-full shadow-sm transition-transform duration-100 translate-x-[1px] data-[state=checked]:translate-x-[15px] will-change-transform"
          )}
          asChild
        >
          {theme === "dark" ? <Moon size="5" /> : <Sun size="5" />}
        </SwitchPrimitives.Thumb>
      </SwitchPrimitives.Root>
    </div>
  );
};
