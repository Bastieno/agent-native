import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { getDb, schema } from "../server/db/index.js";
import { nanoid } from "nanoid";
import { z } from "zod";

export default defineAction({
  description: "Create a new subject for the school.",
  schema: z.object({
    name: z.string().describe("Subject name, e.g. 'Mathematics', 'Biology'"),
    code: z.string().optional().describe("Subject code, e.g. 'MATH101'"),
    departmentId: z.string().optional(),
    color: z.string().optional().describe("Hex color for UI, e.g. '#3B82F6'"),
    iconName: z.string().optional().describe("Tabler icon name"),
    position: z.number().optional().default(0),
  }),
  http: { method: "POST" },
  run: async (args) => {
    const { orgId, userEmail } = currentAccess();
    if (!orgId) throw new Error("No school context.");
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
      status: "active",
      ownerEmail: userEmail ?? "",
      orgId,
      visibility: "org" as const,
    });
    return { id, name: args.name };
  },
});
