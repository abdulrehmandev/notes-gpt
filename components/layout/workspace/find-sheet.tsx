"use client";

import Message from "@/components/message";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetPortal,
  SheetFooter,
} from "@/components/ui/sheet";
import { findSheetAtom } from "@/lib/atoms";
import { useAtom } from "jotai";
import { Send, SendHorizonal } from "lucide-react";
import { FC } from "react";

const messages = [
  { id: 1, content: "Hello", role: "user" },
  { id: 2, content: "Hi", role: "ai" },
  { id: 2, content: "How can I help you?", role: "ai" },
];

interface FindSheetProps {}

export const FindSheet: FC<FindSheetProps> = ({}) => {
  const [open, onOpenChange] = useAtom(findSheetAtom);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="min-w-[400px] flex flex-col w-full justify-between gap-0">
        <div className="absolute inset-0 backdrop-blur-sm flex flex-col items-center justify-center">
          <p className="font-bold text-lg">Comming Soom...</p>
          <p className="text-muted-foreground text-sm mt-1">
            Chat with our ai model will be available soon.
          </p>
        </div>
        <SheetHeader>
          <SheetTitle>Find with AI</SheetTitle>
          <SheetDescription>This is your chat with the AI.</SheetDescription>
        </SheetHeader>

        <div className="styled__scrollbar | bg-border/20 rounded-lg p-2 h-full flex flex-col-reverse gap-1 overflow-y-scroll w-full mt-2">
          {messages.map((msg) => (
            <Message message={msg} key={msg.id} />
          ))}
        </div>

        <SheetFooter className="pt-2">
          <Input placeholder="Type your message here" />
          <Button className="h-9">
            <SendHorizonal size={16} />
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
