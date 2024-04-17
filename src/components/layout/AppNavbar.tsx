"use client";

import React, { FC } from "react";
import Container from "./Container";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetPortal, SheetTrigger } from "../ui/Sheet";
import type { Session } from "next-auth";
import { Button } from "../ui/Button";
import Logo from "../shared/Logo";
import AppNavigationContent from "./AppNavigationContent";

interface AppNavbarProps {
  session: Session;
}

const AppNavbar: FC<AppNavbarProps> = ({ session }) => {
  return (
    <header className="w-full border-b bg-white md:hidden">
      <Container className="w-full flex items-center justify-between h-14">
        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" variant="ghost">
              <Menu className="w-5 h-5" />
            </Button>
          </SheetTrigger>
          <SheetPortal>
            <SheetContent side={"left"}>
              <AppNavigationContent session={session} />
            </SheetContent>
          </SheetPortal>
        </Sheet>

        <Logo />

        <span className="w-5" />
      </Container>
    </header>
  );
};

export default AppNavbar;
