import { defineAction } from "@agent-native/core";
import { getOrgSetting, putOrgSetting } from "@agent-native/core/settings";
import { currentAccess } from "@agent-native/core/sharing";
import { z } from "zod";

const fieldDef = z.object({
  name: z.string().describe("Machine-readable field name (snake_case)"),
  label: z.string().describe("Human-readable label"),
  type: z.enum(["text", "number", "boolean", "enum", "date"]),
  options: z.array(z.string()).optional().describe("Options for enum type"),
  required: z.boolean().optional(),
});

export default defineAction({
  description:
    "Add or update custom field definitions for a school entity. Pass --entity and --add to append a field, or --fields to replace all fields for that entity.",
  schema: z.object({
    entity: z
      .enum(["student", "lesson_note", "assessment", "class"])
      .describe("Which entity to add custom fields to"),
    add: fieldDef
      .optional()
      .describe("A single field definition to add to this entity"),
    fields: z
      .array(fieldDef)
      .optional()
      .describe("Replace ALL custom fields for this entity"),
    remove: z
      .string()
      .optional()
      .describe("Remove a field by name from this entity"),
  }),
  http: { method: "POST" },
  run: async (args) => {
    const { orgId } = currentAccess();
    if (!orgId) throw new Error("No school context.");
    const existing =
      ((await getOrgSetting(orgId, "custom-fields-schema")) as Record<
        string,
        any[]
      > | null) ?? {};
    const entityFields: any[] = existing[args.entity] ?? [];

    let updated = [...entityFields];
    if (args.fields) {
      updated = args.fields;
    } else if (args.add) {
      const idx = updated.findIndex((f: any) => f.name === args.add!.name);
      if (idx >= 0) {
        updated[idx] = args.add;
      } else {
        updated.push(args.add);
      }
    } else if (args.remove) {
      updated = updated.filter((f: any) => f.name !== args.remove);
    }

    const merged = { ...existing, [args.entity]: updated };
    await putOrgSetting(orgId, "custom-fields-schema", merged);
    return { success: true, entity: args.entity, fields: updated };
  },
});
