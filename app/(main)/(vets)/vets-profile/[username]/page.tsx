import {
  getDoctorBookings,
  getDoctorAvailability,
} from "@/actions/doctors/doctor-booking-actions";
import { fetchDoctorByUserName } from "@/actions/doctors/doctor-fetch-actions";
import DoctorBookingCalendar from "@/components/doctor-components/DoctorBookingCallendar";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

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

  if (!doctor) return <div>Doctor not found</div>;

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
    <DoctorBookingCalendar
      doctorId={doctor.id}
      userId={session.user.id}
      price={doctor.price}
      availability={availability}
      bookings={bookings}
    />
  );
}
