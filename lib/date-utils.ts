/**
 * Date and time utilities for booking system
 * Centralizes date handling to prevent inconsistencies
 */

/**
 * Convert Date to ISO string format (YYYY-MM-DD)
 */
export const toDateString = (date: Date): string => {
  return date.toISOString().split("T")[0];
};

/**
 * Parse ISO date string to Date object
 */
export const parseDate = (dateString: string): Date => {
  return new Date(dateString);
};

/**
 * Get day of week (1-7, where 1=Monday, 7=Sunday)
 * JavaScript's getDay() returns 0-6 (0=Sunday), so we convert it
 */
export const getDayOfWeek = (date: Date): number => {
  const jsDay = date.getDay();
  return jsDay === 0 ? 7 : jsDay;
};

/**
 * Get the first day of the current month
 */
export const getMonthStart = (date: Date): Date => {
  return new Date(date.getFullYear(), date.getMonth(), 1);
};

/**
 * Get the last day of the current month
 */
export const getMonthEnd = (date: Date): Date => {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
};

/**
 * Validate if hour is within valid range (0-23)
 */
export const isValidHour = (hour: number): boolean => {
  return Number.isInteger(hour) && hour >= 0 && hour <= 23;
};

/**
 * Check if a given hour falls within a time slot
 */
export const isHourInSlot = (
  hour: number,
  slotStart: number,
  slotEnd: number,
): boolean => {
  return hour >= slotStart && hour < slotEnd;
};

/**
 * Generate array of hours for a given slot
 */
export const getHoursInSlot = (
  startHour: number,
  endHour: number,
): number[] => {
  return Array.from({ length: endHour - startHour }, (_, i) => startHour + i);
};
