"use client";

import type { Session } from "next-auth";
import { FC } from "react";
import { Card, CardContent, CardTitle } from "../ui/Card";
import { Button } from "../ui/Button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/Dialoge";
import { useBreakpoint } from "@/lib/hooks/use-breakpoint";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/Drawer";

interface DeleteAccountProps {
  session: Session;
}

const DeleteAccount: FC<DeleteAccountProps> = ({ session }) => {
  const { isMd } = useBreakpoint("md");

  return (
    <Card className="border-red-600">
      <CardContent className="space-y-2 pb-4 pt-6">
        <CardTitle className="text-red-600 mb-4 md:mb-0">
          Delete Account
        </CardTitle>
        <div className="flex flex-col md:flex-row justify-between items-end md:items-center gap-3">
          <p className="text-zinc-700 text-sm max-w-2xl">
            Note that deleting your account will also delete any organizations
            in which you are the only member.
          </p>
          {isMd ? (
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="destructive">Delete account</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Delete Account</DialogTitle>
                  <DialogDescription>
                    Are you sure you want to delete this database? <br />
                    <span className="font-semibold text-red-600">
                      This can not be undone.
                    </span>
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter className="sm:justify-start">
                  <DialogClose asChild disabled>
                    <Button type="button" variant="destructive">
                      Delete
                    </Button>
                  </DialogClose>
                  <DialogClose asChild>
                    <Button type="button" variant="outline">
                      Close
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          ) : (
            <Drawer>
              <DrawerTrigger asChild>
                <Button variant="destructive">Delete account</Button>
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader className="text-left">
                  <DrawerTitle>Delete Account</DrawerTitle>
                  <DrawerDescription>
                    Are you sure you want to delete this database? <br />
                    <span className="font-semibold text-red-600">
                      This can not be undone.
                    </span>
                  </DrawerDescription>
                </DrawerHeader>
                <DrawerFooter>
                  <DrawerClose asChild disabled>
                    <Button type="button" variant="destructive">
                      Delete
                    </Button>
                  </DrawerClose>
                  <DrawerClose asChild>
                    <Button type="button" variant="outline">
                      Close
                    </Button>
                  </DrawerClose>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default DeleteAccount;
