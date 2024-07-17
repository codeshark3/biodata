// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import {
  index,
  pgEnum,
  pgTableCreator,
  serial,
  timestamp,
  varchar,
  date,
  boolean,
  numeric,
  pgTable,
  text,
  primaryKey,
  integer,
} from "drizzle-orm/pg-core";
// import type { AdapterAccount } from "@auth/core/adapters";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `biodata_${name}`);

export const roleEnums = pgEnum("role", ["user", "admin"]);

export const userTable = createTable("user", {
  // id: text("id").primaryKey(),
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
  role: roleEnums("role").notNull().default("user"),
});

export const sessionTable = createTable("session", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => userTable.id),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
});
export type User = typeof userTable.$inferSelect;
export type NewUser = typeof userTable.$inferInsert;

// export const users = createTable("user", {
//   id: text("id")
//     .primaryKey()
//     .$defaultFn(() => crypto.randomUUID()),
//   name: text("name"),
//   email: text("email").notNull(),
//   password: text("password").notNull(),
//   emailVerified: timestamp("emailVerified", { mode: "date" }),
//   image: text("image"),
// });

///////////////// Project Table //////////////////
export const projects = createTable(
  "project",
  {
    id: serial("id").primaryKey(),
    title: varchar("title", { length: 255 }),
    principal_investigator: varchar("principal_investigator", {
      length: 255,
    }),
    date_of_registration: date("date_of_registration"),
    institution: varchar("institution", { length: 255 }),
    department: varchar("department", { length: 255 }),
    contact_no: varchar("contact_no", { length: 13 }),
    email: varchar("email", { length: 255 }),
    name_irb: varchar("name_irb", { length: 255 }),
    irb_approval_no: varchar("irb_approval_no", { length: 255 }),
    approval_date: date("approval_date"),
    storage_requirements: varchar("storage_requirements", { length: 255 }),
    expiry_date: date("expiry_date"),
    consent_forms: boolean("consent_forms"),
    consent_for_storage: boolean("consent_for_storage"),
    urine: boolean("urine"),
    stool: boolean("stool"),
    whole_blood: boolean("whole_blood"),
    serum: boolean("serum"),
    plasma: boolean("plasma"),
    skin_snip: boolean("skin_snip"),
    dna: boolean("dna"),
    rna: boolean("rna"),

    others: varchar("others", { length: 255 }),
    no_urine: integer("no_urine"),
    no_whole_blood: integer("no_whole_blood"),
    no_serum: integer("no_serum"),
    no_plasma: integer("no_plasma"),
    no_skin_snip: integer("no_skin_snip"),
    no_dna: integer("no_dna"),
    no_rna: integer("no_rna"),
    no_others: integer("no_others"),
    start_date: date("start_date"),
    end_date: date("end_date"),
    number_of_samples: integer("number_of_samples"),
    user_id: varchar("user_id", { length: 255 }),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt"),
  },
  // (value) => ({
  //   nameIndex: index("project_name_idx").on(value.),
  // }),
);

/////////////////////// Sample Table ///////////////
export const samples = createTable("sample", {
  id: serial("id").primaryKey(),
  sample_id: varchar("sample_id", { length: 20 }),
  gender: varchar("gender", { length: 50 }),
  sample_type: varchar("sample_type", { length: 50 }),
  source: varchar("description", { length: 256 }),
  location: varchar("location", { length: 256 }),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updatedAt"),
});

// export const UserRole = pgEnum("UserRole", ["ADMIN", "BASIC"]);

// export const users = createTable(
//   "user",
//   {
//     id: serial("id").primaryKey(),

//     name: varchar("name", { length: 256 }),
//     email: varchar("email", { length: 256 }),
//     role: UserRole("userRole").default("BASIC"),
//     createdAt: timestamp("created_at")
//       .default(sql`CURRENT_TIMESTAMP`)
//       .notNull(),
//     updatedAt: timestamp("updatedAt"),
//   },
//   (value) => ({
//     emailIndex: index("user_email_idx").on(value.email),
//   }),
// );

// export default adapter;
