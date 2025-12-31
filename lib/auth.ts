import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import db from "./drizzle/db";
import { sendEmail } from "./mailer";
import { eq } from "drizzle-orm";
import { user as userTable } from "./drizzle/schema";
import { cache } from "react";
import { headers } from "next/headers";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    autoSignIn: false,
  },
  emailVerification: {
    async sendVerificationEmail({ user, url }) {
      void sendEmail({
        to: user.email,
        subject: "Verify your email",
        html: `<p>Click <a href="${url}">here</a> to verify your email</p>`,
      });
    },
    sendOnSignUp: true,
    async afterEmailVerification(user) {
      await db
        .update(userTable)
        .set({ verifiedAt: new Date() })
        .where(eq(userTable.id, user.id));
    },
    autoSignInAfterVerification: true,
  },
  user: {
    additionalFields: {
      username: {
        type: "string",
        required: true,
        input: true,
      },
    },
  },
});

export type Session = typeof auth.$Infer.Session;

export const getServerSideSession = cache(async () => {
  const h = await headers();
  const sess = await auth.api.getSession({
    headers: h,
  });
  return sess;
});
