import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { getDb, schema } from "../server/db/index.js";
import { and, eq } from "drizzle-orm";
import { nanoid } from "nanoid";
import { z } from "zod";

/**
 * A school plans next year before it starts — classes, arms, a timetable —
 * while this year is still being taught. So a new year does not take over
 * unless asked to: it is "upcoming" until someone makes it current, with
 * `setActive` here or `set-active-academic-year` at promotion. The one
 * exception is a school with no current year at all, whose first year is
 * current from the start.
 */
export default defineAction({
  description:
    "Create a new academic year. It becomes the current year only when setActive is true, or when the school has no current year yet; otherwise it is upcoming until set-active-academic-year makes it current.",
  schema: z.object({
    name: z.string().describe('Academic year name, e.g. "2025-2026"'),
    startDate: z.string().describe("Start date ISO string"),
    endDate: z.string().describe("End date ISO string"),
    setActive: z
      .boolean()
      .optional()
      .default(false)
      .describe(
        "Make this the current year now, archiving the others. Leave off when planning next year ahead of time.",
      ),
  }),
  http: { method: "POST" },
  run: async (args) => {
    const { orgId, userEmail } = currentAccess();
    if (!orgId) throw new Error("No school context.");
    const db = getDb();

    const [current] = await db
      .select({ id: schema.academicYears.id })
      .from(schema.academicYears)
      .where(
        and(
          eq(schema.academicYears.orgId, orgId),
          eq(schema.academicYears.schoolId, orgId),
          eq(schema.academicYears.status, "active"),
        ),
      )
      .limit(1);
    const makeCurrent = args.setActive || !current;

    if (args.setActive) {
      await db
        .update(schema.academicYears)
        .set({ status: "archived" })
        .where(
          and(
            eq(schema.academicYears.orgId, orgId),
            eq(schema.academicYears.schoolId, orgId),
            eq(schema.academicYears.status, "active"),
          ),
        );
    }
    const id = nanoid();
    const status = makeCurrent ? "active" : "upcoming";
    await db.insert(schema.academicYears).values({
      id,
      schoolId: orgId,
      name: args.name,
      startDate: args.startDate,
      endDate: args.endDate,
      status,
      ownerEmail: userEmail ?? "",
      orgId,
      visibility: "org" as const,
    });
    return {
      id,
      name: args.name,
      startDate: args.startDate,
      endDate: args.endDate,
      status,
      message: makeCurrent
        ? `${args.name} is now the current academic year.`
        : `${args.name} is set up as next year. This year stays current until ${args.name} is made current.`,
    };
  },
});
