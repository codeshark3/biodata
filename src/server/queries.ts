import "server-only";
import { db } from "./db";
// import { auth } from "@clerk/nextjs/server";
import { projects } from "./db/schema";
import { and, eq } from "drizzle-orm";
import { redirect } from "next/navigation";
// import analyticsServerClient from "./analytics";

export async function getProjects() {
  // const user = auth();

  // if (!user.userId) throw new Error("Unauthorized");

  const projects = await db.query.projects.findMany({
    // where: (model, { eq }) => eq(model.userId, user.userId),
    orderBy: (model, { desc }) => desc(model.id),
  });
  console.log(projects);
  return projects;
}

export async function getProject(id: number) {
  // const user = auth();
  // if (!user.userId) throw new Error("Unauthorized");

  const project = await db.query.projects.findFirst({
    where: (model, { eq }) => eq(model.id, id),
  });
  if (!project) throw new Error("Image not found");

  // if (project.userId !== user.userId) throw new Error("Unauthorized");

  return project;
}

export async function deleteProject(id: number) {
  // const user = auth();
  // if (!user.userId) throw new Error("Unauthorized");

  // await db
  //   .delete(projects)
  //   .where(and(eq(projects.id, id), eq(projects.userId, user.userId)));

  // analyticsServerClient.capture({
  //   distinctId: user.userId,
  //   event: "delete project",
  //   properties: {
  //     imageId: id,
  //   },
  // });

  redirect("/");
}
