"use client";

import { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createBooking } from "@/actions/doctors/doctor-booking-actions";

type Props = {
  doctorId: string;
  userId: string;
  price: number;
  availability: {
    dayOfWeek: number;
    startHour: number;
    endHour: number;
  }[];
  bookings: {
    date: string;
    hour: number;
  }[];
};

export default function DoctorBookingCalendar({
  doctorId,
  userId,
  price,
  availability,
  bookings,
}: Props) {
  const [selected, setSelected] = useState<{
    date: string;
    hour: number;
  } | null>(null);

  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const bookedMap = useMemo(() => {
    const map: Record<string, number[]> = {};

    bookings.forEach((b) => {
      if (!map[b.date]) map[b.date] = [];
      map[b.date].push(b.hour);
    });

    return map;
  }, [bookings]);

  const days = useMemo(() => {
    const arr = [];
    const today = new Date();

    for (let i = 0; i < 30; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      arr.push(d);
    }

    return arr;
  }, []);

  const getAvailableHours = (date: Date) => {
    const jsDay = date.getDay();
    const dayOfWeek = jsDay === 0 ? 7 : jsDay;

    const match = availability.filter((a) => a.dayOfWeek === dayOfWeek);

    const hours: number[] = [];

    for (const slot of match) {
      for (let h = slot.startHour; h < slot.endHour; h++) {
        hours.push(h);
      }
    }

    return hours;
  };

  const handleBook = () => {
    if (!selected) return;

    startTransition(async () => {
      await createBooking({
        bookingData: {
          doctorId,
          userId,
          date: selected.date,
          hour: selected.hour,
          price,
        },
      });

      setSelected(null);
      router.refresh();
    });
  };

  return (
    <div className="grid grid-cols-7 gap-2">
      {days.map((day) => {
        const dateStr = day.toISOString().split("T")[0];

        const availableHours = getAvailableHours(day);
        const bookedHours = bookedMap[dateStr] || [];

        const freeHours = availableHours.filter(
          (h) => !bookedHours.includes(h),
        );

        return (
          <div key={dateStr} className="border p-2">
            <div className="text-xs font-bold">{day.getDate()}</div>

            {freeHours.length === 0 ? (
              <div className="text-xs opacity-40">No availability</div>
            ) : (
              freeHours.map((hour) => (
                <button
                  key={hour}
                  onClick={() =>
                    setSelected({
                      date: dateStr,
                      hour,
                    })
                  }
                  className="block text-xs w-full"
                >
                  {hour}:00
                </button>
              ))
            )}
          </div>
        );
      })}

      {selected && (
        <div className="col-span-7 mt-4">
          <p>
            Selected: {selected.date} at {selected.hour}:00
          </p>

          <button onClick={handleBook} disabled={isPending}>
            {isPending ? "Booking..." : "Confirm Booking"}
          </button>
        </div>
      )}
    </div>
  );
}
