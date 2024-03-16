"use client";

import React, { FC } from "react";
import Container from "./Container";
import { appNavigation } from "@/data";
import { getInitials } from "@/lib/helpers/stringsFormat";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/Avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "../ui/Dropdown";
import {
  Plus,
  BookmarkCheck,
  StickyNoteIcon,
  Bell,
  Users,
  UserRound,
  Link,
  User,
  Settings,
  LogOut,
  Menu,
} from "lucide-react";
import { signOut } from "next-auth/react";
import SidebarLink from "../shared/SidebarLink";
import { Sheet, SheetContent, SheetPortal, SheetTrigger } from "../ui/Sheet";
// import { usePathname } from "next/navigation";
import type { Session } from "next-auth";
import { Button } from "../ui/Button";
import Logo from "../shared/Logo";
import AppNavigationContent from "./AppNavigationContent";

interface AppNavbarProps {
  session: Session;
}

const AppNavbar: FC<AppNavbarProps> = ({ session }) => {
  //   const pathname = usePathname();
  //   const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <header className="w-full border-b bg-white md:hidden">
      <Container className="w-full flex items-center justify-between h-14">
        <Sheet>
          <SheetTrigger>
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
