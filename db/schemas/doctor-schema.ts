import {
  pgTable,
  text,
  pgEnum,
  integer,
  real,
  uuid,
} from "drizzle-orm/pg-core";
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
    .references(() => user.id),
  specialty: specialtyEnum("specialty").notNull(),
  price: integer("price").notNull(),
  experience: integer("experience").notNull(),
  country: text("country").notNull(),
  city: text("city").notNull(),
  adress: text("adress").notNull(),
  rating: real("rating"),
});

export const doctorAvailability = pgTable("doctor_availability", {
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
});

export const doctorRatings = pgTable("doctor_ratings", {
  id: uuid("id").defaultRandom().primaryKey(),
  doctorId: text("doctor_id")
    .references(() => doctor.id)
    .notNull(),
  userId: text("user_id")
    .references(() => user.id)
    .notNull(),
  rating: integer("rating").notNull(),
});

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
