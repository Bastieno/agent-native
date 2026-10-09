import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { getDb, schema } from "../server/db/index.js";
import { eq, asc } from "drizzle-orm";
import { nanoid } from "nanoid";
import { z } from "zod";

export default defineAction({
  description:
    "List, create, update, or delete grade levels for the school. Grade levels are fully dynamic — the school defines their own (Grade 7-12, Form 1-6, Year 7-13, etc.).",
  schema: z.object({
    action: z
      .enum(["list", "create", "update", "delete", "bulk-create"])
      .default("list"),
    id: z.string().optional().describe("Grade level ID for update/delete"),
    name: z
      .string()
      .optional()
      .describe("Grade level name, e.g. 'Grade 7' or 'Form 1'"),
    sequence: z
      .number()
      .optional()
      .describe("Order position (1 = first/youngest)"),
    levels: z
      .array(
        z.object({
          name: z.string(),
          sequence: z.number(),
        }),
      )
      .optional()
      .describe("For bulk-create: list of grade levels to create at once"),
  }),
  http: { method: "POST" },
  run: async (args) => {
    const { orgId, userEmail } = currentAccess();
    if (!orgId) throw new Error("No school context.");
    const db = getDb();

    // Auto-infer bulk-create when levels array is provided without an explicit action
    if (args.levels?.length && args.action === "list") {
      args = { ...args, action: "bulk-create" };
    }

    if (args.action === "list") {
      const levels = await db
        .select()
        .from(schema.gradeLevels)
        .where(eq(schema.gradeLevels.schoolId, orgId))
        .orderBy(asc(schema.gradeLevels.sequence));
      return levels;
    }

    if (args.action === "bulk-create") {
      if (!args.levels?.length) throw new Error("Provide --levels array.");
      const rows = args.levels.map((l) => ({
        id: nanoid(),
        schoolId: orgId,
        name: l.name,
        sequence: l.sequence,
        ownerEmail: userEmail ?? "",
        orgId,
        visibility: "org" as const,
      }));
      // Replace: delete existing grade levels for this school, then insert fresh
      await db
        .delete(schema.gradeLevels)
        .where(eq(schema.gradeLevels.schoolId, orgId));
      await db.insert(schema.gradeLevels).values(rows);
      return { created: rows.length, levels: rows };
    }

    if (args.action === "create") {
      if (!args.name) throw new Error("Provide --name.");
      const id = nanoid();
      await db.insert(schema.gradeLevels).values({
        id,
        schoolId: orgId,
        name: args.name,
        sequence: args.sequence ?? 1,
        ownerEmail: userEmail ?? "",
        orgId,
        visibility: "org" as const,
      });
      return { id, name: args.name, sequence: args.sequence ?? 1 };
    }

    if (args.action === "update") {
      if (!args.id) throw new Error("Provide --id.");
      await db
        .update(schema.gradeLevels)
        .set({
          ...(args.name && { name: args.name }),
          ...(args.sequence !== undefined && { sequence: args.sequence }),
          updatedAt: new Date().toISOString(),
        })
        .where(eq(schema.gradeLevels.id, args.id));
      return { success: true, id: args.id };
    }

    if (args.action === "delete") {
      if (!args.id) throw new Error("Provide --id.");
      await db
        .delete(schema.gradeLevels)
        .where(eq(schema.gradeLevels.id, args.id));
      return { success: true, deleted: args.id };
    }

    throw new Error(`Unknown action: ${args.action}`);
  },
});
