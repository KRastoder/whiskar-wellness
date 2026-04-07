import {
  getDoctorBookings,
  getDoctorAvailability,
} from "@/actions/doctors/doctor-booking-actions";
import { fetchDoctorByUserName } from "@/actions/doctors/doctor-fetch-actions";
import DoctorBookingCalendar from "@/components/doctor-components/DoctorBookingCallendar";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { CalendarDays } from "lucide-react";

export default async function DoctorPage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/");
  }

  const { username } = await params;

  const doctor = await fetchDoctorByUserName(username);

  if (!doctor) {
    return (
      <div className="min-h-screen flex items-center justify-center text-sm text-muted-foreground">
        Doctor not found
      </div>
    );
  }

  const today = new Date();

  const from = new Date(today.getFullYear(), today.getMonth(), 1);
  const to = new Date(today.getFullYear(), today.getMonth() + 1, 0);

  const [availability, bookings] = await Promise.all([
    getDoctorAvailability(doctor.id),
    getDoctorBookings({
      doctorId: doctor.id,
      from,
      to,
    }),
  ]);

  return (
    <div className="min-h-screen bg-background flex mt-10 justify-center px-4">
      {/* CENTER PANEL */}
      <div className="w-full max-w-3xl border border-border bg-card text-card-foreground rounded-lg p-4 space-y-3">
        {/* HEADER */}
        <div className="flex items-center justify-center gap-2 border-b border-border pb-2">
          <CalendarDays className="w-4 h-4 text-primary" />
          <h1 className="text-sm font-bold">Book Appointment</h1>
        </div>

        {/* INFO STRIP */}
        <div className="text-center text-xs text-muted-foreground">
          Dr. <span className="text-foreground font-medium">{doctor.name}</span>{" "}
          • ${doctor.price}
        </div>

        {/* CALENDAR */}
        <DoctorBookingCalendar
          doctorId={doctor.id}
          userId={session.user.id}
          price={doctor.price}
          availability={availability}
          bookings={bookings}
        />
      </div>
    </div>
  );
}
