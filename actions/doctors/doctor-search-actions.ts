"use server";

import db from "@/db";
import { user } from "@/db/schemas/auth-schema";
import { doctor } from "@/db/schemas/doctor-schema";
import { like, eq } from "drizzle-orm";

export const searchDoctors = async ({ search }: { search: string }) => {
  try {
    const res = await db
      .select({
        id: doctor.id,
        specialty: doctor.specialty,
        name: user.name,
      })
      .from(doctor)
      .innerJoin(user, eq(doctor.id, user.id))
      .where(like(user.name, `%${search}%`));

    if (res.length === 0) {
      return { error: "No doctors found" };
    }

    return res;
  } catch (e) {
    console.error("Doctor-search action error", e);
    return { error: "Search failed" };
  }
};
