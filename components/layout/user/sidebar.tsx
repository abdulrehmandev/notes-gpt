"use client";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { SideBarLink } from "../workspace/sidebar/sidebar-link";
import { ArrowRightFromLine, ChevronsLeft, Settings, User } from "lucide-react";
import { useBreakpoint } from "@/hooks/use-breakpoint";
import { useLayoutEffect, useState } from "react";
import { useAtom } from "jotai";
import { userSideBarAtom } from "@/lib/atoms";
import { Button } from "@/components/ui/button";

export const UserSideBar = () => {
  const { isAboveMd: breakpointAboveMd } = useBreakpoint("md");
  const [isNavOpen, setIsNavOpen] = useAtom(userSideBarAtom);
  const [isAboveMd, setIsAboveMd] = useState(false);

  useLayoutEffect(() => {
    setIsAboveMd(breakpointAboveMd);
  }, [breakpointAboveMd]);

  return (
    <Sheet open={false} onOpenChange={setIsNavOpen}>
      <SheetContent
        side="left"
        appearClose={false}
        appearOverlay={false}
        className="sm:max-w-[280px] w-full"
      >
        <SheetHeader className="mb-10">
          <SheetTitle>Settings</SheetTitle>
        </SheetHeader>

        <SheetClose className="absolute top-6 -right-4 bg-background" asChild>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsNavOpen((prevState) => !prevState)}
          >
            <ChevronsLeft size={16} />
          </Button>
        </SheetClose>

        <nav className="flex flex-col w-full gap-1">
          <SideBarLink href="/user/profile">
            <User size={15} /> Profile
          </SideBarLink>
          <SideBarLink href="/user/account-settings">
            <Settings size={15} /> Account Settings
          </SideBarLink>
        </nav>
      </SheetContent>
    </Sheet>
  );
};
