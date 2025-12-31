"use server";

import { auth } from "@/lib/auth";
import z from "zod";

const schema = z.object({
  fullname: z.string().min(3, { error: "Be at least 3 characters long" }),
  username: z.string().min(3, { error: "Be at least 3 characters long" }),
  email: z.email("Invalid email"),
  password: z
    .string()
    .min(8, { error: "Be at least 8 characters long" })
    .regex(/[a-zA-Z]/, { error: "Contain at least one letter." })
    .regex(/[0-9]/, { error: "Contain at least one number." })
    .regex(/[^a-zA-Z0-9]/, {
      error: "Contain at least one special character.",
    })
    .trim(),
});

export const signupAction = async (_: any, formData: FormData) => {
  const validation = schema.safeParse(Object.fromEntries(formData));
  if (!validation.success) {
    const err = validation.error;
    return {
      validationErrors: z.treeifyError(err).properties,
    };
  }
  const { fullname, username, email, password } = validation.data;
  await auth.api.signUpEmail({
    body: {
      name: fullname,
      email,
      password,
      username,
    },
  });
  return {
    message: "Check your email for verification",
  };
};
