// import "server-only";
"use server";
import { db } from "./db";
// import { auth } from "@clerk/nextjs/server";
import { projects } from "./db/schema";
import { and, eq } from "drizzle-orm";
import { ProjectSchema } from "~/schemas/index";
import type * as z from "zod";
import { validateRequest } from "~/auth";
// import { redirect } from "next/navigation";
// import analyticsServerClient from "./analytics";

export async function getProjects() {
  // const user = auth();

  // if (!user.userId) throw new Error("Unauthorized");

  const projects = await db.query.projects.findMany({
    // where: (model, { eq }) => eq(model.userId, user.userId),
    orderBy: (model, { desc }) => desc(model.id),
  });

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
  // redirect("/");
}

export async function addProject(values: z.infer<typeof ProjectSchema>) {
  // const user = auth();
  // if (!user.userId) throw new Error("Unauthorized");
  const { user } = await validateRequest();

  const validatedFields = ProjectSchema.safeParse(values);
  if (!validatedFields.success) {
    return {
      error: "Invalid Fields!",
    };
  }
  console.log("validatedFields:", validatedFields);

  const {
    title,
    principal_investigator,
    date_of_registration,
    institution,
    department,
    contact_no,
    email,
    name_irb,
    irb_approval_no,
    approval_date,
    expiry_date,
    consent_forms,
    consent_for_storage,
    urine,
    stool,
    whole_blood,
    serum,
    plasma,
    skin_snip,
    dna,
    rna,
    others,
    no_urine,
    no_whole_blood,
    no_serum,
    no_plasma,
    no_skin_snip,
    no_dna,
    no_rna,
    no_others,
    storage_requirements,
    number_of_samples,
    start_date,
    end_date,
  } = validatedFields.data;
  try {
    await db.insert(projects).values({
      title,
      principal_investigator,
      date_of_registration,
      institution,
      department,
      contact_no,
      email,
      name_irb,
      irb_approval_no,
      approval_date,
      expiry_date,
      consent_forms,
      consent_for_storage,
      urine,
      stool,
      whole_blood,
      serum,
      plasma,
      skin_snip,
      dna,
      rna,

      others,
      no_urine,
      no_whole_blood,
      no_serum,
      no_plasma,
      no_skin_snip,
      no_dna,
      no_rna,
      no_others,
      storage_requirements,
      number_of_samples,
      start_date,
      end_date,
      user_id: user?.name,
    });

    return { success: "Project added" };
  } catch (error: any) {
    return { error: error?.message };
  }

  // analyticsServerClient.capture({
  //   distinctId: user.userId,
  //   event: "create project",
  //   properties: {
  //     imageId: project.id,
  //   },
  // });
}
