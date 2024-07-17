import { number, z } from "zod";

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

// interface FormData {
//   password: string;
//   confirm_password: string;
// }
export const RegisterSchema = z
  .object({
    name: z.string().min(1, { message: "Name is required" }),
    email: z.string().email({
      message: "Email is required ",
    }),
    password: z.string().min(6, {
      message: "Minimum password length is 6",
    }),
    confirm_password: z.string().min(6, {
      message: "Minimum password length is 6",
    }),
  })
  .refine((val) => val.password === val.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  });

export const ProjectSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  principal_investigator: z.string().min(1, { message: "P,I nameis required" }),
  date_of_registration: z.string().date(),
  institution: z.string().min(1, { message: "Institution is required" }),
  department: z.string().min(1, { message: "Department is required" }),
  contact_no: z.string().max(13, { message: "Contact number is required" }),
  email: z.string().email({ message: "Email is required" }),
  name_irb: z.string().min(1, { message: "IRB name is required" }),
  irb_approval_no: z
    .string()
    .min(1, { message: "IRB approval number is required" }),
  approval_date: z.string().date(),
  expiry_date: z.string().date(),
  consent_forms: z.boolean({ message: "Consent forms is required" }),
  consent_for_storage: z.boolean({
    message: "Consent for storage is required",
  }),

  urine: z.boolean(),
  no_urine: z.coerce.number(),
  no_stool: z.coerce.number(),

  stool: z.boolean(),
  whole_blood: z.boolean(),
  no_whole_blood: z.coerce.number(),
  serum: z.boolean(),
  no_serum: z.coerce.number(),
  plasma: z.boolean(),
  no_plasma: z.coerce.number(),
  skin_snip: z.boolean(),
  no_skin_snip: z.coerce.number(),
  dna: z.boolean(),
  no_dna: z.coerce.number(),
  rna: z.boolean(),
  no_rna: z.coerce.number(),
  others: z.string(),
  no_others: z.coerce.number(),
  storage_requirements: z.string(),
  number_of_samples: z.coerce.number(),
  start_date: z.string().date(),
  end_date: z.string().date(),
});

export const SampleSchema = z.object({
  sample_id: z.string().min(1, { message: "Sample id is required" }),
  gender: z.string().min(1, { message: "Gender is required" }),
  sample_type: z.string().min(1, { message: "Sample type is required" }),
  source: z.string().min(1, { message: "Source is required" }),
  location: z.string().min(1, { message: "Location is required" }),
});
