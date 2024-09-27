import { text, integer, sqliteTable } from "drizzle-orm/sqlite-core";

// define schema for the payersTable
export const payersTable = sqliteTable("payers", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  points: integer("points").notNull(),
  timestamp: integer("timestamp", { mode: "timestamp" }).notNull(),
});
