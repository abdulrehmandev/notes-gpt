import { cn } from "@/lib/utils";
import {
  AlertCircle,
  CheckCircle,
  CheckCircle2,
  Info,
  Mail,
  Send,
  ShieldAlert,
} from "lucide-react";
import React from "react";

export type NotificationType =
  | "success"
  | "error"
  | "warning"
  | "info"
  | "message";

interface NotificationProps {
  type: NotificationType;
  title: string;
  message: string;
  time: string;
  isRead: boolean;
}

export const Notification: React.FC<NotificationProps> = ({
  type,
  title,
  message,
  time,
  isRead,
}) => {
  let Icon;

  switch (type) {
    case "success":
      Icon = CheckCircle2;
      break;
    case "error":
      Icon = ShieldAlert;
      break;
    case "info":
      Icon = Info;
      break;
    case "message":
      Icon = Send;
      break;
    case "warning":
      Icon = AlertCircle;
      break;
    default:
      Icon = Mail;
      break;
  }

  return (
    <div
      className={cn(
        "w-full px-3 py-1 my-0.5 flex items-start gap-2 text-xs",
        type === "success"
          ? "bg-green-100"
          : type === "error"
          ? "bg-red-100"
          : type === "warning"
          ? "bg-orange-100"
          : null
      )}
    >
      <div className="p-2 rounded-full bg-gray-300/20 text-muted-foreground">
        <Icon size={24} />
      </div>
      <div className="w-full my-1">
        <div className="flex gap-2 justify-between">
          <h4 className="font-bold">{title}</h4>
          <p className="opacity-60">{time}</p>
        </div>
        <p>{message}</p>
      </div>
    </div>
  );
};
