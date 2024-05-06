//import "server-only";
"use server";
import * as z from "zod";
import bcrypt from "bcrypt";
import { LoginSchema } from "~/schemas/index";
import { RegisterSchema } from "~/schemas/index";
import { db } from "~/server/db";
import { and, eq } from "drizzle-orm";
import { users } from "~/server/db/schema";
import { get } from "http";
import { getUserByEmail } from "~/server/data/user";
export async function login(values: z.infer<typeof LoginSchema>) {
  const validatedFields = LoginSchema.safeParse(values);
  if (!validatedFields.success) {
    return {
      error: "Invalid Fields!",
    };
  }

  return { success: "Login Successful" };
}

export async function register(values: z.infer<typeof LoginSchema>) {
  const validatedFields = RegisterSchema.safeParse(values);
  if (!validatedFields.success) {
    return {
      error: "Invalid Fields!",
    };
  }
  const { email, password, name } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "User already exists!" };
  }
  await db.insert(users).values({
    email,
    password: hashedPassword,
    name,
  });

  // send verification token email to user
  return { success: "Registration Successful" };
}
