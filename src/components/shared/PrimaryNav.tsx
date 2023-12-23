"use client";

import { FC } from "react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut, Settings, User, UserRound } from "lucide-react";
import type { Session } from "next-auth";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/Dropdown";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/Avatar";
import { getInitials } from "@/lib/helpers/stringsFormat";
import AppNavLink from "./PrimaryNavLink";
import Logo from "./Logo";
import Container from "../layout/Container";
import PrimaryNavLink from "./PrimaryNavLink";

const navLinks = [
  { id: 1, href: "/app", text: "Home" },
  { id: 2, href: "groups", text: "Groups" },
  { id: 3, href: "ai", text: "Ask AI" },
];

interface AppNavProps {
  session: Session | null;
}

const AppNav: FC<AppNavProps> = ({ session }) => {
  const pathname = usePathname();

  return (
    <div className="w-full py-3 bg-white border-b-0 border-zinc-200">
      <Container className="flex items-center justify-between">
        <nav className="flex items-center gap-4">
          <Logo className="mr-6" />
          {session?.user &&
            navLinks.map((link) => (
              <AppNavLink
                key={link.id}
                href={link.href}
                text={link.text}
                variant={pathname === link.href ? "active" : "default"}
              />
            ))}
        </nav>

        {session?.user ? (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage src="" />
                <AvatarFallback>
                  {session?.user.name ? (
                    getInitials(session?.user.name)
                  ) : (
                    <UserRound />
                  )}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <div className="flex items-center justify-start gap-2 p-2">
                <div className="flex flex-col space-y-1 leading-none">
                  {session.user.name && (
                    <p className="font-medium">{session.user.name}</p>
                  )}
                  {session.user.email && (
                    <p className="w-[200px] truncate text-sm text-muted-foreground">
                      {session.user.email}
                    </p>
                  )}
                </div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href={`/user/${session.user.username}`}>
                  <User className="w-4 h-4 mr-2" /> Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/user/settings">
                  <Settings className="w-4 h-4 mr-2" /> Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => signOut()}>
                <LogOut className="w-4 h-4 mr-2" /> Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <PrimaryNavLink href="/auth/sign-in" text="Sign In" />
        )}
      </Container>
    </div>
  );
};

export default AppNav;
