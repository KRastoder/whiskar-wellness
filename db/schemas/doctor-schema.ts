import {
  pgTable,
  text,
  pgEnum,
  integer,
  real,
  uuid,
  date,
  uniqueIndex,
  check,
} from "drizzle-orm/pg-core";
import { sql, relations } from "drizzle-orm";
import { user } from "./auth-schema";

const specialtyEnum = pgEnum("specialty", [
  "general_medicine",
  "dental",
  "cardiology",
  "dermatology",
  "surgery",
]);

export const doctor = pgTable("doctor", {
  id: text("id")
    .primaryKey()
    .references(() => user.id, { onDelete: "cascade" }),
  specialty: specialtyEnum("specialty").notNull(),
  vetenaryLisenceNumber: integer().notNull(),
  price: integer("price").notNull(),
  experience: integer("experience").notNull(),
  country: text("country").notNull(),
  city: text("city").notNull(),
  adress: text("adress").notNull(),
  rating: real("rating"),
});

export const doctorAvailability = pgTable(
  "doctor_availability",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    doctorId: text("doctor_id")
      .references(() => doctor.id)
      .notNull(),

    // 1 = Monday, 2 = Tuesday ... 5 = Friday
    dayOfWeek: integer("day_of_week").notNull(),

    // 9
    startHour: integer("start_hour").notNull(),

    // 17 (5pm)
    endHour: integer("end_hour").notNull(),
  },
  (table) => ({
    dayOfWeekValid: check(
      "day_of_week_valid",
      sql`${table.dayOfWeek} >= 1 AND ${table.dayOfWeek} <= 7`,
    ),
    startHourValid: check(
      "start_hour_valid",
      sql`${table.startHour} >= 0 AND ${table.startHour} <= 24`,
    ),
    endHourValid: check(
      "end_hour_valid",
      sql`${table.endHour} >= 0 AND ${table.endHour} <= 24`,
    ),
    endAfterStart: check(
      "end_after_start",
      sql`${table.endHour} > ${table.startHour}`,
    ),
  }),
);

export const doctorRatings = pgTable(
  "doctor_ratings",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    doctorId: text("doctor_id")
      .references(() => doctor.id)
      .notNull(),
    userId: text("user_id")
      .references(() => user.id)
      .notNull(),
    rating: integer("rating").notNull(),
  },
  (table) => ({
    uniqueUserDoctor: uniqueIndex("unique_user_doctor_rating").on(
      table.userId,
      table.doctorId,
    ),
  }),
);

export const doctorComments = pgTable("doctor_review", {
  id: uuid("id").defaultRandom().primaryKey(),
  doctorId: text("doctor_id")
    .references(() => doctor.id)
    .notNull(),
  userId: text("user_id")
    .references(() => user.id)
    .notNull(),
  review: text("comment").notNull(),
});

export const doctorBooking = pgTable("doctor_booking", {
  id: uuid("id").defaultRandom().primaryKey(),
  doctorId: text("doctor_id")
    .references(() => doctor.id)
    .notNull(),
  userId: text("user_id")
    .references(() => user.id)
    .notNull(),
  date: date("date").notNull(),
  hour: integer("hour").notNull(),
  price: integer("price").notNull(),
});

export const doctorRelations = relations(doctor, ({ one }) => ({
  user: one(user, {
    fields: [doctor.id],
    references: [user.id],
  }),
}));

export const userDoctorRelations = relations(user, ({ one }) => ({
  doctorProfile: one(doctor),
}));
