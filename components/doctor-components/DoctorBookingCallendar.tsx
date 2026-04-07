"use client";

import { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createBooking } from "@/actions/doctors/doctor-booking-actions";

import { Clock } from "lucide-react";
import { Card } from "../retroui/Card";
import { Button } from "../retroui/Button";
import { Text } from "../retroui/Text";

/* ================= TYPES ================= */

type Booking = {
  date: string;
  hour: number;
};

type Availability = {
  dayOfWeek: number;
  startHour: number;
  endHour: number;
};

type Props = {
  doctorId: string;
  userId: string;
  price: number;
  availability: Availability[];
  bookings: Booking[];
};

/* ================= COMPONENT ================= */

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

  /* ===== Booked Map ===== */
  const bookedMap = useMemo(() => {
    const map: Record<string, number[]> = {};

    bookings.forEach((b) => {
      if (!map[b.date]) map[b.date] = [];
      map[b.date].push(b.hour);
    });

    return map;
  }, [bookings]);

  /* ===== Days (30 days) ===== */
  const days = useMemo(() => {
    const arr: Date[] = [];
    const today = new Date();

    for (let i = 0; i < 30; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      arr.push(d);
    }

    return arr;
  }, []);

  /* ===== Available Hours ===== */
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

  /* ===== Booking Action ===== */
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

  /* ================= UI ================= */

  return (
    <div className="space-y-4">
      {/* GRID */}
      <div className="grid grid-cols-7 gap-2">
        {days.map((day) => {
          const dateStr = day.toISOString().split("T")[0];

          const availableHours = getAvailableHours(day);
          const bookedHours = bookedMap[dateStr] || [];

          const freeHours = availableHours.filter(
            (h) => !bookedHours.includes(h),
          );

          return (
            <Card
              key={dateStr}
              className="p-2 border-2 shadow-[3px_3px_0px_0px_black]"
            >
              {/* DAY */}
              <Text className="text-xs font-bold mb-1">{day.getDate()}</Text>

              {/* HOURS */}
              {freeHours.length === 0 ? (
                <Text className="text-[10px] text-muted-foreground">—</Text>
              ) : (
                <div className="space-y-1">
                  {freeHours.slice(0, 4).map((hour) => {
                    const isSelected =
                      selected?.date === dateStr && selected?.hour === hour;

                    return (
                      <button
                        key={hour}
                        onClick={() =>
                          setSelected({
                            date: dateStr,
                            hour,
                          })
                        }
                        className={`
                          w-full text-[10px] flex items-center justify-center gap-1
                          border px-1 py-[2px] transition
                          active:translate-x-[2px] active:translate-y-[2px]
                          ${
                            isSelected
                              ? "bg-primary text-primary-foreground border-black"
                              : "bg-card hover:bg-accent border-border"
                          }
                        `}
                      >
                        <Clock className="w-3 h-3" />
                        {hour}
                      </button>
                    );
                  })}
                </div>
              )}
            </Card>
          );
        })}
      </div>

      {/* FOOTER */}
      {selected && (
        <Card className="p-3 border-2 shadow-[4px_4px_0px_0px_black] flex items-center justify-between">
          <Text className="text-sm">
            {selected.date} • {selected.hour}:00
          </Text>

          <Button
            onClick={handleBook}
            disabled={isPending}
            className="border-2 border-black shadow-[2px_2px_0px_0px_black]"
          >
            {isPending ? "..." : `$${price}`}
          </Button>
        </Card>
      )}
    </div>
  );
}
