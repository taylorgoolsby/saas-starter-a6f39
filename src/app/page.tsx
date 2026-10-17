import { sql } from "drizzle-orm";
import { getDb } from "@/db";
import { getDatabaseUrl } from "@/db/url";
import { todos } from "@/db/schema";

export const dynamic = "force-dynamic";

type Check = { label: string; ok: boolean; help: string };

async function runChecks(): Promise<Check[]> {
  const hasUrl = Boolean(getDatabaseUrl());
  const checks: Check[] = [
    {
      label: "Database connection string",
      ok: hasUrl,
      help: "Add a variable named DATABASE_URL in your host's environment settings, using the connection string from your Neon dashboard, then redeploy.",
    },
  ];

  let reachable = false;
  let migrated = false;
  if (hasUrl) {
    try {
      const db = getDb();
      await db.execute(sql`select 1`);
      reachable = true;
      await db.select({ id: todos.id }).from(todos).limit(1);
      migrated = true;
    } catch {
      /* reported below */
    }
  }

  checks.push(
    {
      label: "Database reachable",
      ok: reachable,
      help: "The connection string is set but the database didn't answer. Check that it was copied in full, then redeploy.",
    },
    {
      label: "Tables created",
      ok: migrated,
      help: "Tables are created automatically on every deploy. Trigger a new deploy and check the build log for a line starting with [migrate].",
    },
  );
  return checks;
}

export default async function Home() {
  const checks = await runChecks();
  const ready = checks.every((c) => c.ok);

  return (
    <main>
      <h1>{ready ? "Your app is ready" : "Almost there"}</h1>
      <p className="lede">
        {ready
          ? "Everything is connected. You can start building."
          : "A few things still need attention. Fix them in order, then reload this page."}
      </p>

      <ul className="checks">
        {checks.map((c) => (
          <li key={c.label} data-ok={c.ok}>
            <span className="mark" aria-hidden="true">{c.ok ? "✓" : "✕"}</span>
            <div>
              <strong>{c.label}</strong>
              <span className="sr"> {c.ok ? "is working" : "needs attention"}</span>
              {!c.ok && <p>{c.help}</p>}
            </div>
          </li>
        ))}
      </ul>

      {ready && (
        <p>
          <a className="button" href="/api/graphql">Open the GraphQL playground</a>
        </p>
      )}
    </main>
  );
}
