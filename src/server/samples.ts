// import "server-only";
"use server";
import { db } from "./db";
// import { auth } from "@clerk/nextjs/server";
import { samples } from "./db/schema";
import { and, eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { SampleSchema } from "~/schemas/index";
import type * as z from "zod";
// import analyticsServerClient from "./analytics";

class CustomError extends Error {
  constructor(message: string) {
    super(message);

    this.name = "CustomError";
  }
}

export async function addSample(values: z.infer<typeof SampleSchema>) {
  const validatedFields = SampleSchema.safeParse(values);
  if (!validatedFields.success) {
    return {
      error: "Invalid Fields!",
    };
  }
  console.log("validatedFields:", validatedFields.data);

  const { sample_id, gender, sample_type, source, location } =
    validatedFields.data;

  try {
    await db.insert(samples).values({
      // id: userId, // Uncomment and adjust if you need to include the userId
      sample_id,
      gender,
      sample_type,
      source,
      location,
    });
    return { success: "Sample added" };
  } catch (error: any) {
    return { error: error?.message };
  }
}
export async function addSamples(jsonData: z.infer<typeof SampleSchema>[]) {
  //console.log("jsonData", jsonData);
  // const user = auth();
  // if (!user.userId) throw new Error("Unauthorized");
  try {
    // {
    // const results = await Promise.all(
    //   jsonData.map(async (sample: jsonData) => {
    //     const sample_data = await db.insert(samples).values({
    //       // id: userId, // Uncomment and adjust if you need to include the userId
    //       sample_id: sample.sample_id,
    //       gender: sample.gender,
    //       sample_type: sample.sample_type,
    //       source: sample.source,
    //       location: sample.location,
    //     });
    //     console.log("sample_id", sample_data);
    //     return sample_data;
    //   }),
    // );
    // return { success: "Samples added", results };
    jsonData.map(async (sample) => {
      await db.insert(samples).values({
        // id: userId,
        sample_id: sample.sample_id,
        gender: sample.gender,
        sample_type: sample.sample_type,
        source: sample.source,
        location: sample.location,
      });
      //   console.log("sample_id", sample_id);
    });
    return { success: "Sample added" };
    // }
    // await db.insert(samples).values({
    //   // id: userId,
    //   sample_id,
    //   gender,
    //   sample_type,
    //   source,
    //   location,
    // });
  } catch (error: any) {
    return { error: error?.message };
  }
  // if (sample.userId !== user.userId) throw new Error("Unauthorized");
}

export async function getSamples() {
  // const user = auth();

  // if (!user.userId) throw new Error("Unauthorized");

  const samples = await db.query.samples.findMany({
    // where: (model, { eq }) => eq(model.userId, user.userId),
    orderBy: (model, { desc }) => desc(model.id),
  });

  return samples;
}

export async function getSample(id: number) {
  // const user = auth();
  // if (!user.userId) throw new Error("Unauthorized");

  const sample = await db.query.samples.findFirst({
    where: (model, { eq }) => eq(model.id, id),
  });
  if (!sample) throw new Error("Image not found");

  // if (sample.userId !== user.userId) throw new Error("Unauthorized");

  return sample;
}

export async function deleteSample(id: number) {
  // const user = auth();
  // if (!user.userId) throw new Error("Unauthorized");
  await db.delete(samples).where(and(eq(samples.id, id)));
  redirect("/");
}
