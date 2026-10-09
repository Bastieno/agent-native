import { useQuery, useQueryClient } from "@tanstack/react-query";
import { agentNativePath } from "@agent-native/core/client";
import { nanoid } from "nanoid";
import { toast } from "sonner";
import type { SchoolWeek } from "@shared/school-week";
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
  // No refetch of our own: a successful action already tells every open
  // page to refetch, and a refused one changed nothing, so the rollback is
  // the truth. Until then the reply's clashes stand.

  async function place(input: PlaceInput) {
    const before = await snapshot();
    if (!before || !filter.termId) return;
    const { cls } = input;
    const id = input.scheduleId ?? `tmp-${nanoid()}`;
    const old = before.periods.find((p) => p.scheduleId === input.scheduleId);
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
    };
    qc.setQueryData<TimetableReply>(key, {
      ...before,
      periods: [...before.periods.filter((p) => p.scheduleId !== id), draft],
      clashes: before.clashes.filter((c) => !c.scheduleIds.includes(id)),
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
      });
      qc.setQueryData<TimetableReply>(key, (cur) => {
        if (!cur) return cur;
        const real = reply.scheduleId as string;
        return {
          ...cur,
          periods: cur.periods.map((p) =>
            p.scheduleId === id ? { ...p, scheduleId: real } : p,
          ),
          clashes: [
            ...cur.clashes.filter((c) => !c.scheduleIds.includes(real)),
            ...((reply.clashes ?? []) as Clash[]),
          ],
        };
      });
      if (reply.clashes?.length) toast.warning(reply.message);
    } catch (e: any) {
      qc.setQueryData(key, before);
      toast.error(e?.message ?? "That couldn't be placed.");
    }
  }

  async function remove(scheduleId: string) {
    const before = await snapshot();
    if (!before) return;
    qc.setQueryData<TimetableReply>(key, {
      ...before,
      periods: before.periods.filter((p) => p.scheduleId !== scheduleId),
      clashes: before.clashes.filter(
        (c) => !c.scheduleIds.includes(scheduleId),
      ),
    });
    try {
      await callAction("remove-timetable-period", { scheduleId });
    } catch (e: any) {
      qc.setQueryData(key, before);
      toast.error(e?.message ?? "That couldn't be removed.");
    }
  }

  return { place, remove };
}
