"use client";
import {
  User,
  TestTubeDiagonal,
  Target,
  Home,
  BarChart,
  Container,
  Settings,
} from "lucide-react";
import UserItem from "../components/UserItem";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "../components/ui/command";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Sidebar() {
  const currentPath = usePathname();

  const menuList = [
    {
      group: "General",
      items: [
        { link: "/", icon: <Home />, text: "Dashboard" },
        { link: "/projects", icon: <Target />, text: "Projects" },
        { link: "/samples", icon: <TestTubeDiagonal />, text: "Samples" },

        { link: "/inventory", icon: <Container />, text: "Inventory" },
        { link: "/analytics", icon: <BarChart />, text: "Analytics" },
      ],
    },
    {
      group: "Settings",
      items: [
        { link: "/settings", icon: <Settings />, text: "Settings" },
        { link: "/users", icon: <User />, text: "Profile" },
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
            {menuList.map((menu: any, key: number) => (
              <CommandGroup key={key} heading={menu.group}>
                {menu.items.map((option: any, optionKey: number) => (
                  <Link href={option.link}>
                    <CommandItem
                      key={optionKey}
                      className={` ${option.link === currentPath ? "text-zinc-900" : "text-zinc-500"}  flex cursor-pointer gap-2 p-2 hover:bg-sky-900 `}
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
      <div>settings</div>
    </div>
  );
}
