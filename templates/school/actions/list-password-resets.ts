import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { and, desc, eq, gte } from "drizzle-orm";
import { z } from "zod";
import { getDb, schema } from "../server/db/index.js";

export default defineAction({
  description:
    "Who changed whose password, and when, newest first: the admins and form teachers who reset a learner's password. Use it for 'who reset passwords this week?'. It never holds a password.",
  schema: z.object({
    days: z.coerce.number().int().min(1).max(365).default(7),
  }),
  http: { method: "GET" },
  run: async (args) => {
    const { orgId } = currentAccess();
    if (!orgId) throw new Error("No school context.");
    const since = new Date(Date.now() - args.days * 86_400_000).toISOString();
    const rows = await getDb()
      .select({
        at: schema.passwordResets.createdAt,
        learner: schema.passwordResets.learnerName,
        by: schema.passwordResets.resetByName,
        role: schema.passwordResets.resetByRole,
      })
      .from(schema.passwordResets)
      .where(
        and(
          eq(schema.passwordResets.schoolId, orgId),
          gte(schema.passwordResets.createdAt, since),
        ),
      )
      .orderBy(desc(schema.passwordResets.createdAt))
      .limit(200);
    return { days: args.days, count: rows.length, resets: rows };
  },
});
