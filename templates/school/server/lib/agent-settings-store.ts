import { getOrgSetting, putOrgSetting } from "@agent-native/core/settings";
import {
  resolveAgentSettings,
  storedAgentSettings,
  type AgentSettings,
} from "../../shared/agent-settings.js";
import { withOrgSettingLock } from "./org-setting-lock.js";

/**
 * The assistant's settings live in the school's own config, so each school's
 * numbers are its own and the admin edits the values that are enforced. The
 * defaults are written in once — when the school is set up, or the first time
 * an older school's settings are read — and only fill what is missing: a
 * value already stored is never overwritten.
 */
export async function ensureAgentSettings(
  schoolId: string,
): Promise<AgentSettings> {
  const read = async () =>
    ((await getOrgSetting(schoolId, "school-config")) ?? {}) as Record<
      string,
      unknown
    >;
  const first = storedAgentSettings((await read()).agent);
  if (first) return first;
  return withOrgSettingLock(`${schoolId}:school-config`, async () => {
    const config = await read();
    const already = storedAgentSettings(config.agent);
    if (already) return already;
    const seeded = resolveAgentSettings(config.agent);
    await putOrgSetting(schoolId, "school-config", {
      ...config,
      agent: seeded,
    } as any);
    return seeded;
  });
}
