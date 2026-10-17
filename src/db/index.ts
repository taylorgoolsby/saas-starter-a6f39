import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { getDatabaseUrl } from "./url";
import * as schema from "./schema";

export function getDb() {
  const url = getDatabaseUrl();
  if (!url) throw new Error("No database connection string found. Set DATABASE_URL.");
  return drizzle(neon(url), { schema });
}
