import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { writeAppState } from "@agent-native/core/application-state";
import { getDb, schema } from "../server/db/index.js";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { jsonish } from "../shared/zod-json.js";
import { assertSubjectInSchool } from "../server/lib/curriculum-access.js";
import { resolveGradeLevelIds } from "../server/lib/subject-year-groups.js";

/**
 * Change a subject.
 *
 * This updated by id alone, so it would edit another school's subject for
 * anyone holding the id. It now checks the subject is this school's first.
 */
export default defineAction({
  description:
    "Update a subject's name, code, colour, department, status, or the year groups that take it.",
  schema: z.object({
    id: z.string().describe("Subject ID"),
    name: z.string().optional().describe("Subject name"),
    code: z.string().optional().describe("Short code, e.g. 'MATH'"),
    color: z.string().optional().describe("Hex color for UI, e.g. '#3b82f6'"),
    departmentId: z.string().optional().describe("Department ID"),
    status: z.enum(["active", "archived"]).optional(),
    yearGroups: jsonish(z.array(z.string()))
      .optional()
      .describe(
        "Year groups that take this subject, by name ('JSS1') or id. Replaces the list; an empty list means not stated.",
      ),
  }),
  http: { method: "PUT" },
  run: async (args) => {
    const { orgId } = currentAccess();
    if (!orgId) throw new Error("No school context.");
    await assertSubjectInSchool(args.id, orgId);

    const { id, ...updates } = args;
    const set: Record<string, unknown> = {
      updatedAt: new Date().toISOString(),
    };
    if (updates.name !== undefined) set.name = updates.name;
    if (updates.code !== undefined) set.code = updates.code;
    if (updates.color !== undefined) set.color = updates.color;
    if (updates.departmentId !== undefined)
      set.departmentId = updates.departmentId;
    if (updates.status !== undefined) set.status = updates.status;
    if (updates.yearGroups !== undefined) {
      const ids = updates.yearGroups.length
        ? await resolveGradeLevelIds(updates.yearGroups, orgId)
        : [];
      set.gradeLevelsJson = ids.length ? JSON.stringify(ids) : null;
    }

    await getDb()
      .update(schema.subjects)
      .set(set)
      .where(eq(schema.subjects.id, id));
    await writeAppState("refresh-signal", { ts: Date.now() });
    return { success: true, id };
  },
});
