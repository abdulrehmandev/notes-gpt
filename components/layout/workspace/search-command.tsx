"use client";

import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
} from "@/components/ui/command";
import { searchCommandAtom } from "@/lib/atoms";

import { useAtom } from "jotai";
import React, { FC } from "react";

interface SearchCommandPorps {}

export const SearchCommand: FC<SearchCommandPorps> = ({}) => {
  const [open, onOpenChange] = useAtom(searchCommandAtom);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onOpenChange(!open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput disabled placeholder="Type a command or search..." />
      <CommandList className="styled__scrollbar">
        <CommandEmpty>No results found.</CommandEmpty>
        <p className="text-center text-muted-foreground my-4 text-xs font-semibold">
          Comming Soon...
        </p>
        <CommandSeparator />
        <CommandGroup heading="Suggestions">
          <CommandItem>Calendar</CommandItem>
          <CommandItem>Search Emoji</CommandItem>
          <CommandItem>Calculator</CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Settings">
          <CommandItem>Profile</CommandItem>
          <CommandItem>Billing</CommandItem>
          <CommandItem>Settings</CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
};
