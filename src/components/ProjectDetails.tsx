"use client";

import { useParams } from "next/navigation";
import { getProject } from "~/server/projects_queries";

interface ProjectProps {
  id: string;
  projectId: string;
  name: string;
  description: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}
export default  function ProjectDetails({id}:ProjectProps) {
 
  //  const idAsNumber = Number(projectId);
  // if (Number.isNaN(idAsNumber)) throw new Error("Invalid photo id")
  // // const { id} = useParams();

  // const projectId = typeof id === "string" ? parseInt(id) : id;
//   //console.log(projectId);
  //  const project = await getProject(idAsNumber);
  //  console.log(project);
  return <div>ProjectDetails {id}</div>;
}
