import { FC } from "react";

interface MessageProps {
  message: { id: number; content: string; role: "user" | any };
}

const Message: FC<MessageProps> = ({ message }) => {
  return (
    <div
      className={`max-w-[80%] rounded-full px-3 py-1 w-fit ${
        message.role === "user"
          ? "bg-primary text-primary-foreground ml-auto rounded-ee-none"
          : "bg-gray-500 text-white rounded-ss-none"
      }`}
    >
      {message.content}
    </div>
  );
};

export default Message;
