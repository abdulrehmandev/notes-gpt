"use client";

import { usePathname } from "next/navigation";

import SidebarLink from "./SidebarLink";

const settingLinks = [
  { href: "/user/settings", text: "Contact Info" },
  { href: "/user/settings/profile", text: "Profile" },
  { href: "/user/settings/account", text: "Account" },
  { href: "/user/settings/reset-password", text: "Password" },
  { href: "/user/settings/notifications", text: "Notifications" },
];

const SettingsSidebarContent = () => {
  const pathname = usePathname();

  return (
    <aside className="max-w-[256px] min-h-screen">
      <h1 className="font-semibold tracking-tighter text-4xl mb-6">Settings</h1>
      <nav className="flex flex-col gap-2 w-full">
        {settingLinks.map((link) => (
          <SidebarLink
            key={link.href}
            className="w-full"
            href={link.href}
            variant={link.href === pathname ? "active" : "default"}
            text={link.text}
          />
        ))}
      </nav>
    </aside>
  );
};

export default SettingsSidebarContent;
