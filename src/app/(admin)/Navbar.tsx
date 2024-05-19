"use client";
import { BellIcon } from "lucide-react";
import { Button } from "~/components/ui/button";
import { CommandDemo } from "~/components/Command";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  // DropdownMenuLabel,
  // DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

import { useState } from "react";

const Navbar = () => {
  interface Notification {
    text: string;
    date: string;
    read: boolean;
  }
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      text: "notifi",
      date: "02-02-2018",
      read: true,
    },
    {
      text: "notification",
      date: "02-02-2013",
      read: false,
    },
  ]);
  const links = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];
  return (
    <div className="grid grid-cols-2   gap-4  border-b p-4 ">
      <CommandDemo />

      <div className="flex items-center justify-end">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <BellIcon className="h-4 w-4 " />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {/* {notifications.map((item: any, key: number ) => (
              <DropdownMenuItem
                key={key}
                className="item-start flex cursor-pointer gap-2 px-3 py-2 transition hover:bg-neutral-50"
              >
                <div
                  className={`my-1 h-3 w-3 rounded-full ${
                    !item.read ? "bg-green-500" : "bg-neutral-200"
                  }`}
                ></div>
                <p className="">{item.text}</p>
                <p className="text0xs text-neutral-500">{item.date}</p>
              </DropdownMenuItem>
            ))} */}

            {notifications.map((item: Notification, key: number) => (
              <DropdownMenuItem
                key={key}
                className="item-start flex cursor-pointer gap-2 px-3 py-2 transition hover:bg-neutral-50"
              >
                <div
                  className={`my-1 h-3 w-3 rounded-full ${
                    !item.read ? "bg-green-500" : "bg-neutral-200"
                  }`}
                ></div>
                <p>{item.text}</p>
                <p className="text-xs text-neutral-500">{item.date}</p>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
    // <nav className="flex-end  flex w-full  items-center justify-between border-b p-4 text-xl font-semibold">
    //   {/* <Link href="/">Logos</Link> */}
    //   <div className="flex flex-row gap-4">
    //     {links.map((link) => (
    //       <Link
    //         key={link.href}
    //         className="text-sky-500 transition-colors hover:text-sky-800"
    //         href={link.href}
    //       >
    //         {link.label}
    //       </Link>
    //     ))}
    //   </div>
    // </nav>
  );
};

export default Navbar;
