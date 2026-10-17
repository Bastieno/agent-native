import { defineAction } from "@agent-native/core";
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
    const result = await db.run(sql.raw(args.sql));
    return result;
  },
});
