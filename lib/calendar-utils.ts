/**
 * Calendar and availability logic
 * Extracted from component to enable testing and reuse
 */

import { getDayOfWeek, getHoursInSlot, isHourInSlot } from "./date-utils";
import type {
  TimeSlot,
  Booking,
  HourSlot,
  DayState,
  CalendarDay,
} from "./booking-types";

/**
 * Generate calendar days for current month
 * Returns array with null values for days before month starts
 */
export const generateCalendarDays = (
  date: Date = new Date(),
): CalendarDay[] => {
  const year = date.getFullYear();
  const month = date.getMonth();

  const monthStart = new Date(year, month, 1);
  const monthEnd = new Date(year, month + 1, 0);

  // Number of empty cells before month starts
  const offset = (monthStart.getDay() || 7) - 1;

  // Fill with nulls for offset, then actual dates
  const days: CalendarDay[] = Array(offset).fill(null);

  for (let i = 1; i <= monthEnd.getDate(); i++) {
    days.push(new Date(year, month, i));
  }

  return days;
};

/**
 * Create a booked slots map for efficient lookup
 * Map<date, Set<hour>>
 */
export const createBookedMap = (
  bookings: Booking[],
): Map<string, Set<number>> => {
  const map = new Map<string, Set<number>>();

  for (const booking of bookings) {
    if (!map.has(booking.date)) {
      map.set(booking.date, new Set());
    }
    map.get(booking.date)!.add(booking.hour);
  }

  return map;
};

/**
 * Get available slots for a specific day of week
 */
export const getSlotsForDayOfWeek = (
  availability: TimeSlot[],
  dayOfWeek: number,
): TimeSlot[] => {
  return availability.filter((slot) => slot.dayOfWeek === dayOfWeek);
};

/**
 * Calculate day state (available/booked status)
 */
export const calculateDayState = (
  date: Date,
  availability: TimeSlot[],
  bookedMap: Map<string, Set<number>>,
): DayState => {
  const dateStr = date.toISOString().split("T")[0];
  const dayOfWeek = getDayOfWeek(date);
  const slots = getSlotsForDayOfWeek(availability, dayOfWeek);
  const bookedSet = bookedMap.get(dateStr) ?? new Set<number>();

  let totalSlots = 0;
  let bookedSlots = 0;

  for (const slot of slots) {
    const hoursInSlot = getHoursInSlot(slot.startHour, slot.endHour);
    totalSlots += hoursInSlot.length;
    bookedSlots += hoursInSlot.filter((h) => bookedSet.has(h)).length;
  }

  return {
    dateStr,
    available: slots.length > 0 && bookedSlots < totalSlots,
    slots,
    bookedSet,
    total: totalSlots,
    taken: bookedSlots,
  };
};

/**
 * Get available hour slots for a specific date
 */
export const getAvailableHours = (
  dateStr: string,
  availability: TimeSlot[],
  bookedMap: Map<string, Set<number>>,
): HourSlot[] => {
  const date = new Date(dateStr);
  const dayOfWeek = getDayOfWeek(date);
  const slots = getSlotsForDayOfWeek(availability, dayOfWeek);
  const bookedSet = bookedMap.get(dateStr) ?? new Set<number>();

  return slots.flatMap((slot) =>
    getHoursInSlot(slot.startHour, slot.endHour).map((hour) => ({
      hour,
      booked: bookedSet.has(hour),
    })),
  );
};

/**
 * Get statistics about a day's booking status
 */
export const getDayBookingStats = (
  dayState: DayState,
): { available: number; booked: number; percentage: number } => {
  const available = dayState.total - dayState.taken;
  const percentage =
    dayState.total > 0 ? (dayState.taken / dayState.total) * 100 : 0;

  return {
    available,
    booked: dayState.taken,
    percentage,
  };
};
