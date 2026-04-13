import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import {
  getDoctorBookings,
  getDoctorAvailability,
} from "@/actions/doctors/doctor-booking-actions";
import { fetchDoctorByUserName } from "@/actions/doctors/doctor-fetch-actions";
import { CalendarDays } from "lucide-react";
import { getMonthStart, getMonthEnd } from "@/lib/date-utils";
import type { TimeSlot, Booking } from "@/lib/booking-types";
import DoctorBookingCalendar from "@/components/doctor-components/DoctorBookingCallendar";
import Link from "next/link";

type PageParams = {
  params: Promise<{ username: string }>;
};

export default async function DoctorPage({ params }: PageParams) {
  // Authenticate user
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/");
  }

  // Fetch doctor data
  const { username } = await params;
  const doctor = await fetchDoctorByUserName(username);

  if (!doctor) {
    return <DoctorNotFound />;
  }

  // Fetch booking data in parallel
  const dateRange = getDateRange();
  const [availability, bookings] = await Promise.all([
    getDoctorAvailability(doctor.id),
    getDoctorBookings(doctor.id, dateRange.from, dateRange.to),
  ]);

  // Ensure proper typing from the start (no conversion needed in component)
  const typedAvailability: TimeSlot[] = availability as TimeSlot[];
  const typedBookings: Booking[] = bookings as Booking[];

  return (
    <DoctorBookingPage
      doctor={doctor}
      userId={session.user.id}
      availability={typedAvailability}
      bookings={typedBookings}
    />
  );
}

/* ===================== COMPONENTS ===================== */

interface DoctorBookingPageProps {
  doctor: {
    id: string;
    name: string;
    price: number;
  };
  userId: string;
  availability: TimeSlot[];
  bookings: Booking[];
}

function DoctorBookingPage({
  doctor,
  userId,
  availability,
  bookings,
}: DoctorBookingPageProps) {
  return (
    <div className="min-h-screen bg-background flex mt-10 justify-center px-4">
      <div className="w-full max-w-3xl border border-border bg-card text-card-foreground rounded-lg p-4 space-y-3">
        {/* Header */}
        <DoctorPageHeader doctor={doctor} />

        {/* Doctor Info */}
        <DoctorInfo doctor={doctor} />

        {/* Calendar */}
        <DoctorBookingCalendar
          doctorId={doctor.id}
          userId={userId}
          price={doctor.price}
          availability={availability}
          bookings={bookings}
        />
      </div>
    </div>
  );
}

function DoctorPageHeader({ doctor }: { doctor: { name: string } }) {
  return (
    <div className="flex items-center justify-center gap-2 border-b border-border pb-2">
      <CalendarDays className="w-4 h-4 text-primary" />
      <h1 className="text-sm font-bold">Book Appointment</h1>
    </div>
  );
}

function DoctorInfo({ doctor }: { doctor: { name: string; price: number } }) {
  return (
    <div className="text-center text-xs text-muted-foreground">
      Dr. <span className="text-foreground font-medium">{doctor.name}</span> •{" "}
      <span className="text-foreground font-medium">${doctor.price}</span>
    </div>
  );
}

function DoctorNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center text-sm text-muted-foreground">
      <div className="text-center space-y-4">
        <h1 className="text-lg font-semibold text-foreground">
          Doctor Not Found
        </h1>
        <p>The doctor youre looking for doesnt exist or has been removed.</p>
        <Link href="/" className="text-primary hover:underline">
          Return to home
        </Link>
      </div>
    </div>
  );
}

/* ===================== UTILITIES ===================== */

/**
 * Get current month's date range
 */
function getDateRange(): { from: Date; to: Date } {
  const now = new Date();
  return {
    from: getMonthStart(now),
    to: getMonthEnd(now),
  };
}
