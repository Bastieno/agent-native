// guard:allow-unscoped — every query here is scoped to the caller's own user id (their own student record and submissions), never to a request argument.
import { getOrgSetting } from "@agent-native/core/settings";
import { and, eq, inArray, isNotNull } from "drizzle-orm";
import { sql } from "drizzle-orm";
import { getDb, schema } from "../db/index.js";
import { actorForEmail } from "./class-access.js";
import { activityWindow } from "./activity-window.js";
import { ensureAgentSettings } from "./agent-settings-store.js";
import {
  audienceForRole,
  DEFAULT_SCHOOL_TIMEZONE,
  learnerAgentOn,
  storedAgentSettings,
  schoolDay,
  type AgentAudience,
  type AgentSettings,
} from "../../shared/agent-settings.js";

/**
 * Whether this person may talk to the assistant right now, and on which model.
 *
 * Runs on the server for every chat message, because hiding the chat button is
 * not a control: a learner can POST to the chat endpoint from the console. The
 * settings screen and the learner layout read the same answer through
 * `get-my-agent-access`, so what a learner is shown and what the server does
 * never disagree.
 */

export type AgentBlock = "off" | "sitting" | "limit";

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
}

async function whoIs(
  email: string | null | undefined,
  orgId?: string | null,
): Promise<Who> {
  const actor = email ? await actorForEmail(email) : null;
  return {
    userId: actor?.userId ?? null,
    schoolId: actor?.schoolId ?? orgId ?? null,
    // Someone setting a school up has no profile yet and is its admin.
    role: actor?.schoolRole ?? "school_admin",
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
  const row = (await getDb().get(
    sql`SELECT count FROM agent_message_usage WHERE id = ${`${userId}:${day}`} LIMIT 1`,
  )) as { count: number } | undefined;
  return Number(row?.count ?? 0);
}

async function countMessage(who: Who, day: string): Promise<void> {
  if (!who.userId) return;
  const now = new Date().toISOString();
  await getDb().run(
    sql`INSERT INTO agent_message_usage (id, school_id, user_id, day, count, updated_at)
        VALUES (${`${who.userId}:${day}`}, ${who.schoolId ?? ""}, ${who.userId}, ${day}, 1, ${now})
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
 * The chat plugin's gate: refuse with a calm reply, or count the message and
 * pin the model. A continuation the framework sends on its own to finish a
 * long answer is not a new message and is not counted.
 */
export async function gateAgentMessage(details: {
  ownerEmail: string | null;
  orgId?: string | null;
  internalContinuation?: boolean;
}): Promise<{ model?: string } | { reply: string }> {
  const access = await agentAccessFor(details.ownerEmail, details.orgId);
  if (access.blocked && access.message) {
    // A continuation of an answer already under way finishes on the model,
    // unless the person has since been switched off or started a paper.
    if (!(details.internalContinuation && access.blocked === "limit")) {
      return { reply: access.message };
    }
  }
  if (!details.internalContinuation) {
    await countMessage(access.who, access.day);
  }
  return access.model ? { model: access.model } : {};
}
