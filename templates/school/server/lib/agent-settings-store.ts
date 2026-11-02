import { getOrgSetting, putOrgSetting } from "@agent-native/core/settings";
import {
  resolveAgentSettings,
  storedAgentSettings,
  withCurrentModels,
  type AgentSettings,
} from "../../shared/agent-settings.js";
import { withOrgSettingLock } from "./org-setting-lock.js";
import { agentModelChoices } from "./agent-models.js";

const currentModels = () => agentModelChoices().map((c) => c.id);

/** Whether stored settings name a model the list now offers a newer one of. */
export function hasOlderModel(settings: AgentSettings): boolean {
  return withCurrentModels(settings, currentModels()).changed;
}

/**
 * The assistant's settings live in the school's own config, so each school's
 * numbers are its own and the admin edits the values that are enforced. The
 * defaults are written in once — when the school is set up, or the first time
 * an older school's settings are read — and only fill what is missing.
 *
 * The one thing changed in a stored value is a model that has been superseded:
 * a school on Sonnet 4.6 is moved to Sonnet 5.5 once the list offers it, the
 * same family, newer and cheaper. It is written back, so the settings screen
 * shows the model that runs.
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
  if (first && !hasOlderModel(first)) return first;
  return withOrgSettingLock(`${schoolId}:school-config`, async () => {
    const config = await read();
    const already = storedAgentSettings(config.agent);
    if (already && !hasOlderModel(already)) return already;
    const { settings } = withCurrentModels(
      already ?? resolveAgentSettings(config.agent),
      currentModels(),
    );
    await putOrgSetting(schoolId, "school-config", {
      ...config,
      agent: settings,
    } as any);
    return settings;
  });
}
