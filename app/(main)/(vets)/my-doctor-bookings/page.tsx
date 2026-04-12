import { getDoctorBookings } from "@/actions/doctors/doctor-booking-actions";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { notFound } from "next/navigation";

import { Card } from "@/components/retroui/Card";
import { Badge } from "@/components/retroui/Badge";
import { Text } from "@/components/retroui/Text";
import { doctorBooking } from "@/db/schemas/doctor-schema";

type Booking = typeof doctorBooking.$inferSelect;

export default async function MyDoctorBookingsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || session.user.role !== "doctor") {
    notFound();
  }

  const from = new Date();
  const to = new Date();
  to.setDate(to.getDate() + 7);

  const bookings: Booking[] = await getDoctorBookings({
    doctorId: session.user.id,
    from,
    to,
  });

  const sortedBookings = bookings.sort(
    (a, b) =>
      new Date(a.date).getTime() - new Date(b.date).getTime() ||
      a.hour - b.hour,
  );

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold">Bookings</h1>
          <Text className="text-muted-foreground">
            Your next 7 days of appointments
          </Text>
        </div>

        <Badge>{sortedBookings.length} total</Badge>
      </div>

      {/* Empty State */}
      {sortedBookings.length === 0 ? (
        <Card className="p-10 text-center">
          <Text>No bookings yet</Text>
        </Card>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {sortedBookings.map((booking) => (
            <Card
              key={booking.id}
              className="p-5 space-y-4 hover:scale-[1.02] transition-transform"
            >
              <div className="flex items-center justify-between">
                <Text className="font-semibold">Appointment</Text>
                <Badge>Confirmed</Badge>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <Text className="opacity-60">Date</Text>
                  <Text>{new Date(booking.date).toLocaleDateString()}</Text>
                </div>

                <div className="flex justify-between">
                  <Text className="opacity-60">Time</Text>
                  <Text>{booking.hour}:00</Text>
                </div>

                <div className="flex justify-between">
                  <Text className="opacity-60">Price</Text>
                  <Text>${booking.price}</Text>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
