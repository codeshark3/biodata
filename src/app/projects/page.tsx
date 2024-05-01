import React from "react";
import { Button } from "~/components/ui/button";
import Link from "next/link";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { getProjects } from "../../server/queries";

async function Projects() {
  const projects = await getProjects();

  return (
    <div className="w-full">
      <DataTable columns={columns} data={projects} />
    </div>
  );
}

export default async function ProjectsPage() {
  return (
    <div className="flex flex-col gap-4 p-4">
      <div>
        <Button className="btn-primary h-10 w-40">
          <Link href="/projects/new">Create Project</Link>
        </Button>
      </div>

      <div className=" container  flex flex-col items-center rounded-md  border-4 border-cyan-700 bg-white shadow-lg">
        <div className="p-4">
          <h2 className="text-lg font-medium">Projects</h2>
          <p className="mt-1 text-sm text-gray-500">All Projects</p>
        </div>
        <Projects />
      </div>
    </div>
  );
}
