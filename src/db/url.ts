// Accepts the standard name or the one Netlify's database integration sets.
export function getDatabaseUrl(): string | undefined {
  return process.env.DATABASE_URL || process.env.NETLIFY_DATABASE_URL || undefined;
}
