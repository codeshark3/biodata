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
} from "drizzle-orm/pg-core";

import { start } from "repl";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `biodata_${name}`);

export const posts = createTable(
  "post",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 256 }),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt"),
  },
  (example) => ({
    nameIndex: index("name_idx").on(example.name),
  }),
);

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

export const UserRole = pgEnum("UserRole", ["ADMIN", "BASIC"]);

export const users = createTable(
  "user",
  {
    id: serial("id").primaryKey(),

    name: varchar("name", { length: 256 }),
    email: varchar("email", { length: 256 }),
    role: UserRole("userRole").default("BASIC"),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt"),
  },
  (value) => ({
    emailIndex: index("user_email_idx").on(value.email),
  }),
);
