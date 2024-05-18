import React from "react";
import type { Session } from "next-auth";
import { User } from "lucide-react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import type { Message } from "ai";

import Logo from "../shared/Logo";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/Avatar";

interface MessageProps {
  message: Message;
  session: Session | null;
}

const Message: React.FC<MessageProps> = ({ message, session }) => {
  if (message.role === "system") return null;

  return (
    <div
      className={`py-4 my-1 pl-3 pr-4 md:px-6 rounded-md flex items-start gap-3 md:gap-6 ${
        message.role === "assistant" ? "bg-blue-50" : "bg-transparent"
      }`}
    >
      <div className="rounded-full flex items-center justify-center">
        {message.role === "assistant" ? (
          <Logo size="sm" className="mt-2" />
        ) : (
          <Avatar className="flex items-center justify-center mr-2" size="md">
            <AvatarImage src={session?.user.image as string} />
            <AvatarFallback>
              <User className="w-6 h-6" />
            </AvatarFallback>
          </Avatar>
        )}
      </div>
      <Markdown
        className="flex flex-col items-start gap-2"
        remarkPlugins={[remarkGfm, remarkBreaks]}
      >
        {message.content}
      </Markdown>
    </div>
  );
};

export default Message;
