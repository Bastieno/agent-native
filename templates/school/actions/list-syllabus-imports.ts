import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { getDb, schema } from "../server/db/index.js";
import { and, desc, eq } from "drizzle-orm";
import { z } from "zod";
import { summariseImport } from "../shared/syllabus-import.js";
import { schoolYearGroups } from "../server/lib/year-groups.js";

/** Imports in progress, so one started last week is not lost. */
export default defineAction({
  description:
    "List syllabus imports for this school, newest first, with how much has been read into each.",
  schema: z.object({
    status: z
      .enum(["in_progress", "committed", "discarded", "all"])
      .optional()
      .default("in_progress"),
  }),
  http: { method: "GET" },
  run: async (args) => {
    const { orgId } = currentAccess();
    if (!orgId) throw new Error("No school context.");
    const conditions = [eq(schema.syllabusImports.schoolId, orgId)];
    if (args.status && args.status !== "all") {
      conditions.push(eq(schema.syllabusImports.status, args.status));
    }
    const rows = await getDb()
      .select()
      .from(schema.syllabusImports)
      .where(and(...conditions))
      .orderBy(desc(schema.syllabusImports.updatedAt));

    const known = await schoolYearGroups(orgId);
    const imports = rows.map((row: any) => {
      let summary;
      try {
        summary = summariseImport(JSON.parse(row.stateJson || "{}"), known);
      } catch {
        summary = null;
      }
      return {
        id: row.id,
        title: row.title,
        source: row.source,
        status: row.status,
        subjects: summary?.subjects.length ?? 0,
        objectives: summary?.totalObjectives ?? 0,
        updatedAt: row.updatedAt,
        path: `/admin/curriculum/import?importId=${row.id}`,
      };
    });

    return {
      imports,
      count: imports.length,
      message: imports.length
        ? `${imports.length} syllabus import(s).`
        : "No syllabus imports open.",
    };
  },
});
