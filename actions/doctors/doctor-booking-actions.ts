"use server";

import db from "@/db";
import { doctorBooking, doctorAvailability } from "@/db/schemas/doctor-schema";
import { CreateBookingInput } from "@/types/doctorTypes";
import { and, eq, gte, lte } from "drizzle-orm";

export const createBooking = async ({
  bookingData,
}: {
  bookingData: CreateBookingInput;
}) => {
  const { doctorId, userId, date, hour, price } = bookingData;

  if (hour < 0 || hour > 23) {
    throw new Error("Invalid hour");
  }

  if (price < 0) {
    throw new Error("Invalid price");
  }

  const jsDay = new Date(date).getDay();
  const dayOfWeek = jsDay === 0 ? 7 : jsDay;

  const availability = await db
    .select()
    .from(doctorAvailability)
    .where(
      and(
        eq(doctorAvailability.doctorId, doctorId),
        eq(doctorAvailability.dayOfWeek, dayOfWeek),
        lte(doctorAvailability.startHour, hour),
        gte(doctorAvailability.endHour, hour),
      ),
    )
    .limit(1);

  if (!availability) {
    throw new Error("Doctor is not available at this time");
  }
  const formattedDate = new Date(date).toISOString().split("T")[0];

  const res = await db
    .insert(doctorBooking)
    .values({
      doctorId,
      userId,
      date: formattedDate,
      hour,
      price,
    })
    .returning();

  return res[0];
};
