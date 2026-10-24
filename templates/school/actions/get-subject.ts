import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { getDb, schema } from "../server/db/index.js";
import { eq, and } from "drizzle-orm";
import { z } from "zod";

/** One subject in this school. */
export default defineAction({
  description: "Get a single subject by ID.",
  schema: z.object({
    id: z.string().describe("Subject ID"),
  }),
  http: { method: "GET" },
  run: async (args) => {
    const { orgId } = currentAccess();
    if (!orgId) throw new Error("No school context.");
    const db = getDb();
    const [subject] = await db
      .select()
      .from(schema.subjects)
      .where(
        and(eq(schema.subjects.id, args.id), eq(schema.subjects.orgId, orgId)),
      )
      .limit(1);
    if (!subject) throw new Error("Subject not found.");
    return subject;
  },
});
