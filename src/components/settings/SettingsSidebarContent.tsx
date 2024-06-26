"use client";

import { usePathname } from "next/navigation";

import SidebarLink from "../shared/SidebarLink";

const settingLinks = [
  { href: "/user/settings/account", text: "Account", disabled: false },
  // { href: "/user/settings/security", text: "Security", disabled: true },
  // {
  //   href: "/user/settings/notifications",
  //   text: "Notifications",
  //   disabled: true,
  // },
];

const SettingsSidebarContent = () => {
  const pathname = usePathname();

  return (
    <aside className="max-w-[240px]">
      {/* <h1 className="font-semibold tracking-tighter text-3xl mb-6">Settings</h1> */}
      <nav className="flex flex-col w-full">
        {settingLinks.map((link) => (
          <SidebarLink
            key={link.href}
            className="w-full"
            href={link.href}
            variant={
              link.disabled
                ? "disabled"
                : link.href === pathname
                ? "active"
                : "default"
            }
            text={link.text}
          />
        ))}
      </nav>
    </aside>
  );
};

export default SettingsSidebarContent;
