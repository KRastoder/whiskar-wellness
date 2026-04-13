"use server";

import db from "@/db";
import { doctorBooking, doctorAvailability } from "@/db/schemas/doctor-schema";
import { and, eq, gte, lt } from "drizzle-orm";
import {
  getDayOfWeek,
  toDateString,
  isValidHour,
  parseDate,
} from "@/lib/date-utils";
import { ERROR_MESSAGES } from "@/lib/booking-constants";
import type { BookingRequest, Booking, TimeSlot } from "@/lib/booking-types";

/* ================= CREATE BOOKING ================= */

/**
 * Create a new doctor booking with validation
 * @throws Error if validation fails or booking cannot be created
 */
export const createBooking = async (
  bookingData: BookingRequest,
): Promise<{ success: boolean; error?: string }> => {
  const { doctorId, userId, date, hour, price } = bookingData;

  // Validate hour
  if (!isValidHour(hour)) {
    return { success: false, error: ERROR_MESSAGES.INVALID_HOUR };
  }

  // Parse and format date
  try {
    const parsedDate = parseDate(date);
    const dayOfWeek = getDayOfWeek(parsedDate);
    const formattedDate = toDateString(parsedDate);

    // Check availability for this day of week
    const availableSlots = await getAvailableSlotsForDay(doctorId, dayOfWeek);

    if (availableSlots.length === 0) {
      return { success: false, error: ERROR_MESSAGES.UNAVAILABLE_SLOT };
    }

    // Check if requested hour falls within any available slot
    const isAvailable = availableSlots.some(
      (slot) => hour >= slot.startHour && hour < slot.endHour,
    );

    if (!isAvailable) {
      return { success: false, error: ERROR_MESSAGES.UNAVAILABLE_SLOT };
    }

    // Check if slot is already booked
    const existingBooking = await getBookingForSlot(
      doctorId,
      formattedDate,
      hour,
    );

    if (existingBooking) {
      return { success: false, error: "This slot is already booked." };
    }

    // Create the booking
    await db.insert(doctorBooking).values({
      doctorId,
      userId,
      date: formattedDate,
      hour,
      price,
    });

    return { success: true };
  } catch (error) {
    console.error("Booking creation error:", error);
    return { success: false, error: ERROR_MESSAGES.BOOKING_FAILED };
  }
};

/* ================= GET BOOKINGS ================= */

/**
 * Get all bookings for a doctor within a date range
 */
export const getDoctorBookings = async (
  doctorId: string,
  from: Date,
  to: Date,
): Promise<Booking[]> => {
  const fromStr = toDateString(from);
  const toStr = toDateString(to);

  return await db
    .select()
    .from(doctorBooking)
    .where(
      and(
        eq(doctorBooking.doctorId, doctorId),
        gte(doctorBooking.date, fromStr),
        lt(doctorBooking.date, toStr),
      ),
    );
};

/* ================= GET AVAILABILITY ================= */

/**
 * Get all availability slots for a doctor
 */
export const getDoctorAvailability = async (
  doctorId: string,
): Promise<TimeSlot[]> => {
  return await db
    .select()
    .from(doctorAvailability)
    .where(eq(doctorAvailability.doctorId, doctorId));
};

/* ================= HELPER FUNCTIONS ================= */

/**
 * Get available time slots for a specific day of week
 */
async function getAvailableSlotsForDay(
  doctorId: string,
  dayOfWeek: number,
): Promise<TimeSlot[]> {
  return await db
    .select()
    .from(doctorAvailability)
    .where(
      and(
        eq(doctorAvailability.doctorId, doctorId),
        eq(doctorAvailability.dayOfWeek, dayOfWeek),
      ),
    );
}

/**
 * Check if a specific slot is already booked
 */
async function getBookingForSlot(
  doctorId: string,
  date: string,
  hour: number,
): Promise<Booking | undefined> {
  const result = await db
    .select()
    .from(doctorBooking)
    .where(
      and(
        eq(doctorBooking.doctorId, doctorId),
        eq(doctorBooking.date, date),
        eq(doctorBooking.hour, hour),
      ),
    )
    .limit(1);

  return result[0];
}
