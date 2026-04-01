"use server";

import { auth } from "@/lib/auth";

export async function signUpAction(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  await auth.api.signUpEmail({
    body: {
      email,
      password,
      name: formData.get("name") as string,
      username: formData.get("username") as string,
    },
  });

  return { success: true };
}
