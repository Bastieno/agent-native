import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { getDb, schema } from "../server/db/index.js";
import { eq, desc } from "drizzle-orm";
import { z } from "zod";

export default defineAction({
  description: "List academic years for the school.",
  schema: z.object({}),
  http: { method: "GET" },
  run: async () => {
    const { orgId } = currentAccess();
    if (!orgId) throw new Error("No school context.");
    const db = getDb();
    const years = await db
      .select()
      .from(schema.academicYears)
      .where(eq(schema.academicYears.schoolId, orgId))
      .orderBy(desc(schema.academicYears.startDate));
    return years;
  },
});
