/**
 * Type definitions for doctor booking system
 * All types are fully typed - no 'any' usage
 */

export type TimeSlot = {
  id: string;
  doctorId: string;
  dayOfWeek: number; // 1-7, where 1=Monday, 7=Sunday
  startHour: number;
  endHour: number;
};

export type Booking = {
  id: string;
  doctorId: string;
  userId: string;
  date: string; // ISO format YYYY-MM-DD
  hour: number;
  price: number;
  createdAt?: Date;
};

export type DoctorInfo = {
  id: string;
  name: string;
  price: number;
  specialty?: string;
  experience?: number;
  rating?: number | null;
};

export type BookingRequest = {
  doctorId: string;
  userId: string;
  date: string; // ISO format YYYY-MM-DD
  hour: number;
  price: number;
};

export type BookingResponse = {
  success: boolean;
  error?: string;
};

export type HourSlot = {
  hour: number;
  booked: boolean;
};

export type DayState = {
  dateStr: string;
  available: boolean;
  slots: TimeSlot[];
  bookedSet: Set<number>;
  total: number;
  taken: number;
};

export type CalendarDay = Date | null;

export type BookingCalendarProps = {
  doctorId: string;
  userId: string;
  price: number;
  availability: TimeSlot[];
  bookings?: Booking[];
};

export type BookingUIState = "selecting" | "loading" | "success" | "error";

export type SuccessBookingData = {
  date: string;
  hour: number;
};
