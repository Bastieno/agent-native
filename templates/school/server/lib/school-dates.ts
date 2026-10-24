import { getOrgSetting } from "@agent-native/core/settings";

/**
 * How this school writes a date, for the server side.
 *
 * The client has `useSchoolDates`; anything the server composes for a person
 * to read — "this closed on …" — needs the same two facts, and had neither.
 */
export async function schoolDateStyle(
  orgId: string | null | undefined,
): Promise<{ locale?: string; timeZone?: string }> {
  if (!orgId) return {};
  const config = ((await getOrgSetting(orgId, "school-config")) ?? {}) as any;
  return {
    locale: config?.locale || undefined,
    timeZone: config?.schoolTimezone || config?.timezone || undefined,
  };
}
