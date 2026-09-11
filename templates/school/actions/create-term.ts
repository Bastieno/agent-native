import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { getDb, schema } from "../server/db/index.js";
import { nanoid } from "nanoid";
import { z } from "zod";

export default defineAction({
  description: "Create a term (or semester/quarter) within an academic year.",
  schema: z.object({
    academicYearId: z
      .string()
      .describe("The academic year this term belongs to"),
    name: z.string().describe('Term name, e.g. "Term 1", "Semester 2", "Q3"'),
    startDate: z.string().describe("Start date ISO string"),
    endDate: z.string().describe("End date ISO string"),
    sequence: z
      .number()
      .optional()
      .default(1)
      .describe("Order position within the year"),
  }),
  http: { method: "POST" },
  run: async (args) => {
    const { orgId, userEmail } = currentAccess();
    if (!orgId) throw new Error("No school context.");
    const db = getDb();
    const id = nanoid();
    await db.insert(schema.terms).values({
      id,
      academicYearId: args.academicYearId,
      schoolId: orgId,
      name: args.name,
      startDate: args.startDate,
      endDate: args.endDate,
      sequence: args.sequence ?? 1,
      ownerEmail: userEmail ?? "",
      orgId,
      visibility: "org" as const,
    });
    return { id, name: args.name, academicYearId: args.academicYearId };
  },
});
