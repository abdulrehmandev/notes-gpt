"use client";

import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      className="toaster group"
      richColors
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-white group-[.toaster]:text-zinc-950 group-[.toaster]:border-zinc-200 group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-zinc-700",
          actionButton:
            "group-[.toast]:bg-blue-50 group-[.toast]:text-blue-500",
          cancelButton:
            "group-[.toast]:bg-zinc-100 group-[.toast]:text-zinc-700",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
