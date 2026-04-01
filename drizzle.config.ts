import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  // Koristi niz i probaj bez ./ prefixa ako prvi ne upali
  schema: ["./db/schemas/auth-schema.ts", "./db/schemas/doctor-schema.ts"],
  out: "./drizzle",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
