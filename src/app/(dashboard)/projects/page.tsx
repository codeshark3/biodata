import { Button } from "~/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { getProjects } from "~/server/projects_queries";
import { validateRequest } from "~/auth";
import { redirect } from "next/navigation";
import LogoutButton from "~/components/auth/logout_button";

async function Projects() {
  const projects = await getProjects();

  // interface ProjectsProps {
  //     projects: any;
  //   }
  return (
    <div className=" h-full w-full  rounded-lg  p-4 ">
      <DataTable columns={columns} data={projects} />
    </div>
  );
}

export default async function ProjectsPage() {
  const { user } = await validateRequest();
  if (!user) {
    console.log("no user");
    return redirect("/auth/login");
  }
  return (
    <div className="h-full w-full   ">
      <div>
        <div className="flex items-center justify-between px-4">
          <div className="items-center  ">
            <div className="flex items-center">
              <h2 className="text-2xl font-bold">Projects</h2>
            </div>

            <p className="mt-1 text-sm text-gray-500">All Projects</p>
          </div>
          <Button className="btn-primary h-10 w-40 items-center justify-center">
            <Plus />
            <Link href="/projects/new">Create Project</Link>
          </Button>
        </div>
        {/* 
        <Projects /> */}

        <LogoutButton />
      </div>
    </div>
  );
}
