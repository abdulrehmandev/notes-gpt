import { Bell, BellDot, BellOff } from "lucide-react";
import { FC } from "react";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Separator } from "../ui/separator";
import { Notification } from "./notification";
import type { NotificationType } from "./notification";

const notifications = [
  {
    id: 1,
    type: "error",
    title: "New Log In.",
    message: "You logged in from a new device.",
    time: "2 hours ago",
    isRead: false,
  },
  {
    id: 2,
    type: "success",
    title: "Account Created",
    message: "Your account has been successfully created.",
    time: "1 day ago",
    isRead: true,
  },
  {
    id: 3,
    type: "warning",
    title: "Password Expiration",
    message: "Your password will expire in 7 days. Please update it.",
    time: "3 days ago",
    isRead: false,
  },
  {
    id: 4,
    type: "info",
    title: "New Feature",
    message: "Explore our new feature in the latest update.",
    time: "5 days ago",
    isRead: false,
  },
  {
    id: 5,
    type: "message",
    title: "New Message",
    message: "You have a new message in your inbox.",
    time: "1 hour ago",
    isRead: false,
  },
];

interface NotificationDropDownProps {}

export const NotificationDropDown: FC<NotificationDropDownProps> = ({}) => {
  return (
    <Popover>
      <PopoverTrigger>
        <Button variant="icon" size="sm">
          {notifications.length !== 0 ? (
            <BellDot size={16} />
          ) : (
            <Bell size={16} />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 pt-2 min-w-[320px]" align="end">
        <h1 className="font-bold text-lg mx-3 mb-1">Notifications</h1>
        <Separator />
        <div className="styled__scrollbar | flex flex-col w-full h-full max-h-72 overflow-y-hidden relative">
          <div className="absolute inset-0 flex items-center justify-center backdrop-blur-sm bg-white/50 font-bold">
            Comming Soon!
          </div>
          {notifications.length === 0 ? (
            <div className="w-full aspect-video flex items-center justify-center text-xs font-medium">
              <div>
                <BellOff
                  size={32}
                  className="mx-auto mb-3 text-muted-foreground"
                />
                <p>You have no unread notifications.</p>
              </div>
            </div>
          ) : (
            notifications.map((notif) => (
              <Notification
                key={notif.id}
                type={notif.type as NotificationType}
                title={notif.title}
                message={notif.message}
                isRead={notif.isRead}
                time={notif.time}
              />
            ))
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};
