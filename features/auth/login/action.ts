"use server";

import { auth } from "@/lib/auth";
import z from "zod";

const loginSchema = z.object({
  email: z.string().min(1, "email is required"),
  password: z.string().min(1, "password is required"),
});

export const loginAction = async (_: any, formData: FormData) => {
  const validation = loginSchema.safeParse(Object.fromEntries(formData));

  if (!validation.success) {
    const err = validation.error;
    return {
      validationErrors: z.treeifyError(err).properties,
    };
  }

  const { email, password } = validation.data;

  try {
    await auth.api.signInEmail({
      body: {
        email,
        password,
      },
    });
    return {
      success: true,
    };
  } catch (err: unknown) {
    const error = err as any;
    console.log(error);
    if (error.body) {
      console.log(error.body);
      return {
        error: error.body.message,
        success: false,
      };
    }
    return {
      error: "something went wrong",
      success: false,
    };
  }
};
