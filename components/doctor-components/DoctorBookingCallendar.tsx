"use client";

import { useMemo, useState, useTransition, useCallback } from "react";
import { useRouter } from "next/navigation";
import { createBooking } from "@/actions/doctors/doctor-booking-actions";
import { Card } from "../retroui/Card";
import { Button } from "../retroui/Button";
import { Text } from "../retroui/Text";
import {
  generateCalendarDays,
  createBookedMap,
  calculateDayState,
  getAvailableHours,
} from "@/lib/calendar-utils";
import { DAYS_OF_WEEK, CALENDAR_CONFIG } from "@/lib/booking-constants";
import { toDateString } from "@/lib/date-utils";
import type {
  BookingCalendarProps,
  DayState,
  HourSlot,
  TimeSlot,
  BookingUIState,
  SuccessBookingData,
} from "@/lib/booking-types";
import {
  Calendar,
  Clock,
  AlertCircle,
  CheckCircle2,
  X,
  Loader2,
  ChevronDown,
} from "lucide-react";

export default function DoctorBookingCalendar({
  doctorId,
  userId,
  price,
  availability,
  bookings = [],
}: BookingCalendarProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedHour, setSelectedHour] = useState<number | null>(null);
  const [bookingState, setBookingState] = useState<BookingState>("selecting");
  const [error, setError] = useState<string | null>(null);
  const [successBooking, setSuccessBooking] = useState<{
    date: string;
    hour: number;
  } | null>(null);

  // Prevent double submissions
  const [submittedBooking, setSubmittedBooking] = useState<{
    date: string;
    hour: number;
  } | null>(null);

  // Memoized data structures
  const calendarDays = useMemo(() => generateCalendarDays(), []);
  const bookedMap = useMemo(() => createBookedMap(bookings), [bookings]);

  const dayStates = useMemo(() => {
    return calendarDays.reduce((acc, day) => {
      if (day) {
        const state = calculateDayState(day, availability, bookedMap);
        acc.set(state.dateStr, state);
      }
      return acc;
    }, new Map<string, DayState>());
  }, [calendarDays, availability, bookedMap]);

  const handleDateSelect = useCallback(
    (dateStr: string) => {
      if (bookingState !== "selecting") return;
      setSelectedDate(dateStr);
      setSelectedHour(null);
      setError(null);
    },
    [bookingState],
  );

  const handleHourSelect = useCallback(
    (hour: number) => {
      if (bookingState !== "selecting") return;
      setSelectedHour(hour);
      setError(null);
    },
    [bookingState],
  );

  const handleBooking = useCallback(async () => {
    if (!selectedDate || selectedHour === null) return;

    // Prevent double booking
    const bookingKey = `${selectedDate}-${selectedHour}`;
    const submittedKey = submittedBooking
      ? `${submittedBooking.date}-${submittedBooking.hour}`
      : null;

    if (bookingKey === submittedKey) {
      return; // Already submitted
    }

    setBookingState("loading");
    setError(null);
    setSubmittedBooking({ date: selectedDate, hour: selectedHour });

    startTransition(async () => {
      try {
        const result = await createBooking({
          doctorId,
          userId,
          date: selectedDate,
          hour: selectedHour,
          price,
        });

        if (result.success) {
          setBookingState("success");
          setSuccessBooking({ date: selectedDate, hour: selectedHour });

          // Refresh after 2 seconds
          setTimeout(() => {
            router.refresh();
          }, 2000);
        } else {
          setBookingState("error");
          setError(result.error || "Failed to book appointment");
          setSubmittedBooking(null);
        }
      } catch (err) {
        setBookingState("error");
        setError("An unexpected error occurred. Please try again.");
        setSubmittedBooking(null);
      }
    });
  }, [
    selectedDate,
    selectedHour,
    submittedBooking,
    doctorId,
    userId,
    price,
    router,
  ]);

  const handleReset = useCallback(() => {
    setSelectedDate(null);
    setSelectedHour(null);
    setBookingState("selecting");
    setError(null);
    setSuccessBooking(null);
    setSubmittedBooking(null);
  }, []);

  // Render success state
  if (bookingState === "success" && successBooking) {
    return <SuccessBookingUI booking={successBooking} price={price} />;
  }

  return (
    <div
      className="w-full max-w-5xl mx-auto"
      role="region"
      aria-label="Doctor appointment booking"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* CALENDAR SECTION */}
        <div className="lg:col-span-2">
          <Card className="p-6 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
            <div className="flex items-center gap-2 mb-6">
              <Calendar className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                Select Date
              </h2>
            </div>

            <CalendarGrid
              days={calendarDays}
              dayStates={dayStates}
              selectedDate={selectedDate}
              onSelectDate={handleDateSelect}
              disabled={bookingState !== "selecting"}
            />
          </Card>
        </div>

        {/* SIDEBAR SECTION */}
        <div className="lg:col-span-1">
          <BookingSidebar
            selectedDate={selectedDate}
            selectedHour={selectedHour}
            availability={availability}
            bookedMap={bookedMap}
            price={price}
            isPending={isPending || bookingState === "loading"}
            error={error}
            bookingState={bookingState}
            onSelectHour={handleHourSelect}
            onBook={handleBooking}
            onReset={handleReset}
          />
        </div>
      </div>
    </div>
  );
}

/* ===================== SUCCESS STATE ===================== */

interface SuccessBookingUIProps {
  booking: SuccessBookingData;
  price: number;
}

function SuccessBookingUI({ booking, price }: SuccessBookingUIProps) {
  const formattedDate = new Date(booking.date).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="w-full max-w-5xl mx-auto">
      <Card className="p-12 text-center bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950">
        <div className="flex justify-center mb-6">
          <div className="relative w-20 h-20 flex items-center justify-center">
            <div className="absolute inset-0 bg-green-200 dark:bg-green-700 rounded-full animate-pulse" />
            <CheckCircle2 className="w-12 h-12 text-green-600 dark:text-green-400 relative z-10" />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-green-900 dark:text-green-100 mb-2">
          Appointment Booked!
        </h1>

        <p className="text-green-700 dark:text-green-300 mb-8 text-lg">
          Your appointment has been confirmed.
        </p>

        <div className="bg-white dark:bg-slate-800 rounded-lg p-6 mb-8 space-y-4">
          <div className="flex items-center justify-between py-3 border-b border-green-200 dark:border-green-800">
            <span className="text-slate-600 dark:text-slate-300 flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Date
            </span>
            <span className="font-semibold text-slate-900 dark:text-white">
              {formattedDate}
            </span>
          </div>

          <div className="flex items-center justify-between py-3 border-b border-green-200 dark:border-green-800">
            <span className="text-slate-600 dark:text-slate-300 flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Time
            </span>
            <span className="font-semibold text-slate-900 dark:text-white">
              {booking.hour}:00 {booking.hour < 12 ? "AM" : "PM"}
            </span>
          </div>

          <div className="flex items-center justify-between py-3">
            <span className="text-slate-600 dark:text-slate-300">Price</span>
            <span className="font-semibold text-slate-900 dark:text-white">
              ${price}
            </span>
          </div>
        </div>

        <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
          A confirmation email has been sent to your inbox. You will be
          redirected shortly.
        </p>

        <div className="flex items-center justify-center gap-2 text-sm text-slate-500 dark:text-slate-400">
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>Refreshing...</span>
        </div>
      </Card>
    </div>
  );
}

/* ===================== CALENDAR GRID ===================== */

interface CalendarGridProps {
  days: (Date | null)[];
  dayStates: Map<string, DayState>;
  selectedDate: string | null;
  onSelectDate: (date: string) => void;
  disabled: boolean;
}

function CalendarGrid({
  days,
  dayStates,
  selectedDate,
  onSelectDate,
  disabled,
}: CalendarGridProps) {
  return (
    <div>
      {/* Day headers */}
      <div
        className="grid grid-cols-7 gap-2 mb-4"
        role="row"
        aria-label="Days of week"
      >
        {DAYS_OF_WEEK.map((day) => (
          <div
            key={day}
            role="columnheader"
            className="text-center text-sm font-semibold text-slate-600 dark:text-slate-400 py-2"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar cells */}
      <div className="grid grid-cols-7 gap-2" role="grid">
        {days.map((day, idx) => (
          <div key={`day-${idx}`}>
            {day ? (
              <CalendarDayButton
                date={day}
                state={dayStates.get(toDateString(day))}
                isSelected={selectedDate === toDateString(day)}
                onSelect={onSelectDate}
                disabled={disabled}
              />
            ) : (
              <div />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ===================== CALENDAR DAY BUTTON ===================== */

interface CalendarDayButtonProps {
  date: Date;
  state: DayState | undefined;
  isSelected: boolean;
  onSelect: (date: string) => void;
  disabled: boolean;
}

function CalendarDayButton({
  date,
  state,
  isSelected,
  onSelect,
  disabled,
}: CalendarDayButtonProps) {
  const dateStr = toDateString(date);
  const isAvailable = state?.available ?? false;

  const isToday = new Date().toDateString() === date.toDateString();
  const isPast = date.getTime() < new Date().setHours(0, 0, 0, 0) && !isToday;

  return (
    <button
      onClick={() => onSelect(dateStr)}
      aria-pressed={isSelected}
      disabled={disabled || !isAvailable || isPast}
      aria-label={`${date.getDate()} - ${isAvailable ? "Available" : "Unavailable"}`}
      className={`
        w-full aspect-square rounded-lg border-2 transition-all duration-200
        flex flex-col items-center justify-center font-semibold text-sm
        ${
          isPast
            ? "bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400 dark:text-slate-500 cursor-not-allowed"
            : isAvailable
              ? isSelected
                ? "bg-blue-600 dark:bg-blue-600 border-blue-700 dark:border-blue-500 text-white shadow-lg scale-105"
                : "bg-white dark:bg-slate-800 border-emerald-300 dark:border-emerald-600 text-slate-900 dark:text-white hover:bg-blue-50 dark:hover:bg-slate-700 hover:border-blue-400 cursor-pointer"
              : "bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400 dark:text-slate-500 cursor-not-allowed"
        }
      `}
    >
      <span>{date.getDate()}</span>
      <span className="text-xs opacity-70 mt-1">
        {isPast ? "Past" : isAvailable ? "Free" : "Full"}
      </span>
    </button>
  );
}

/* ===================== BOOKING SIDEBAR ===================== */

interface BookingSidebarProps {
  selectedDate: string | null;
  selectedHour: number | null;
  availability: TimeSlot[];
  bookedMap: Map<string, Set<number>>;
  price: number;
  isPending: boolean;
  error: string | null;
  bookingState: BookingUIState;
  onSelectHour: (hour: number) => void;
  onBook: () => void;
  onReset: () => void;
}

function BookingSidebar({
  selectedDate,
  selectedHour,
  availability,
  bookedMap,
  price,
  isPending,
  error,
  bookingState,
  onSelectHour,
  onBook,
  onReset,
}: BookingSidebarProps) {
  const hourSlots = useMemo(() => {
    if (!selectedDate) return [];
    return getAvailableHours(selectedDate, availability, bookedMap);
  }, [selectedDate, availability, bookedMap]);

  const availableCount = hourSlots.filter((s) => !s.booked).length;
  const isBookingReady =
    selectedDate &&
    selectedHour !== null &&
    !isPending &&
    bookingState === "selecting";

  return (
    <Card className="p-6 sticky top-6 bg-white dark:bg-slate-800 shadow-lg">
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
          {selectedDate ? "Select Time" : "Choose a Date"}
        </h3>
        {selectedDate && (
          <p className="text-sm text-slate-600 dark:text-slate-400">
            {formatDate(selectedDate)}
          </p>
        )}
      </div>

      {/* Error State */}
      {error && (
        <div className="mb-4 p-4 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg flex gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm font-semibold text-red-900 dark:text-red-300">
              Booking Failed
            </p>
            <p className="text-sm text-red-700 dark:text-red-400 mt-1">
              {error}
            </p>
            <button
              onClick={onReset}
              className="text-sm text-red-600 dark:text-red-400 hover:underline mt-2 font-medium"
            >
              Try Again
            </button>
          </div>
        </div>
      )}

      {/* Time Selection */}
      {!selectedDate ? (
        <div className="text-center py-8">
          <Clock className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-3 opacity-50" />
          <p className="text-slate-600 dark:text-slate-400 text-sm">
            Pick a date to see available times
          </p>
        </div>
      ) : (
        <div className="space-y-2 mb-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide">
              Available Times
            </span>
            <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-full">
              {availableCount} slots
            </span>
          </div>

          {hourSlots.length === 0 ? (
            <div className="text-center py-6">
              <Clock className="w-8 h-8 text-slate-300 dark:text-slate-600 mx-auto mb-2 opacity-50" />
              <p className="text-sm text-slate-600 dark:text-slate-400">
                No available times for this date
              </p>
            </div>
          ) : (
            <div className="max-h-[280px] overflow-y-auto space-y-2 pr-1">
              {hourSlots.map((slot) => (
                <HourButton
                  key={slot.hour}
                  hour={slot.hour}
                  booked={slot.booked}
                  selected={selectedHour === slot.hour}
                  onSelect={onSelectHour}
                  disabled={isPending || bookingState !== "selecting"}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Price Info */}
      {selectedDate && selectedHour !== null && (
        <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-800">
          <div className="flex justify-between items-center">
            <span className="text-sm text-slate-700 dark:text-slate-300 font-medium">
              Total Price
            </span>
            <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
              ${price}
            </span>
          </div>
        </div>
      )}

      {/* Action Button */}
      <Button
        onClick={onBook}
        disabled={!isBookingReady}
        className={`
          w-full py-3 font-semibold rounded-lg transition-all duration-200
          flex items-center justify-center gap-2
          ${
            isBookingReady
              ? "bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl"
              : "bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400 cursor-not-allowed"
          }
          ${isPending ? "opacity-90" : ""}
        `}
      >
        {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
        {isPending
          ? "Booking..."
          : getButtonLabel(selectedDate, selectedHour, price)}
      </Button>

      {/* Info Text */}
      <p className="text-xs text-slate-500 dark:text-slate-400 text-center mt-4">
        Youll receive a confirmation email after booking.
      </p>
    </Card>
  );
}

/* ===================== HOUR BUTTON ===================== */

interface HourButtonProps {
  hour: number;
  booked: boolean;
  selected: boolean;
  onSelect: (hour: number) => void;
  disabled: boolean;
}

function HourButton({
  hour,
  booked,
  selected,
  onSelect,
  disabled,
}: HourButtonProps) {
  const formattedTime = `${hour.toString().padStart(2, "0")}:00`;

  return (
    <button
      onClick={() => onSelect(hour)}
      disabled={booked || disabled}
      aria-pressed={selected}
      aria-label={`${formattedTime} ${booked ? "(Booked)" : ""}`}
      className={`
        w-full px-4 py-3 rounded-lg border-2 font-medium text-sm transition-all duration-200
        flex items-center justify-between
        ${
          booked
            ? "bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400 dark:text-slate-500 cursor-not-allowed opacity-50"
            : selected
              ? "bg-blue-600 dark:bg-blue-600 border-blue-700 dark:border-blue-500 text-white shadow-md"
              : "bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white hover:border-blue-400 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-slate-700 cursor-pointer"
        }
      `}
    >
      <span>{formattedTime}</span>
      {booked && (
        <span className="text-xs px-2 py-1 bg-slate-200 dark:bg-slate-700 rounded text-slate-600 dark:text-slate-300">
          Booked
        </span>
      )}
      {selected && !booked && <CheckCircle2 className="w-4 h-4" />}
    </button>
  );
}

/* ===================== UTILITIES ===================== */

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

function getButtonLabel(
  selectedDate: string | null,
  selectedHour: number | null,
  price: number,
): string {
  if (!selectedDate) return "Select a date";
  if (selectedHour === null) return "Select a time";
  return `Confirm Booking - $${price}`;
}
