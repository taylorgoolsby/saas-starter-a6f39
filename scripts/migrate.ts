import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { migrate } from "drizzle-orm/neon-http/migrator";

const url = process.env.DATABASE_URL || process.env.NETLIFY_DATABASE_URL;

if (!url) {
  // Don't fail the first deploy; the home page explains what's missing.
  console.warn("[migrate] No DATABASE_URL set, skipping migrations.");
  process.exit(0);
}

await migrate(drizzle(neon(url)), { migrationsFolder: "./drizzle" });
console.log("[migrate] Database is up to date.");
