import { z } from "zod";

export const LoginSchema = z.object({
  //   name: z.string().min(1),
  email: z.string().email({
    message: "Email is required ",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
  // password: z.string().min(6),
});
