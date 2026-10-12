import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { and, eq, inArray } from "drizzle-orm";
import { nanoid } from "nanoid";
import { z } from "zod";
import { getDb, schema } from "../server/db/index.js";
import { findPeriod } from "../shared/school-week.js";
import {
  assertTermCanTakeRow,
  findTerm,
  loadSchoolConfig,
} from "../server/lib/timetable.js";
import {
  PROPOSAL_STALE,
  staleReason,
  termFingerprint,
} from "../server/lib/timetable-generation.js";
import type { ProposedLesson } from "../server/lib/timetable-generator.js";

export default defineAction({
  description:
    "Put a drafted timetable on its term: every lesson in the draft is added, doubles kept as doubles, and the draft is closed. Refuses a draft that is no longer waiting, and one the timetable has moved on from (a lesson changed, added or removed since, or a class in the draft is no longer active); generate again in that case.",
  schema: z.object({ proposalId: z.string() }),
  http: { method: "POST" },
  run: async (args) => {
    const { orgId, userEmail } = currentAccess();
    if (!orgId) throw new Error("No school context.");
    const db = getDb();
    const P = schema.timetableProposals;
    const [row] = await db
      .select()
      .from(P)
      .where(and(eq(P.id, args.proposalId), eq(P.schoolId, orgId)))
      .limit(1);
    if (!row) throw new Error("That draft is not in this school.");
    if (row.status !== "open") {
      throw new Error("That draft isn't waiting any more. Generate a new one.");
    }
    const term = await findTerm(orgId, row.termId);
    if (!term) throw new Error("That term is not in this school.");

    // Claim it first, so two accepts at once cannot both add the lessons.
    const claimed = await db
      .update(P)
      .set({ status: "accepted" })
      .where(and(eq(P.id, row.id), eq(P.schoolId, orgId), eq(P.status, "open")))
      .returning({ id: P.id });
    if (claimed.length !== 1) {
      throw new Error("This proposal has already been accepted or discarded.");
    }

    let rows: any[] = [];
    const pairs = new Map<string, string>();
    try {
      const lessons: ProposedLesson[] = JSON.parse(row.lessonsJson);
      const classIds = [...new Set(lessons.map((l) => l.classId))];
      const live = classIds.length
        ? await db
            .select({
              id: schema.classes.id,
              roomNumber: schema.classes.roomNumber,
              armId: schema.classes.armId,
            })
            .from(schema.classes)
            .where(
              and(
                eq(schema.classes.orgId, orgId),
                eq(schema.classes.status, "active"),
                inArray(schema.classes.id, classIds),
              ),
            )
        : [];
      const stale = staleReason(
        { baseFingerprint: row.baseFingerprint, classIds },
        live.map((c: any) => c.id as string),
        await termFingerprint(orgId, row.termId),
      );
      if (stale) throw new Error(stale);

      const config = await loadSchoolConfig(orgId);
      if (!config.schoolWeek) {
        throw new Error(
          "The school hasn't set its week yet, so there are no periods to place lessons in. Set it in Settings → School week.",
        );
      }
      if (lessons.length > 0) await assertTermCanTakeRow(orgId, term);

      // A room is written only when it differs from the class's own (or its
      // arm's home room), so a later change to either still carries through.
      const homeRoom = new Map(
        (
          await db
            .select({ id: schema.arms.id, homeRoom: schema.arms.homeRoom })
            .from(schema.arms)
            .where(eq(schema.arms.schoolId, orgId))
        ).map((a: any) => [
          a.id as string,
          (a.homeRoom ?? null) as string | null,
        ]),
      );
      const defaultRoom = new Map(
        live.map((c: any) => [
          c.id as string,
          (c.roomNumber ?? (c.armId ? homeRoom.get(c.armId) : null) ?? null) as
            | string
            | null,
        ]),
      );

      // A fresh pair id per double, shared by its two rows.
      const pairFor = (key: string | null) => {
        if (!key) return null;
        if (!pairs.has(key)) pairs.set(key, nanoid());
        return pairs.get(key)!;
      };
      rows = lessons.map((l) => {
        const slot = findPeriod(config.schoolWeek, l.day, l.periodNumber);
        // The week moved on since the draft: its slot is not a lesson now.
        if (!slot || slot.kind !== "lesson") throw new Error(PROPOSAL_STALE);
        return {
          id: nanoid(),
          classId: l.classId,
          schoolId: orgId,
          termId: row.termId,
          dayOfWeek: l.day,
          periodNumber: l.periodNumber,
          startTime: slot.start,
          endTime: slot.end,
          room: l.room && l.room === defaultRoom.get(l.classId) ? null : l.room,
          pairId: pairFor(l.pairKey),
          ownerEmail: userEmail ?? "",
          orgId,
          visibility: "org" as const,
        };
      });
      // One insert, so a failure leaves the term with none of it.
      if (rows.length > 0) await db.insert(schema.classSchedules).values(rows);
    } catch (error) {
      await db
        .update(P)
        .set({ status: "open" })
        .where(and(eq(P.id, row.id), eq(P.schoolId, orgId)));
      throw error;
    }

    const doubles = pairs.size;
    return {
      accepted: true,
      lessons: rows.length,
      doubles,
      message:
        rows.length === 0
          ? `The draft had no lessons to add to ${term.name}; it is closed.`
          : `Added ${rows.length} ${rows.length === 1 ? "lesson" : "lessons"} to ${term.name}${doubles ? `, ${doubles} of them as ${doubles === 1 ? "a double" : "doubles"}` : ""}.`,
    };
  },
});
