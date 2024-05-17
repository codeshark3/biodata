"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "~/components/ui/button";
import { Plus, Edit, Pencil } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import Link from "next/link";
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Projects = {
  id: number;
  project_id: string;
  name: string;
  start_date: string;
  end_date: string;
  description: string;
  createdAt: string;
};
export const columns: ColumnDef<Projects>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          className="text-center"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="text-center font-medium">{row.getValue("name")}</div>
      );
    },
  },
  {
    accessorKey: "project_id",
    header: "Project Id",
    cell: ({ row }) => {
      return (
        <div className="text-center font-medium">
          {row.getValue("project_id")}
        </div>
      );
    },
  },
  {
    accessorKey: "start_date",
    // header: "Start date",

    header: () => <div className="text-center">Start Date</div>,
    cell: ({ row }) => {
      const date = new Date(row.getValue("start_date"));
      const formatted = date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      return <div className="text-center font-medium ">{formatted}</div>;
    },
  },
  {
    accessorKey: "end_date",
    header: "End Date",
    cell: ({ row }) => {
      return (
        <div className="text-center font-medium">
          {row.getValue("end_date")}
        </div>
      );
    },
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => {
      return (
        <div className="text-center font-medium">
          {row.getValue("description")}
        </div>
      );
    },
  },
  {
    header: "Actions",
    id: "actions",
    cell: ({ row }) => {
      const project = row.original;

      return (
        <div className="flex items-center justify-center ">
          <Button className="h-10 w-20 bg-sky-600 ">
            <Edit size={16} color="white" />
            <Link
              href={`/projects/${project.id} `}
              onClick={() => console.log(project.id)}
            >
              Details
            </Link>
          </Button>
        </div>

        // <div className="flex items-center space-x-2">
        //   <Button className="flex h-8 w-8 items-center justify-center rounded-full bg-primary shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600">
        //     <Plus size={26} color="white" />
        //   </Button>
        //   <Button className="flex h-12 w-12 items-center justify-center rounded-full bg-primary shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600">
        //     <Edit size={26} color="white" />
        //   </Button>
        // </div>
        // <DropdownMenu>
        //   <DropdownMenuTrigger asChild>
        //     <Button variant="ghost" className="h-8 w-8 p-0">
        //       <span className="sr-only">Open menu</span>
        //       <MoreHorizontal className="h-4 w-4" />
        //     </Button>
        //   </DropdownMenuTrigger>
        //   <DropdownMenuContent align="end">
        //     <DropdownMenuLabel>Actions</DropdownMenuLabel>
        //     <DropdownMenuItem
        //       onClick={() => navigator.clipboard.writeText(project.project_id)}
        //     >
        //       Copy Project ID
        //     </DropdownMenuItem>
        //     <DropdownMenuSeparator />
        //     <DropdownMenuItem>View customer</DropdownMenuItem>
        //     <DropdownMenuItem>View payment details</DropdownMenuItem>
        //   </DropdownMenuContent>
        // </DropdownMenu>
      );
    },
  },
];
