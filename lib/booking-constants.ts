/**
 * Calendar and booking configuration constants
 */

export const DAYS_OF_WEEK = [
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
  "Sun",
] as const;

export const CALENDAR_CONFIG = {
  // Grid layout
  GRID_COLS_MOBILE: "grid-cols-1",
  GRID_COLS_DESKTOP: "grid-cols-3",
  CALENDAR_COLS: "grid-cols-7",
  GAP: "gap-6",

  // Sizing
  SIDEBAR_MAX_HEIGHT: 320,
  CARD_PADDING: "p-4",
  BUTTON_PADDING: "p-3",
  BUTTON_PADDING_SMALL: "p-2",

  // Border radius
  BORDER_RADIUS_SM: "rounded-lg",
  BORDER_RADIUS_MD: "rounded-xl",

  // Status colors
  AVAILABLE: {
    bg: "bg-green-100",
    text: "text-green-700",
    border: "border-green-300",
  },
  UNAVAILABLE: {
    bg: "bg-red-100",
    text: "text-red-700",
    border: "border-red-300",
  },
  SELECTED: {
    ring: "ring-2 ring-black",
  },
  BOOKED: {
    opacity: "opacity-30",
  },

  // Hover effects
  HOVER_SCALE: "hover:scale-[1.02]",
} as const;

export const VALIDATION = {
  HOUR_MIN: 0,
  HOUR_MAX: 23,
  DAY_MIN: 1,
  DAY_MAX: 7,
} as const;

export const ERROR_MESSAGES = {
  INVALID_HOUR: "Invalid hour. Must be between 0 and 23.",
  DOCTOR_NOT_FOUND: "Doctor not found.",
  UNAVAILABLE_SLOT: "Doctor is not available at this time.",
  BOOKING_FAILED: "Failed to create booking. Please try again.",
} as const;
