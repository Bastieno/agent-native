// guard:allow-unscoped — every query here is scoped to the caller's own user id (their own student record and submissions), never to a request argument.
import { getOrgSetting } from "@agent-native/core/settings";
import { and, eq, inArray, isNotNull } from "drizzle-orm";
import { sql } from "drizzle-orm";
import { getDb, schema } from "../db/index.js";
import { actorForEmail } from "./class-access.js";
import { activityWindow } from "./activity-window.js";
import { ensureAgentSettings } from "./agent-settings-store.js";
import { toolFilterForRole } from "./role-tools.js";
import type { SchoolRole } from "./action-policy.js";
import { isOrgMember } from "./signup-access.js";
import {
  audienceForRole,
  DEFAULT_SCHOOL_TIMEZONE,
  learnerAgentOn,
  storedAgentSettings,
  schoolDay,
  type AgentAudience,
  type AgentSettings,
} from "../../shared/agent-settings.js";
import { rowOf, runSql } from "./raw-sql.js";

/**
 * Whether this person may talk to the assistant right now, and on which model.
 *
 * Runs on the server for every chat message, because hiding the chat button is
 * not a control: a learner can POST to the chat endpoint from the console. The
 * settings screen and the learner layout read the same answer through
 * `get-my-agent-access`, so what a learner is shown and what the server does
 * never disagree.
 */

export type AgentBlock = "none" | "off" | "sitting" | "limit" | "school-limit";

export interface AgentAccess {
  audience: AgentAudience;
  /**
   * The model this person's turns run on, whatever the client asked for.
   * Null only for someone with no school yet, who gets the app's own model.
   */
  model: string | null;
  /** Why the assistant is unavailable, or null when it is available. */
  blocked: AgentBlock | null;
  /** What to say instead, in the person's own terms. */
  message: string | null;
  /** Messages sent today and the day's allowance (null: no limit). */
  used: number;
  limit: number | null;
  /** The paper being sat, when blocked for that. */
  sittingTitle?: string;
}

interface Who {
  userId: string | null;
  schoolId: string | null;
  role: string | null;
  /** No profile and no school membership: not part of any school. */
  noSchool?: boolean;
}

async function whoIs(
  email: string | null | undefined,
  orgId?: string | null,
): Promise<Who> {
  const actor = email ? await actorForEmail(email) : null;
  // Someone with no profile is setting a school up (a provisioned head) only
  // if a school counts them as a member. Anyone else belongs to no school and
  // gets no assistant: it is the deployment's model bill, not theirs.
  const noSchool = !actor && !(email && (await isOrgMember(email)));
  return {
    userId: actor?.userId ?? null,
    schoolId: actor?.schoolId ?? (noSchool ? null : (orgId ?? null)),
    // Someone setting a school up has no profile yet and is its admin.
    role: actor?.schoolRole ?? (noSchool ? null : "school_admin"),
    noSchool,
  };
}

async function schoolSettings(
  schoolId: string | null,
): Promise<{ settings: AgentSettings | null; timeZone: string }> {
  if (!schoolId) return { settings: null, timeZone: DEFAULT_SCHOOL_TIMEZONE };
  const config = ((await getOrgSetting(schoolId, "school-config")) ??
    {}) as any;
  // Only what the school has stored. A school whose settings were never
  // written gets them written now, once, and then read back like any other.
  const settings =
    storedAgentSettings(config?.agent) ?? (await ensureAgentSettings(schoolId));
  return {
    settings,
    timeZone:
      config?.schoolTimezone || config?.timezone || DEFAULT_SCHOOL_TIMEZONE,
  };
}

/**
 * The timed paper this learner is in the middle of, if any: one with a time
 * allowed, started, not yet handed in, and its clock still running.
 */
export async function paperBeingSat(
  userId: string,
): Promise<{ assessmentId: string; title: string } | null> {
  const db = getDb();
  const rows = await db
    .select({
      assessmentId: schema.assessments.id,
      title: schema.assessments.title,
      status: schema.assessments.status,
      opensAt: schema.assessments.opensAt,
      closesAt: schema.assessments.closesAt,
      durationMinutes: schema.assessments.durationMinutes,
      startedAt: schema.submissions.startedAt,
    })
    .from(schema.submissions)
    .innerJoin(
      schema.students,
      eq(schema.students.id, schema.submissions.studentId),
    )
    .innerJoin(
      schema.assessments,
      eq(schema.assessments.id, schema.submissions.assessmentId),
    )
    .where(
      and(
        eq(schema.students.userId, userId),
        isNotNull(schema.submissions.startedAt),
        inArray(schema.submissions.status, [
          "not_started",
          "draft",
          "resubmission_requested",
        ]),
      ),
    );
  for (const r of rows as any[]) {
    // Untimed work — homework, a reading — is exactly what the tutor is for.
    // Only a paper with its own clock is "being sat".
    if (!r.durationMinutes) continue;
    if (activityWindow(r, r.startedAt).isOpen) {
      return { assessmentId: r.assessmentId, title: r.title };
    }
  }
  return null;
}

async function learnerGradeLevel(userId: string): Promise<string | null> {
  const [row] = await getDb()
    .select({ gradeLevelId: schema.students.gradeLevelId })
    .from(schema.students)
    .where(eq(schema.students.userId, userId))
    .limit(1);
  return row?.gradeLevelId ?? null;
}

async function usedToday(userId: string, day: string): Promise<number> {
  const row = (await rowOf(
    sql`SELECT count FROM agent_message_usage WHERE id = ${`${userId}:${day}`} LIMIT 1`,
  )) as { count: number } | undefined;
  return Number(row?.count ?? 0);
}

async function countMessage(who: Who, day: string): Promise<void> {
  if (!who.userId) return;
  const now = new Date().toISOString();
  await runSql(
    sql`INSERT INTO agent_message_usage (id, school_id, user_id, day, count, updated_at)
        VALUES (${`${who.userId}:${day}`}, ${who.schoolId ?? ""}, ${who.userId}, ${day}, 1, ${now})
        ON CONFLICT (id) DO UPDATE SET count = agent_message_usage.count + 1, updated_at = ${now}`,
  );
}

/**
 * Messages the whole school has sent the assistant today: the sum of every
 * person's count. The AI-app allowance's own row counts the same requests a
 * second time, so it is left out.
 */
async function schoolMessagesToday(
  schoolId: string,
  day: string,
): Promise<number> {
  const row = (await rowOf(
    sql`SELECT COALESCE(SUM(count), 0) AS total FROM agent_message_usage
        WHERE school_id = ${schoolId} AND day = ${day} AND id NOT LIKE ${"chat-apps:%"}`,
  )) as { total: number } | undefined;
  return Number(row?.total ?? 0);
}

/**
 * Requests the school's members handed to the assistant from their own AI
 * apps today, school-wide. Kept in the same table as each person's count,
 * under a row of the school's own.
 */
function chatAppRowId(schoolId: string, day: string): string {
  return `chat-apps:${schoolId}:${day}`;
}

async function chatAppRequestsToday(
  schoolId: string,
  day: string,
): Promise<number> {
  const row = (await rowOf(
    sql`SELECT count FROM agent_message_usage WHERE id = ${chatAppRowId(schoolId, day)} LIMIT 1`,
  )) as { count: number } | undefined;
  return Number(row?.count ?? 0);
}

async function countChatAppRequest(schoolId: string, day: string) {
  const now = new Date().toISOString();
  await runSql(
    sql`INSERT INTO agent_message_usage (id, school_id, user_id, day, count, updated_at)
        VALUES (${chatAppRowId(schoolId, day)}, ${schoolId}, ${`school:${schoolId}`}, ${day}, 1, ${now})
        ON CONFLICT (id) DO UPDATE SET count = agent_message_usage.count + 1, updated_at = ${now}`,
  );
}

function blockedMessage(
  why: AgentBlock,
  audience: AgentAudience,
  limit: number | null,
  title?: string,
): string {
  if (why === "sitting") {
    return `I'm switched off while you sit "${title}", so the work stays yours. I'll be back once you've handed it in — good luck!`;
  }
  if (why === "none") {
    return "You're not part of a school here yet, so the assistant isn't available. Ask your school to invite you.";
  }
  if (why === "school-limit") {
    return audience === "learner"
      ? "The school's assistant has answered all it can for today. It will be back tomorrow — meanwhile, have another go on your own or ask your teacher."
      : `The school has used today's ${limit} messages with the assistant, across everyone. It resets tomorrow; an admin can raise the school's limit in Settings.`;
  }
  if (why === "off") {
    return "The school has switched the assistant off for now. If you need help, ask your teacher.";
  }
  return audience === "learner"
    ? `That's your ${limit} messages for today. I'll be ready to help again tomorrow — meanwhile, have another go on your own or ask your teacher.`
    : `You've used today's ${limit} messages with the assistant. It resets tomorrow; an admin can raise the limit in Settings.`;
}

/** What applies to this person now. Reads only — counts nothing. */
export async function agentAccessFor(
  email: string | null | undefined,
  orgId?: string | null,
): Promise<AgentAccess & { who: Who; day: string }> {
  const who = await whoIs(email, orgId);
  const audience = audienceForRole(who.role);
  if (who.noSchool) {
    return {
      who,
      day: schoolDay(DEFAULT_SCHOOL_TIMEZONE),
      audience,
      model: null,
      used: 0,
      limit: null,
      blocked: "none",
      message: blockedMessage("none", audience, null),
    };
  }
  const { settings, timeZone } = await schoolSettings(who.schoolId);
  const day = schoolDay(timeZone);
  // Someone with no school yet (an admin mid-setup) has no settings to read.
  const limit = settings ? settings.dailyMessageLimits[audience] : null;
  const used = who.userId ? await usedToday(who.userId, day) : 0;
  const base = {
    who,
    day,
    audience,
    model: settings ? settings.models[audience] : null,
    used,
    limit,
  };

  if (settings && audience === "learner" && who.userId) {
    if (!learnerAgentOn(settings, await learnerGradeLevel(who.userId))) {
      return {
        ...base,
        blocked: "off",
        message: blockedMessage("off", audience, limit),
      };
    }
    const paper = await paperBeingSat(who.userId);
    if (paper) {
      return {
        ...base,
        blocked: "sitting",
        sittingTitle: paper.title,
        message: blockedMessage("sitting", audience, limit, paper.title),
      };
    }
  }
  // The school's total sits above each person's own limit.
  const schoolLimit = settings ? settings.dailySchoolLimit : null;
  if (
    schoolLimit !== null &&
    who.schoolId &&
    (await schoolMessagesToday(who.schoolId, day)) >= schoolLimit
  ) {
    return {
      ...base,
      blocked: "school-limit",
      message: blockedMessage("school-limit", audience, schoolLimit),
    };
  }
  if (limit !== null && used >= limit) {
    return {
      ...base,
      blocked: "limit",
      message: blockedMessage("limit", audience, limit),
    };
  }
  return { ...base, blocked: null, message: null };
}

/**
 * The chat plugin's gate: refuse with a calm reply, or count the message,
 * pin the model and narrow the tools to the person's role (role-tools.ts).
 * A continuation the framework sends on its own to finish a long answer is
 * not a new message and is not counted.
 */
export async function gateAgentMessage(details: {
  ownerEmail: string | null;
  orgId?: string | null;
  internalContinuation?: boolean;
  /** What started a run that is not a chat message; "mcp" is an AI app. */
  source?: string;
}): Promise<
  { model?: string; toolFilter?: (name: string) => boolean } | { reply: string }
> {
  const access = await agentAccessFor(details.ownerEmail, details.orgId);
  if (access.blocked && access.message) {
    // A continuation of an answer already under way finishes on the model,
    // unless the person has since been switched off or started a paper.
    if (
      !(
        details.internalContinuation &&
        (access.blocked === "limit" || access.blocked === "school-limit")
      )
    ) {
      return { reply: access.message };
    }
  }
  // A request handed over from someone's own AI app also counts against the
  // school's allowance for those, which the admin sets (chatAppDailyLimit).
  const schoolId = access.who.schoolId;
  if (details.source === "mcp" && schoolId) {
    const { settings } = await schoolSettings(schoolId);
    const cap = settings ? settings.chatAppDailyLimit : null;
    if (cap !== null && cap !== undefined) {
      if ((await chatAppRequestsToday(schoolId, access.day)) >= cap) {
        return {
          reply: `The school has used today's ${cap} requests to its assistant from AI apps like Claude or ChatGPT. It resets tomorrow. Your AI app can still use the school's tools directly, and the assistant in the school app is not affected; an admin can raise the limit in Settings.`,
        };
      }
    }
    await countChatAppRequest(schoolId, access.day);
  }
  if (!details.internalContinuation) {
    await countMessage(access.who, access.day);
  }
  return {
    ...(access.model ? { model: access.model } : {}),
    // Someone with no school profile yet is setting a school up; the role
    // guard still applies to them, but their tools are not narrowed.
    ...(access.who.userId && access.who.role
      ? { toolFilter: toolFilterForRole(access.who.role as SchoolRole) }
      : {}),
  };
}
