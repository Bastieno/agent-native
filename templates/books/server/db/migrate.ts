import { runMigrations } from "@agent-native/core/db";
import { BOOKS_MIGRATIONS } from "./migrations.js";

export const MIGRATIONS_TABLE = "books_migrations";

export const booksMigrationsPlugin = runMigrations(BOOKS_MIGRATIONS, {
  table: MIGRATIONS_TABLE,
});

/** Run the migrations outside Nitro (checks, the simulation, ops scripts). */
export async function migrateForChecks(): Promise<void> {
  await (booksMigrationsPlugin as unknown as (app?: unknown) => Promise<void>)(
    {},
  );
}
