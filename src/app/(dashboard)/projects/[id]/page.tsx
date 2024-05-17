
import ProjectDetails from "~/components/ProjectDetails";
import { useParams } from "next/navigation";
import { getProject } from "~/server/projects_queries";
import { Button } from "~/components/ui/button";
import Link from "next/link";
import { TitleContainer } from "~/components/TitleContainer";
interface Props {
  params: {
    id: number;
    name: string;
  };
}


const  projectDetailsPage = async  ({params:{id}}: Props) => {
 
  const idAsNumber = Number(id);
  if (Number.isNaN(idAsNumber)) throw new Error("Invalid photo id")
 
 
 const project = await getProject(idAsNumber);
     
  return ( <div className="h-full w-full   ">
  <div>
    <div className="flex items-center justify-between  px-4">
      <TitleContainer title="Project" subtitle={project.name as string} />
      <Button className="btn-primary h-10 w-40">
        <Link href="/admin/users/new">Add New User</Link>
      </Button>
    </div>
    <div className="flex flex-col gap-4">
    
    </div>
  </div>
</div>
  )
};

export default projectDetailsPage;
