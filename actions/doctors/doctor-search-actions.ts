"use server";

import db from "@/db";
import { user } from "@/db/schemas/auth-schema";
import { doctor } from "@/db/schemas/doctor-schema";
import { eq } from "drizzle-orm";

export const searchDoctors = async ({ search }: { search: string }) => {
  try {
    const res = await db
      .select()
      .from(doctor)
      .innerJoin(user, eq(doctor.id, user.id))
      .where(eq(user.name, search));

    if (!res) {
      return { error: "Search failed" };
    }

    return res;
  } catch (e) {
    console.error("Doctor-search action error search doctors funciton", e);
    return { error: "Search failed" };
  }
};
