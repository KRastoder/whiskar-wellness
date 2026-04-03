"use server";

import db from "@/db";
import { user } from "@/db/schemas/auth-schema";
import { doctor } from "@/db/schemas/doctor-schema";
import { like, eq } from "drizzle-orm";
import type { Specialty } from "@/actions/doctors/doctor-fetch-actions";

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
export const searchDoctorsBySpeciality = async ({
  specialty,
}: {
  specialty: Specialty;
}) => {
  try {
    const res = await db
      .select({
        id: doctor.id,
        specialty: doctor.specialty,
        name: user.name,
        image: user.image,
        price: doctor.price,
        city: doctor.city,
        country: doctor.country,
      })
      .from(doctor)
      .innerJoin(user, eq(doctor.id, user.id))
      .where(eq(doctor.specialty, specialty));

    return res; // always array
  } catch (e) {
    console.error(e);
    return []; // fallback
  }
};
