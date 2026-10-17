import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { getDb, schema } from "../server/db/index.js";
import { and, eq } from "drizzle-orm";
import { z } from "zod";
import { summariseImport } from "../shared/syllabus-import.js";
import { schoolYearGroups } from "../server/lib/year-groups.js";

/** Read an import back — always do this at the start of a turn. */
export default defineAction({
  description:
    "Read a syllabus import: what has been extracted so far, what could not be read, and anything that needs fixing before it can be committed.",
  schema: z.object({ id: z.string().describe("Import ID") }),
  http: { method: "GET" },
  run: async (args) => {
    const { orgId } = currentAccess();
    if (!orgId) throw new Error("No school context.");
    const [row] = await getDb()
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

    const state = JSON.parse(row.stateJson || "{}");
    return {
      id: row.id,
      title: row.title,
      source: row.source,
      status: row.status,
      stateJson: state,
      summary: summariseImport(state, await schoolYearGroups(orgId)),
      updatedAt: row.updatedAt,
    };
  },
});
