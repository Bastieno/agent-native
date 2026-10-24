import { defineAction } from "@agent-native/core";
import { isPostgres } from "@agent-native/core/db";
import { getDb } from "../server/db/index.js";
import { sql } from "drizzle-orm";
import { z } from "zod";

export default defineAction({
  description: "Run a read-only SELECT query against the school database.",
  schema: z.object({
    sql: z.string().describe("SELECT query to run"),
  }),
  http: false,
  run: async (args) => {
    if (!/^\s*SELECT/i.test(args.sql)) {
      throw new Error(
        "Only SELECT queries are allowed in db-query. Use db-exec for mutations.",
      );
    }
    const db = getDb();
    // SQLite answers a read through `run`; Postgres only through `execute`.
    const raw: any = db;
    const result = isPostgres()
      ? await raw.execute(sql.raw(args.sql))
      : await raw.run(sql.raw(args.sql));
    return result;
  },
});
