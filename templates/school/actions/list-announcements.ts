import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { getDb, schema } from "../server/db/index.js";
import { eq, and, desc } from "drizzle-orm";
import { z } from "zod";

export default defineAction({
  description:
    "List announcements for the school or a specific class. Returns most recent first.",
  schema: z.object({
    classId: z
      .string()
      .optional()
      .describe("Filter to a specific class (omit for school-wide)"),
    scope: z
      .enum(["school", "class", "all"])
      .optional()
      .default("all")
      .describe("Filter by scope"),
    limit: z
      .number()
      .optional()
      .default(20)
      .describe("Maximum number of results"),
  }),
  http: { method: "POST" },
  run: async (args) => {
    const { orgId } = currentAccess();
    if (!orgId) throw new Error("No school context.");
    const db = getDb();
    const conditions = [eq(schema.announcements.schoolId, orgId)];
    if (args.classId)
      conditions.push(eq(schema.announcements.classId, args.classId));
    if (args.scope && args.scope !== "all")
      conditions.push(eq(schema.announcements.scope, args.scope));
    return db
      .select()
      .from(schema.announcements)
      .where(and(...conditions))
      .orderBy(desc(schema.announcements.createdAt))
      .limit(args.limit ?? 20);
  },
});
