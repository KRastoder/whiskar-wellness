"use server";

import { auth } from "@/lib/auth";

export async function signUpAction(formData: FormData) {
  //TODO REFACTOR LATER
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
export async function signInAction(formData: FormData) {
  //TODO REFACTOR LATER
  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    await auth.api.signInEmail({
      body: {
        email,
        password,
      },
    });
  } catch (e) {
    console.error("Sign in error", e);
    return { error: "Sign in failed" };
  }
}
