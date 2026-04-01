// migrate.ts
import "dotenv/config";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";

const runMigrate = async () => {
  const client = new Client({
    connectionString: "postgresql://admin:admin123@localhost:5435/wiskersCare",
  });

  await client.connect();
  const db = drizzle(client);

  console.log("⏳ Running migrations...");

  await migrate(db, { migrationsFolder: "./drizzle" });

  console.log("✅ Migrations completed!");

  await client.end();
};

runMigrate().catch((err) => {
  console.error("❌ Migration failed!", err);
  process.exit(1);
});
