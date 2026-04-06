"use server";

import db from "@/db";
import { user } from "@/db/schemas/auth-schema";

export const fetchAllUsers = async () => {
  try {
    const res = await db
      .select({
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        emailVerified: user.emailVerified,
        banned: user.banned,
      })
      .from(user);

    return res;
  } catch (e) {
    console.error("Failed to fetch users", e);
    return [];
  }
};
