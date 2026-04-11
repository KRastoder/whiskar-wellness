"use server";

import db from "@/db";
import { toy } from "@/db/schemas/toys-schema";

export const fetchAllToys = async () => {
  try {
    const res = await db.select().from(toy);
    return res;
  } catch (e) {
    console.error("failed to fetch all toys", e);
    return [];
  }
};
