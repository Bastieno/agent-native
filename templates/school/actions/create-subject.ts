import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { getDb, schema } from "../server/db/index.js";
import { nanoid } from "nanoid";
import { jsonish } from "../shared/zod-json.js";
import { resolveGradeLevelIds } from "../server/lib/subject-year-groups.js";
import { z } from "zod";

export default defineAction({
  description:
    "Create a new subject for the school. Say which year groups take it — a junior-only subject and a senior-only one look the same otherwise, and the calendar cannot tell which year groups are missing a plan.",
  schema: z.object({
    name: z.string().describe("Subject name, e.g. 'Mathematics', 'Biology'"),
    code: z.string().optional().describe("Subject code, e.g. 'MATH101'"),
    departmentId: z.string().optional(),
    color: z.string().optional().describe("Hex color for UI, e.g. '#3B82F6'"),
    iconName: z.string().optional().describe("Tabler icon name"),
    position: z.number().optional().default(0),
    yearGroups: jsonish(z.array(z.string()))
      .optional()
      .describe(
        "Year groups that take this subject, by name ('JSS1') or id. Omit if not known yet.",
      ),
  }),
  http: { method: "POST" },
  run: async (args) => {
    const { orgId, userEmail } = currentAccess();
    if (!orgId) throw new Error("No school context.");
    const gradeLevelIds = args.yearGroups?.length
      ? await resolveGradeLevelIds(args.yearGroups, orgId)
      : null;
    const db = getDb();
    const id = nanoid();
    await db.insert(schema.subjects).values({
      id,
      schoolId: orgId,
      name: args.name,
      code: args.code ?? null,
      departmentId: args.departmentId ?? null,
      color: args.color ?? null,
      iconName: args.iconName ?? null,
      position: args.position ?? 0,
      gradeLevelsJson: gradeLevelIds ? JSON.stringify(gradeLevelIds) : null,
      status: "active",
      ownerEmail: userEmail ?? "",
      orgId,
      visibility: "org" as const,
    });
    return { id, name: args.name };
  },
});
