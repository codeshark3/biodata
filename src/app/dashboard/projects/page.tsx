import { Button } from "~/components/ui/button";
import Link from "next/link";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { getProjects } from "~/server/queries";

async function Projects() {
  const projects = await getProjects();

  return (
    <div className=" h-full w-full  rounded-lg  p-4 ">
      <DataTable columns={columns} data={projects} />
    </div>
  );
}

export default async function ProjectsPage() {
  return (
    <div className="h-full w-full   ">
      <div>
        <div className="flex items-center justify-between px-4">
          <div className="items-center  ">
            <h2 className="text-2xl font-bold">Projects</h2>
            <p className="mt-1 text-sm text-gray-500">All Projects</p>
          </div>
          <Button className="btn-primary h-10 w-40">
            <Link href="/dashboard/projects/new">Create Project</Link>
          </Button>
        </div>
        <Projects />
      </div>
    </div>
  );
}
