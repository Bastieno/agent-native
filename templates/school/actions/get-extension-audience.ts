import { defineAction } from "@agent-native/core";
import { getOrgSetting } from "@agent-native/core/settings";
import { currentAccess } from "@agent-native/core/sharing";
import { z } from "zod";

/** The setting that holds which extensions the admin has put in front of teachers. */
export const EXTENSION_AUDIENCE_KEY = "extension-audience";

export async function teacherExtensionIds(orgId: string): Promise<string[]> {
  const stored = (await getOrgSetting(orgId, EXTENSION_AUDIENCE_KEY)) as {
    teacherIds?: unknown;
  } | null;
  return Array.isArray(stored?.teacherIds)
    ? stored.teacherIds.filter((id): id is string => typeof id === "string")
    : [];
}

/**
 * Which extensions teachers see. An extension is visible to teachers only when
 * the admin has marked it for them; the page then opens it from the
 * framework's own list, which already limits what a person may open.
 */
export default defineAction({
  description:
    "The ids of the extensions the admin has marked for teachers. Teachers see only these, on their Extensions page.",
  schema: z.object({}),
  http: { method: "GET" },
  run: async () => {
    const { orgId } = currentAccess();
    if (!orgId) throw new Error("No school context.");
    return { teacherIds: await teacherExtensionIds(orgId) };
  },
});
