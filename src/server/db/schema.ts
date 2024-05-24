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

export const projects = createTable(
  "project",
  {
    id: serial("id").primaryKey(),
    project_id: varchar("project_id", { length: 256 }),
    name: varchar("name", { length: 256 }),
    start_date: timestamp("start_date"),
    end_date: timestamp("end_date"),
    description: varchar("description", { length: 256 }),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt"),
  },
  (value) => ({
    nameIndex: index("project_name_idx").on(value.name),
  }),
);

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
