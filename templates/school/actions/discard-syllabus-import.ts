import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { writeAppState } from "@agent-native/core/application-state";
import { getDb, schema } from "../server/db/index.js";
import { and, eq } from "drizzle-orm";
import { z } from "zod";

/** Set an abandoned import aside. Kept, not deleted — as with drafts. */
export default defineAction({
  description:
    "Set aside a syllabus import that will not be finished. The import is kept, not deleted. Refuses one that has already been committed.",
  schema: z.object({ id: z.string().describe("Import ID") }),
  http: { method: "POST" },
  run: async (args) => {
    const { orgId } = currentAccess();
    if (!orgId) throw new Error("No school context.");
    const db = getDb();
    const [row] = await db
      .select()
      .from(schema.syllabusImports)
      .where(
        and(
          eq(schema.syllabusImports.id, args.id),
          eq(schema.syllabusImports.schoolId, orgId),
        ),
      )
      .limit(1);
    if (!row) throw new Error("That import was not found.");
    if (row.status === "committed") {
      throw new Error(
        "That import has already been committed — its objectives are in the library, so setting it aside would change nothing.",
      );
    }
    await db
      .update(schema.syllabusImports)
      .set({ status: "discarded", updatedAt: new Date().toISOString() })
      .where(eq(schema.syllabusImports.id, args.id));
    await writeAppState("refresh-signal", { ts: Date.now() });
    return {
      id: args.id,
      status: "discarded",
      message: `"${row.title}" has been set aside. Nothing reached the library, and the import is kept in case it is wanted back.`,
    };
  },
});
