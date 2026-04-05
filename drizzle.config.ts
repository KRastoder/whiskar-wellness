import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: [
    "./db/schemas/auth-schema.ts",
    "./db/schemas/doctor-schema.ts",
    "./db/schemas/toys-schema.ts",
  ],
  out: "./drizzle",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
