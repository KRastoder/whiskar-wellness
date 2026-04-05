import {
  pgTable,
  integer,
  uuid,
  timestamp,
  varchar,
  text,
} from "drizzle-orm/pg-core";
import { user } from "./auth-schema";

export const toy = pgTable("toy", {
  id: uuid("id").primaryKey().defaultRandom(),
  price: integer("price").notNull(),
  discount: integer("discount").default(0).notNull(),
  name: varchar("name", { length: 100 }).notNull(),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .$onUpdate(() => new Date())
    .notNull(),
});

export const toyOrders = pgTable("toy_orders", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: text("user_id")
    .references(() => user.id, { onDelete: "cascade" })
    .notNull(),
  toyId: uuid("toy_id")
    .references(() => toy.id, { onDelete: "cascade" })
    .notNull(),
  price: integer("price").notNull(),
  country: text("country").notNull(),
  city: text("city").notNull(),
  address: text("address").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .$onUpdate(() => new Date())
    .notNull(),
});

export const toyImages = pgTable("toy_images", {
  id: uuid("id").primaryKey().defaultRandom(),
  toyId: uuid("toy_id")
    .references(() => toy.id, { onDelete: "cascade" })
    .notNull(),
  url: text("url").notNull(),
});
