"use server";

import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export const logout = async () => {
  await auth.api.signOut();
  redirect("/auth/login");
};
