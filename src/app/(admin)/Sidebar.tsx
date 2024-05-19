"use client";
import { User, TestTubeDiagonal, Target, Home, Settings } from "lucide-react";
import UserItem from "~/components/UserItem";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "~/components/ui/command";
import { usePathname } from "next/navigation";
import Link from "next/link";

import LogoutButton from "~/components/auth/logout_button";
export default function Sidebar() {
  const currentPath = usePathname();
  interface MenuItem {
    link: string;
    icon: React.ReactNode;
    text: string;
  }

  interface MenuGroup {
    group: string;
    items: MenuItem[];
  }

  const menuList: MenuGroup[] = [
    {
      group: "General",
      items: [
        { link: "/", icon: <Home />, text: "Dashboard" },
        { link: "/projects", icon: <Target />, text: "Projects" },
        { link: "/samples", icon: <TestTubeDiagonal />, text: "Samples" },
        { link: "/users", icon: <User />, text: "Users" },
        { link: "/settings", icon: <Settings />, text: "Settings" },
      ],
    },
    {
      group: "Admin",
      items: [{ link: "/users", icon: <User />, text: "User Management" }],
    },
    {
      group: "Settings",
      items: [
        { link: "/settings", icon: <Settings />, text: "Settings" },
        { link: "/account", icon: <User />, text: "Profile" },
      ],
    },
  ];

  return (
    <div className=" fixed flex  min-h-screen w-[300px] min-w-[300px] flex-col gap-4 border-r p-4 ">
      <div>
        <UserItem />
      </div>
      <div className="grow">
        <Command style={{ overflow: "visible" }}>
          <CommandList style={{ overflow: "visible" }}>
            {menuList.map((menu, key) => (
              <CommandGroup key={key} heading={menu.group}>
                {menu.items.map((option, optionKey) => (
                  <Link href={option.link} key={optionKey}>
                    <CommandItem
                      key={optionKey}
                      className={`${option.link === currentPath ? "text-zinc-900" : "text-zinc-500"} flex cursor-pointer gap-2 p-2 hover:bg-sky-900`}
                    >
                      {option.icon}
                      {option.text}
                    </CommandItem>
                  </Link>
                ))}
              </CommandGroup>
            ))}
          </CommandList>
        </Command>
      </div>
      <div>
        <LogoutButton />
      </div>
    </div>
  );
}
