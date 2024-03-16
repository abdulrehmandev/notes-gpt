import React, { FC, useState } from "react";
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
} from "lucide-react";
import { signOut } from "next-auth/react";
import SidebarLink from "../shared/SidebarLink";
import { Sheet, SheetContent, SheetTrigger } from "../ui/Sheet";
import { usePathname } from "next/navigation";
import { Button } from "../ui/Button";
import { AppNavbarProps } from "./AppNavbar";

export const AppNavbar: FC<AppNavbarProps> = ({ session }) => {
  const pathname = usePathname();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <header className="w-full border-b bg-white">
      <Container className="w-full flex items-center justify-between h-14">
        <Sheet open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
          <SheetTrigger>
            <Button
              size="icon"
              variant="ghost"
              className="md:hidden"
              onClick={() => setIsDrawerOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <div className="mt-12 pb-10 flex flex-col justify-between h-full">
              <nav className="flex flex-col gap-1">
                {appNavigation.map((link) => (
                  <SidebarLink
                    key={link.id}
                    href={link.href}
                    text={link.text}
                    disabled={link.disabled}
                  />
                ))}
                <>
                  <SidebarLink href={"/app/create"} variant={"active"}>
                    <Plus className="w-4 h-4" /> Create
                  </SidebarLink>
                  <SidebarLink href={"/app/bookmarks"}>
                    <BookmarkCheck className="w-4 h-4" /> Bookmarks
                  </SidebarLink>
                  <SidebarLink href={"/app/notes"}>
                    <StickyNoteIcon className="w-4 h-4" /> All Notes
                  </SidebarLink>
                  <span className="h-3" />
                  <SidebarLink href={"/app/notifications"}>
                    <Bell className="w-4 h-4" /> Notifications
                  </SidebarLink>
                  <span className="h-3" />
                  <SidebarLink href={"/app/groups"}>
                    <Users className="w-4 h-4" /> Groups
                  </SidebarLink>
                </>
              </nav>
              <div className="flex item-center gap-2 my-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <div className="flex px-2 items-center data-[state=open]:bg-zinc-100 rounded-md w-full">
                      <Avatar>
                        <AvatarImage src={session.user.image as string} />
                        <AvatarFallback>
                          {session?.user.name ? (
                            getInitials(session?.user.name)
                          ) : (
                            <UserRound />
                          )}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex items-center justify-start gap-2 p-2">
                        <div className="flex flex-col space-y-1 leading-none">
                          {session.user.name && (
                            <p className="font-medium w-fit">
                              {session.user.name}
                            </p>
                          )}
                          {session.user.email && (
                            <p className="truncate text-sm text-muted-foreground">
                              {session.user.email}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent className="min-w-[14.5rem]" side="top">
                    <DropdownMenuItem asChild>
                      <Link href={`/${session.user.username}`}>
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
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </Container>
    </header>
  );
};
