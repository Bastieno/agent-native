import { useQuery, useQueryClient } from "@tanstack/react-query";
import { agentNativePath } from "@agent-native/core/client";
import { nanoid } from "nanoid";
import { toast } from "sonner";
import { doubleSecondPeriod, type SchoolWeek } from "@shared/school-week";
// Types only: erased at build, so nothing from the server reaches the client.
import type {
  Clash,
  ResolvedPeriod,
} from "../../../server/lib/timetable-clashes";
import { callAction } from "./arms-shared";

export type { Clash, ResolvedPeriod };

export interface TimetableReply {
  term: { id: string; name: string } | null;
  week: SchoolWeek | null;
  dayNames: Record<number, string>;
  periods: ResolvedPeriod[];
  clashes: Clash[];
  fromUntermedRows: boolean;
  termEmpty: boolean;
  previousTerm: { id: string; name: string } | null;
  message: string;
}

export interface CoverageClass {
  classId: string;
  className: string;
  subjectName: string;
  armId: string | null;
  required: { periods: number; doubles: number } | null;
  placed: { periods: number; doubles: number };
  short: { periods: number; doubles: number };
}

export interface CoverageReply {
  term: { id: string; name: string } | null;
  classes: CoverageClass[];
  unset: number;
  message: string;
}

export interface TimetableFilter {
  termId?: string;
  armId?: string;
  teacherUserId?: string;
  room?: string;
}

/** A class as `list-classes` returns it: what a placement needs to draw. */
export interface ClassOption {
  id: string;
  name: string;
  subjectName: string | null;
  armId: string | null;
  optionArmIds: string[];
  primaryTeacherUserId: string;
  teacherName: string | null;
  teacherAssigned: boolean;
  roomNumber: string | null;
}

/** A GET action with its arguments in the query string. */
export async function getAction<T>(
  name: string,
  params: Record<string, string | undefined>,
): Promise<T> {
  const query = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) if (v) query.set(k, v);
  const qs = query.toString();
  const res = await fetch(
    agentNativePath(`/_agent-native/actions/${name}${qs ? `?${qs}` : ""}`),
  );
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error((err as any).error ?? "Request failed");
  }
  return res.json();
}

export const timetableKey = (f: TimetableFilter) => [
  "timetable",
  f.termId ?? null,
  f.armId ?? null,
  f.teacherUserId ?? null,
  f.room ?? null,
];

export function useTimetable(filter: TimetableFilter, enabled: boolean) {
  return useQuery<TimetableReply>({
    queryKey: timetableKey(filter),
    queryFn: () =>
      getAction<TimetableReply>("get-timetable", { ...filter } as any),
    enabled,
    // A refusal (a term not in this school) says the same thing on a retry,
    // and backing off between retries left the page on a skeleton. Show it.
    retry: false,
  });
}

/**
 * What is still missing for what is in view. Keyed under the timetable's own
 * ["timetable", termId] prefix, so whatever refreshes the grid refreshes this.
 * Not asked for a room view: a room has no classes of its own to count.
 */
export function useCoverage(filter: TimetableFilter, enabled: boolean) {
  return useQuery<CoverageReply>({
    queryKey: [
      "timetable",
      filter.termId ?? null,
      "coverage",
      filter.armId ?? null,
      filter.teacherUserId ?? null,
    ],
    queryFn: () =>
      getAction<CoverageReply>("get-timetable-coverage", {
        termId: filter.termId,
        armId: filter.armId,
        teacherUserId: filter.teacherUserId,
      }),
    enabled: enabled && filter.room === undefined,
    retry: false,
  });
}

export interface PlaceInput {
  cls: ClassOption;
  day: number;
  periodNumber: number;
  start: string;
  end: string;
  /**
   * A room from the list; "" for the class's own room. Omitted: a moved
   * placement keeps its room, a new one takes its class's.
   */
  room?: string;
  /** The placement being changed, when not adding one. */
  scheduleId?: string;
  /** true: a double with the next lesson period; false: one period. Omitted keeps what it is. */
  double?: boolean;
  /** The lesson's own name; "" or null clears it. Omitted keeps it. */
  lessonLabel?: string | null;
}

/**
 * Placing and removing, optimistically: the grid changes on the click, the
 * server's clashes replace ours when it answers, and a refusal puts the grid
 * back and says why.
 */
export function useTimetableEdits(filter: TimetableFilter) {
  const qc = useQueryClient();
  const key = timetableKey(filter);

  const snapshot = async () => {
    await qc.cancelQueries({ queryKey: key });
    return qc.getQueryData<TimetableReply>(key);
  };
  /**
   * Put back only the rows a failed edit touched. Restoring the whole grid
   * would also undo an edit made since, while this one was in flight.
   */
  const rollbackRows = (
    ids: string[],
    before: TimetableReply,
    originals: ResolvedPeriod[],
  ) =>
    qc.setQueryData<TimetableReply>(key, (cur) => {
      if (!cur) return cur;
      const touched = (c: Clash) => c.scheduleIds.some((x) => ids.includes(x));
      return {
        ...cur,
        periods: [
          ...cur.periods.filter((p) => !ids.includes(p.scheduleId)),
          ...originals,
        ],
        clashes: [
          ...cur.clashes.filter((c) => !touched(c)),
          ...before.clashes.filter(touched),
        ],
      };
    });

  // No refetch of our own: a successful action already tells every open
  // page to refetch, and a refused one changed nothing, so the rollback is
  // the truth. Until then the reply's clashes stand.

  async function place(input: PlaceInput) {
    const before = await snapshot();
    if (!filter.termId) {
      toast.error("Choose a term first.");
      return;
    }
    const { cls } = input;
    const id = input.scheduleId ?? `tmp-${nanoid()}`;
    const old = before?.periods.find((p) => p.scheduleId === input.scheduleId);
    const oldPartner = old?.pairId
      ? before?.periods.find(
          (p) => p.pairId === old.pairId && p.scheduleId !== old.scheduleId,
        )
      : undefined;
    // The draft writes both halves of a double, as the server will.
    const wantDouble = input.double ?? !!old?.pairId;
    const second = wantDouble
      ? doubleSecondPeriod(before?.week, input.day, input.periodNumber).second
      : null;
    const partnerId = second
      ? (oldPartner?.scheduleId ?? `tmp-${nanoid()}`)
      : null;
    const pairId = second ? (old?.pairId ?? `tmp-${nanoid()}`) : null;
    const lessonLabel =
      input.lessonLabel === undefined
        ? (old?.lessonLabel ?? null)
        : input.lessonLabel?.trim() || null;
    const draft: ResolvedPeriod = {
      scheduleId: id,
      classId: cls.id,
      className: cls.name,
      subjectName: cls.subjectName ?? "",
      termId: filter.termId,
      day: input.day,
      periodNumber: input.periodNumber,
      start: input.start,
      end: input.end,
      // The server falls back to the arm's home room too; its refetch fills it.
      room:
        input.room === undefined && old
          ? old.room
          : input.room || cls.roomNumber || null,
      teachers:
        old && old.classId === cls.id
          ? old.teachers
          : cls.teacherAssigned
            ? [
                {
                  userId: cls.primaryTeacherUserId,
                  name: cls.teacherName ?? "A teacher",
                },
              ]
            : [],
      armId: cls.armId,
      optionArmIds: cls.optionArmIds,
      learnerUserIds: old?.learnerUserIds ?? [],
      pairId,
      lessonLabel,
    };
    const drafts: ResolvedPeriod[] = [draft];
    if (second && partnerId) {
      drafts.push({
        ...draft,
        scheduleId: partnerId,
        periodNumber: second.number,
        start: second.start,
        end: second.end,
      });
    }
    // Every row this edit touches: a split drops the old second half.
    const touched = [
      id,
      ...(partnerId ? [partnerId] : []),
      ...(oldPartner && oldPartner.scheduleId !== partnerId
        ? [oldPartner.scheduleId]
        : []),
    ];
    const originals = [old, oldPartner].filter(Boolean) as ResolvedPeriod[];
    // With nothing cached there is no grid to change yet; the call still goes
    // and its reply is shown.
    if (before)
      qc.setQueryData<TimetableReply>(key, {
        ...before,
        periods: [
          ...before.periods.filter((p) => !touched.includes(p.scheduleId)),
          ...drafts,
        ],
        clashes: before.clashes.filter(
          (c) => !c.scheduleIds.some((x) => touched.includes(x)),
        ),
      });

    try {
      const reply = await callAction("set-timetable-period", {
        termId: filter.termId,
        classId: cls.id,
        day: input.day,
        periodNumber: input.periodNumber,
        // Omitted keeps a moved placement's room (a new one takes its
        // class's); "" means the class's own.
        ...(input.room !== undefined ? { room: input.room } : {}),
        ...(input.scheduleId ? { scheduleId: input.scheduleId } : {}),
        ...(input.double !== undefined ? { double: input.double } : {}),
        ...(input.lessonLabel !== undefined
          ? { lessonLabel: input.lessonLabel }
          : {}),
      });
      qc.setQueryData<TimetableReply>(key, (cur) => {
        if (!cur) return cur;
        const real = reply.scheduleId as string;
        const realPartner = (reply.partnerScheduleId as string | null) ?? null;
        const realIds = [real, ...(realPartner ? [realPartner] : [])];
        return {
          ...cur,
          periods: cur.periods.map((p) =>
            p.scheduleId === id
              ? { ...p, scheduleId: real, pairId: reply.pairId ?? null }
              : partnerId && p.scheduleId === partnerId && realPartner
                ? { ...p, scheduleId: realPartner, pairId: reply.pairId }
                : p,
          ),
          clashes: [
            ...cur.clashes.filter(
              (c) => !c.scheduleIds.some((x) => realIds.includes(x)),
            ),
            ...((reply.clashes ?? []) as Clash[]),
          ],
        };
      });
      if (reply.clashes?.length) toast.warning(reply.message);
      else if (!before && reply.message) toast.success(reply.message);
    } catch (e: any) {
      if (before) rollbackRows(touched, before, originals);
      toast.error(e?.message ?? "That couldn't be placed.");
    }
  }

  async function remove(scheduleId: string) {
    const before = await snapshot();
    const original = before?.periods.find((p) => p.scheduleId === scheduleId);
    // Either half of a double takes out both.
    const originals = original?.pairId
      ? before!.periods.filter((p) => p.pairId === original.pairId)
      : original
        ? [original]
        : [];
    const ids = originals.length
      ? originals.map((p) => p.scheduleId)
      : [scheduleId];
    if (before)
      qc.setQueryData<TimetableReply>(key, {
        ...before,
        periods: before.periods.filter((p) => !ids.includes(p.scheduleId)),
        clashes: before.clashes.filter(
          (c) => !c.scheduleIds.some((x) => ids.includes(x)),
        ),
      });
    try {
      const reply = await callAction("remove-timetable-period", { scheduleId });
      if (!before && reply?.message) toast.success(reply.message);
    } catch (e: any) {
      if (before) rollbackRows(ids, before, originals);
      toast.error(e?.message ?? "That couldn't be removed.");
    }
  }

  return { place, remove };
}
