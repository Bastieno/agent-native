/**
 * Record a student's invitation for a school: resolve the year group, check
 * the school's own fields, add the pending invite and the framework's record
 * that the address belongs to the school. Shared by the email invitation and
 * by username accounts the school creates for its learners.
 */
import { putOrgSetting, getOrgSetting } from "@agent-native/core/settings";
import { getDbExec } from "@agent-native/core/db";
import { nanoid } from "nanoid";
import { withOrgSettingLock } from "./org-setting-lock.js";
import { getDb, schema } from "../db/index.js";
import { and, eq, isNull, or } from "drizzle-orm";
import { checkFieldValues, studentFieldDefs } from "./custom-field-values.js";

export interface PendingStudentInvite {
  id: string;
  email: string;
  name: string;
  invitedAt: number;
  /** The year group they are joining, when it is already settled. */
  gradeLevelId?: string;
  gradeLevelName?: string;
  /** Values for the school's own student fields, checked when given. */
  fields?: Record<string, unknown>;
}

export async function recordStudentInvite(args: {
  orgId: string;
  userEmail: string | null | undefined;
  email: string;
  name: string;
  gradeLevel?: string;
  fields?: Record<string, unknown>;
}): Promise<PendingStudentInvite> {
  const { orgId, userEmail, email } = args;
  // The year group by whatever the school calls it. Resolved now rather
  // than at sign-in, so a name nobody has is refused while the person who
  // typed it is still here to correct it.
  let gradeLevelId: string | undefined;
  let gradeLevelName: string | undefined;
  if (args.gradeLevel?.trim()) {
    const db = getDb();
    const wanted = args.gradeLevel.trim();
    const levels = await db
      .select({ id: schema.gradeLevels.id, name: schema.gradeLevels.name })
      .from(schema.gradeLevels)
      // school_id is this table's own scope; org_id is the column the
      // app's access checks read. Rows written before org_id existed have
      // none, and they still belong to the school that owns their
      // school_id — refusing them would tell an admin their own year group
      // does not exist.
      .where(
        and(
          eq(schema.gradeLevels.schoolId, orgId),
          or(
            eq(schema.gradeLevels.orgId, orgId),
            isNull(schema.gradeLevels.orgId),
          ),
        ),
      );
    const match = levels.find(
      (l: any) =>
        l.id === wanted ||
        l.name?.toLowerCase() === wanted.toLowerCase() ||
        l.name?.replace(/\s+/gu, "").toLowerCase() ===
          wanted.replace(/\s+/gu, "").toLowerCase(),
    );
    if (!match) {
      throw new Error(
        `This school has no year group called "${args.gradeLevel}". It has: ${
          levels.map((l: any) => l.name).join(", ") || "none yet"
        }.`,
      );
    }
    gradeLevelId = match.id;
    gradeLevelName = match.name ?? undefined;
  }

  // Whatever else this school records about a student — its own fields,
  // its own options. An unrecognised one is refused rather than stored,
  // because a value no screen can read is worse than no value at all.
  const defs = await studentFieldDefs(orgId);
  const { values: fieldValues, problems } = checkFieldValues(defs, args.fields);
  if (problems.length) {
    throw new Error(problems.join(" "));
  }

  const invite: PendingStudentInvite = {
    id: nanoid(),
    email,
    name: args.name,
    invitedAt: Date.now(),
    ...(gradeLevelId ? { gradeLevelId, gradeLevelName } : {}),
    ...(Object.keys(fieldValues).length ? { fields: fieldValues } : {}),
  };
  // One writer at a time: read, append and write are a single operation.
  // In parallel — the way an agent invites a class — two invitations read
  // the same list and the second write dropped the first. Ten at once lost
  // two; forty lost twelve, with nothing reported to anybody.
  await withOrgSettingLock(`${orgId}:pending-student-invites`, async () => {
    const existingList = ((await getOrgSetting(
      orgId,
      "pending-student-invites",
    )) ?? []) as PendingStudentInvite[];
    if (existingList.some((inv) => inv.email === email)) {
      throw new Error(
        `An invitation is already pending for ${email}. They should check their inbox (or spam folder).`,
      );
    }
    await putOrgSetting(orgId, "pending-student-invites", [
      ...existingList,
      invite,
    ] as any);
  });

  // Without this the framework has no record that the address belongs to
  // this school, so signing up creates the student a brand-new org of their
  // own and every school read — config, classes, grades — comes back empty.
  // invite-staff has always done it; invite-student did not.
  try {
    const exec = getDbExec();
    await exec.execute({
      sql: `INSERT INTO org_invitations (id, org_id, email, invited_by, created_at, status, role) VALUES (?, ?, ?, ?, ?, 'pending', 'member')`,
      args: [nanoid(), orgId, email, userEmail ?? "", Date.now()],
    });
  } catch {
    // Non-fatal — our own pending list is the source of truth for the UI.
  }
  return invite;
}
