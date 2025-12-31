"use server";

import z from "zod";

const loginSchema = z.object({
  email: z.email("invalid email"),
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
};
