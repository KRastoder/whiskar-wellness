import { Card } from "../retroui/Card";
import { Input } from "../retroui/Input";
import { Label } from "../retroui/Label";

import { doctorAvailability } from "@/db/schemas/doctor-schema";
import { eq, and } from "drizzle-orm";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import db from "@/db";
import { notFound } from "next/navigation";

export default async function MyAvailabilityForm() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || session.user.role !== "doctor") {
    notFound();
  }

  async function upsertAvailability(formData: FormData) {
    "use server";

    const dayOfWeek = Number(formData.get("dayOfWeek"));
    const startHour = Number(formData.get("startHour"));
    const endHour = Number(formData.get("endHour"));

    const doctorId = session!.user.id;

    if (endHour <= startHour) {
      throw new Error("End hour must be greater than start hour");
    }

    if (dayOfWeek < 1 || dayOfWeek > 7) {
      throw new Error("Invalid day of week");
    }

    const existing = await db
      .select()
      .from(doctorAvailability)
      .where(
        and(
          eq(doctorAvailability.doctorId, doctorId),
          eq(doctorAvailability.dayOfWeek, dayOfWeek),
        ),
      )
      .limit(1);

    if (existing.length > 0) {
      await db
        .update(doctorAvailability)
        .set({ startHour, endHour })
        .where(
          and(
            eq(doctorAvailability.doctorId, doctorId),
            eq(doctorAvailability.dayOfWeek, dayOfWeek),
          ),
        );
    } else {
      await db.insert(doctorAvailability).values({
        doctorId,
        dayOfWeek,
        startHour,
        endHour,
      });
    }
  }

  return (
    <Card className="p-6 max-w-md space-y-6">
      <h2 className="text-xl font-semibold">Set Availability</h2>

      <form action={upsertAvailability} className="space-y-4">
        {/* Day of week */}
        <div className="space-y-1">
          <Label htmlFor="dayOfWeek">Day of Week</Label>
          <Input
            name="dayOfWeek"
            type="number"
            min={1}
            max={7}
            placeholder="1 = Monday"
            required
          />
        </div>

        {/* Start hour */}
        <div className="space-y-1">
          <Label htmlFor="startHour">Start Hour</Label>
          <Input
            name="startHour"
            type="number"
            min={0}
            max={23}
            placeholder="e.g. 9"
            required
          />
        </div>

        {/* End hour */}
        <div className="space-y-1">
          <Label htmlFor="endHour">End Hour</Label>
          <Input
            name="endHour"
            type="number"
            min={1}
            max={24}
            placeholder="e.g. 17"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 rounded-lg bg-black text-white hover:opacity-90 transition"
        >
          Save Availability
        </button>
      </form>
    </Card>
  );
}
