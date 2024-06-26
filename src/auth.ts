// import NextAuth from "next-auth";

// import Google from "next-auth/providers/google";
// import { DrizzleAdapter } from "@auth/drizzle-adapter";
// import { db } from "~/server/db/index";

// export const { handlers, signIn, signOut, auth } = NextAuth({
//   providers: [Google],
//   adapter: DrizzleAdapter(db),
//   session: {
//     strategy: "jwt",
//   },
// });

import { cache } from "react";
import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle";
import { Lucia } from "lucia";

import {
  roleEnums,
  sessionTable,
  userTable,
  type User as DbUser,
} from "~/server/db/schema";
import { db } from "~/server/db";

import { cookies } from "next/headers";

export const adapter = new DrizzlePostgreSQLAdapter(
  db,
  sessionTable,
  userTable,
);

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    expires: false,
    attributes: {
      secure: process.env.NODE_ENV === "production",
    },
  },
  getUserAttributes: (attributes) => {
    return {
      // attributes has the type of DatabaseUserAttributes
      id: attributes.id,
      name: attributes.name,
      role: attributes.role,
    };
  },
});

export const validateRequest = cache(async () => {
  const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
  if (!sessionId)
    return {
      user: null,
      session: null,
    };
  const { user, session } = await lucia.validateSession(sessionId);
  try {
    if (session && session.fresh) {
      const sessionCookie = lucia.createSessionCookie(session.id);
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes,
      );
    }
    if (!session) {
      const sessionCookie = lucia.createBlankSessionCookie();
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes,
      );
    }
  } catch {
    // Next.js throws error when attempting to set cookies when rendering page
  }
  return { user, session };
});

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: DatabaseUserAttributes;
  }
}

interface DatabaseUserAttributes {
  id: string;
  name: string;
  role: (typeof roleEnums.enumValues)[number];
}
