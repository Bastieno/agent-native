import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { getDb, schema } from "../server/db/index.js";
import { nanoid } from "nanoid";
import { z } from "zod";

export default defineAction({
  description: "Create a curriculum unit for a subject.",
  schema: z.object({
    subjectId: z.string().describe("Subject this unit belongs to"),
    gradeLevelId: z.string().describe("Grade level this unit is for"),
    title: z.string().describe("Unit title, e.g. 'Fractions and Decimals'"),
    description: z.string().optional(),
    termId: z.string().optional().describe("Term this unit runs in"),
    weekStart: z.number().optional().describe("Starting week of term"),
    weekEnd: z.number().optional().describe("Ending week of term"),
    sequence: z.number().optional().default(1),
  }),
  http: { method: "POST" },
  run: async (args) => {
    const { orgId, userEmail } = currentAccess();
    if (!orgId) throw new Error("No school context.");
    const db = getDb();
    const id = nanoid();
    await db.insert(schema.units).values({
      id,
      subjectId: args.subjectId,
      gradeLevelId: args.gradeLevelId,
      title: args.title,
      description: args.description ?? null,
      termId: args.termId ?? null,
      weekStart: args.weekStart ?? null,
      weekEnd: args.weekEnd ?? null,
      sequence: args.sequence ?? 1,
      status: "draft",
      ownerEmail: userEmail ?? "",
      orgId: orgId,
      visibility: "org" as const,
    });
    return { id, title: args.title, subjectId: args.subjectId };
  },
});
