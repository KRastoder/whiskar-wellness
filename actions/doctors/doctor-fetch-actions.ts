"use server";

import db from "@/db";
import { user } from "@/db/schemas/auth-schema";
import { doctor } from "@/db/schemas/doctor-schema";
import { eq } from "drizzle-orm";

export type Specialty = (typeof doctor.specialty.enumValues)[number];

export const fetchAllDoctors = async () => {
  try {
    const res = await db
      .select({
        id: doctor.id,
        name: user.name,
        email: user.email,
        image: user.image, // TODO ADD IMAGE UPLOAD BUT ONLY FOR DOCTORS NOT USERS
        specialty: doctor.specialty,
        price: doctor.price,
        experience: doctor.experience,
        country: doctor.country,
        city: doctor.city,
        address: doctor.adress,
        rating: doctor.rating,
      })
      .from(doctor)
      .innerJoin(user, eq(doctor.id, user.id));

    return res;
  } catch (e) {
    console.error("Fetch failed", e);
    return [];
  }
};

export const fetchDoctorsBySpecialty = async (specialty: Specialty) => {
  try {
    const res = await db
      .select({
        id: doctor.id,
        name: user.name,
        specialty: doctor.specialty,
        adress: doctor.adress,
        city: doctor.city,
        price: doctor.price,
      })
      .from(doctor)
      .innerJoin(user, eq(doctor.id, user.id))
      .where(eq(doctor.specialty, specialty));

    return res;
  } catch (e) {
    console.error("Fetch by specialty failed", e);
    return [];
  }
};
