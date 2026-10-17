import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { getDb, schema } from "../server/db/index.js";
import { and, eq } from "drizzle-orm";
import { z } from "zod";

/** Abandon a reading. Nothing was in the library yet, so nothing leaves it. */
export default defineAction({
  description:
    "Discard a style import that was never committed, and the questions read into it.",
  schema: z.object({ importId: z.string() }),
  http: { method: "POST" },
  run: async (args) => {
    const { orgId } = currentAccess();
    if (!orgId) throw new Error("No school context.");
    const db = getDb();
    const [imp] = await db
      .select()
      .from(schema.styleImports)
      .where(
        and(
          eq(schema.styleImports.id, args.importId),
          eq(schema.styleImports.schoolId, orgId),
        ),
      )
      .limit(1);
    if (!imp) throw new Error("Style import not found.");
    await db
      .update(schema.styleImports)
      .set({
        status: "discarded",
        questionsJson: "[]",
        updatedAt: new Date().toISOString(),
      })
      .where(eq(schema.styleImports.id, args.importId));
    return {
      discarded: true,
      message: `"${imp.styleName}" has been discarded. Nothing had reached the library.`,
    };
  },
});
