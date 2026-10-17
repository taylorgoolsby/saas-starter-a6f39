import { boolean, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

// Example table. Replace with your own, then run: npm run db:generate
export const todos = pgTable("todos", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  done: boolean("done").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});
