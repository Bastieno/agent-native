import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { writeAppState } from "@agent-native/core/application-state";
import { getDb, schema } from "../server/db/index.js";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { jsonish } from "../shared/zod-json.js";
import {
  assertTermInSchool,
  assertUnitInSchool,
} from "../server/lib/curriculum-access.js";

/**
 * Change a committed unit.
 *
 * This looked the unit up by id alone, so anyone allowed to edit units could
 * edit another school's by guessing or copying an id. It now resolves the unit
 * through its subject to this school first, and refuses otherwise.
 */
export default defineAction({
  description:
    "Update a curriculum unit's title, description, term, weeks, order, status, or standards codes. To change its learning objectives use update-learning-objective, create-learning-objective and delete-learning-objective.",
  schema: z.object({
    id: z.string().describe("Unit ID"),
    title: z.string().optional(),
    description: z.string().optional(),
    termId: z.string().optional(),
    weekStart: z.number().optional(),
    weekEnd: z.number().optional(),
    sequence: z.number().optional(),
    status: z.enum(["draft", "active", "archived"]).optional(),
    standards: jsonish(
      z.array(
        z.object({
          framework: z.string().optional(),
          code: z.string(),
          description: z.string().optional(),
        }),
      ),
    )
      .optional()
      .describe(
        "Replaces the unit's standards codes, e.g. [{ framework: 'WAEC', code: 'GMATH-NUM-1' }]. Send the whole list.",
      ),
  }),
  http: { method: "PUT" },
  run: async (args) => {
    const { orgId } = currentAccess();
    if (!orgId) throw new Error("No school context.");
    await assertUnitInSchool(args.id, orgId);
    if (args.termId) await assertTermInSchool(args.termId, orgId);

    const weekStart = args.weekStart;
    const weekEnd = args.weekEnd;
    if (weekStart != null && weekEnd != null && weekEnd < weekStart) {
      throw new Error("weekEnd cannot be before weekStart.");
    }

    const { id, standards, ...rest } = args;
    const updates: Record<string, unknown> = {
      ...rest,
      updatedAt: new Date().toISOString(),
    };
    if (standards) updates.standardsJson = JSON.stringify(standards);

    await getDb()
      .update(schema.units)
      .set(updates)
      .where(eq(schema.units.id, id));
    await writeAppState("refresh-signal", { ts: Date.now() });
    return { success: true, id };
  },
});
