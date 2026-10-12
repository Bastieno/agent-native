import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { asc, eq } from "drizzle-orm";
import { z } from "zod";
import { getDb, schema } from "../server/db/index.js";

export default defineAction({
  description:
    "List the school's grade levels (its year groups), in order. Read-only; use manage-grade-levels to change them.",
  schema: z.object({}),
  http: { method: "GET" },
  run: async () => {
    const { orgId } = currentAccess();
    if (!orgId) throw new Error("No school context.");
    return getDb()
      .select()
      .from(schema.gradeLevels)
      .where(eq(schema.gradeLevels.schoolId, orgId))
      .orderBy(asc(schema.gradeLevels.sequence));
  },
});
