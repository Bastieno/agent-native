import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { getDb, schema } from "../server/db/index.js";
import { eq } from "drizzle-orm";
import { nanoid } from "nanoid";
import { z } from "zod";

export default defineAction({
  description: "Create a new academic year and optionally set it as active.",
  schema: z.object({
    name: z.string().describe('Academic year name, e.g. "2025-2026"'),
    startDate: z.string().describe("Start date ISO string"),
    endDate: z.string().describe("End date ISO string"),
    setActive: z
      .boolean()
      .optional()
      .default(false)
      .describe("Set this as the active academic year"),
  }),
  http: { method: "POST" },
  run: async (args) => {
    const { orgId, userEmail } = currentAccess();
    if (!orgId) throw new Error("No school context.");
    const db = getDb();
    if (args.setActive) {
      await db
        .update(schema.academicYears)
        .set({ status: "archived" })
        .where(eq(schema.academicYears.schoolId, orgId));
    }
    const id = nanoid();
    await db.insert(schema.academicYears).values({
      id,
      schoolId: orgId,
      name: args.name,
      startDate: args.startDate,
      endDate: args.endDate,
      status: args.setActive ? "active" : "active",
      ownerEmail: userEmail ?? "",
      orgId,
      visibility: "org" as const,
    });
    return {
      id,
      name: args.name,
      startDate: args.startDate,
      endDate: args.endDate,
    };
  },
});
