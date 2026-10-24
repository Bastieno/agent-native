/**
 * How the school's assistant behaves for each kind of person, as the admin
 * set it. Stored inside the school config under `agent`; anything the admin
 * has not set falls back to the defaults below, so a school that never opens
 * the settings still gets a cheap, capped assistant for its learners.
 *
 * Shared by the server (which enforces it) and the settings screen (which
 * edits it), so both read the same defaults.
 */

/** The three kinds of person the settings are written for. */
export type AgentAudience = "learner" | "teacher" | "admin";

export const AGENT_AUDIENCES: AgentAudience[] = ["learner", "teacher", "admin"];

export interface AgentSettings {
  /** The assistant for learners, school-wide. */
  learnerAgentEnabled: boolean;
  /**
   * Year groups that differ from the school-wide switch, by grade level id.
   * A year group not listed follows the switch.
   */
  learnerAgentByYearGroup: Record<string, boolean>;
  /** The model each kind of person's assistant runs on. */
  models: Record<AgentAudience, string>;
  /** Messages a person may send in a school day. Null is no limit. */
  dailyMessageLimits: Record<AgentAudience, number | null>;
  /**
   * Requests the whole school may hand to the assistant in a school day from
   * people's own AI apps (Claude, ChatGPT) through `ask_app`. Those apps call
   * the school's tools directly for most work, at no cost to the school; a
   * request handed to the assistant runs on the school's model, so it is
   * capped for the school as a whole. Null is no limit.
   */
  chatAppDailyLimit: number | null;
  /**
   * Messages the whole school may send the assistant in a school day, by every
   * way in together: chat in the app, sub-agents, jobs, agent-to-agent and
   * requests from AI apps. It sits above each person's own limit, so one
   * school cannot run up the bill whatever its people's limits add up to.
   * Null is no limit.
   */
  dailySchoolLimit: number | null;
}

export const LEARNER_DEFAULT_MODEL = "claude-haiku-4-5";
/** The framework's Sonnet default, at the time of writing. */
export const STAFF_DEFAULT_MODEL = "claude-sonnet-4-6";

export const DEFAULT_AGENT_SETTINGS: AgentSettings = {
  learnerAgentEnabled: true,
  learnerAgentByYearGroup: {},
  models: {
    learner: LEARNER_DEFAULT_MODEL,
    teacher: STAFF_DEFAULT_MODEL,
    admin: STAFF_DEFAULT_MODEL,
  },
  dailyMessageLimits: { learner: 30, teacher: 200, admin: null },
  chatAppDailyLimit: 20,
  // Room for a normal pilot day — a few hundred learner questions on the
  // cheap model and the staff's work on top — while capping the worst day.
  dailySchoolLimit: 500,
};

/** The time a school day is counted in when the school has not said. */
export const DEFAULT_SCHOOL_TIMEZONE = "Africa/Lagos";

function isLimit(v: unknown): v is number | null {
  return v === null || (typeof v === "number" && Number.isFinite(v) && v >= 0);
}

/**
 * The settings exactly as a school has them stored, or null when anything is
 * missing or malformed. This is what enforcement reads: it never fills a gap
 * from the defaults, so a value the admin can see is the value that runs.
 * Unlimited is a stored null, like any other limit.
 */
export function storedAgentSettings(stored: unknown): AgentSettings | null {
  if (!stored || typeof stored !== "object") return null;
  const s = stored as Record<string, any>;
  if (typeof s.learnerAgentEnabled !== "boolean") return null;
  if (!s.models || !s.dailyMessageLimits) return null;
  for (const who of AGENT_AUDIENCES) {
    if (typeof s.models[who] !== "string" || !s.models[who]) return null;
    if (!(who in s.dailyMessageLimits) || !isLimit(s.dailyMessageLimits[who]))
      return null;
  }
  const byYear =
    s.learnerAgentByYearGroup && typeof s.learnerAgentByYearGroup === "object"
      ? s.learnerAgentByYearGroup
      : null;
  if (!byYear) return null;
  // Stored before this setting existed: not complete, so it is seeded once.
  if (!("chatAppDailyLimit" in s) || !isLimit(s.chatAppDailyLimit)) return null;
  if (!("dailySchoolLimit" in s) || !isLimit(s.dailySchoolLimit)) return null;
  return {
    learnerAgentEnabled: s.learnerAgentEnabled,
    learnerAgentByYearGroup: Object.fromEntries(
      Object.entries(byYear).filter(([, on]) => typeof on === "boolean"),
    ) as Record<string, boolean>,
    models: { ...s.models },
    dailyMessageLimits: { ...s.dailyMessageLimits },
    chatAppDailyLimit: s.chatAppDailyLimit,
    dailySchoolLimit: s.dailySchoolLimit,
  };
}

/**
 * What to seed a school with: whatever it already has stored, and the
 * defaults for anything it does not. Used only when writing the settings
 * into the school config, never when enforcing them.
 */
export function resolveAgentSettings(stored: unknown): AgentSettings {
  const s = (stored && typeof stored === "object" ? stored : {}) as Record<
    string,
    any
  >;
  const models = { ...DEFAULT_AGENT_SETTINGS.models };
  const limits = { ...DEFAULT_AGENT_SETTINGS.dailyMessageLimits };
  for (const who of AGENT_AUDIENCES) {
    const m = s.models?.[who];
    if (typeof m === "string" && m) models[who] = m;
    if (s.dailyMessageLimits && who in s.dailyMessageLimits) {
      const l = s.dailyMessageLimits[who];
      if (isLimit(l)) limits[who] = l === null ? null : Math.floor(l);
    }
  }
  const byYear: Record<string, boolean> = {};
  if (
    s.learnerAgentByYearGroup &&
    typeof s.learnerAgentByYearGroup === "object"
  ) {
    for (const [id, on] of Object.entries(s.learnerAgentByYearGroup)) {
      if (typeof on === "boolean") byYear[id] = on;
    }
  }
  return {
    learnerAgentEnabled:
      typeof s.learnerAgentEnabled === "boolean"
        ? s.learnerAgentEnabled
        : DEFAULT_AGENT_SETTINGS.learnerAgentEnabled,
    learnerAgentByYearGroup: byYear,
    models,
    dailyMessageLimits: limits,
    chatAppDailyLimit:
      "chatAppDailyLimit" in s && isLimit(s.chatAppDailyLimit)
        ? s.chatAppDailyLimit === null
          ? null
          : Math.floor(s.chatAppDailyLimit)
        : DEFAULT_AGENT_SETTINGS.chatAppDailyLimit,
    dailySchoolLimit:
      "dailySchoolLimit" in s && isLimit(s.dailySchoolLimit)
        ? s.dailySchoolLimit === null
          ? null
          : Math.floor(s.dailySchoolLimit)
        : DEFAULT_AGENT_SETTINGS.dailySchoolLimit,
  };
}

/** Whether a learner in this year group has the assistant. */
export function learnerAgentOn(
  settings: AgentSettings,
  gradeLevelId: string | null | undefined,
): boolean {
  if (gradeLevelId && gradeLevelId in settings.learnerAgentByYearGroup) {
    return settings.learnerAgentByYearGroup[gradeLevelId];
  }
  return settings.learnerAgentEnabled;
}

/** Which settings apply to a school role. Coordinators are teachers here. */
export function audienceForRole(
  role: string | null | undefined,
): AgentAudience {
  if (role === "student") return "learner";
  if (role === "school_admin") return "admin";
  return "teacher";
}

/** The calendar day, YYYY-MM-DD, in the school's own timezone. */
export function schoolDay(timeZone: string, now: Date = new Date()): string {
  try {
    return new Intl.DateTimeFormat("en-CA", {
      timeZone,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(now);
  } catch {
    return schoolDay(DEFAULT_SCHOOL_TIMEZONE, now);
  }
}
