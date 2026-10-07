import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { IconCalendarTime } from "@tabler/icons-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ListState } from "@/components/ListState";
import { CopyTimetableAction } from "@/components/timetable/CopyTimetableAction";
import { PeriodCellPopover } from "@/components/timetable/PeriodCellPopover";
import { TimetableGrid } from "@/components/timetable/TimetableGrid";
import {
  callAction,
  useArms,
  useArmWord,
} from "@/components/timetable/arms-shared";
import {
  getAction,
  useTimetable,
  useTimetableEdits,
  type ClassOption,
  type TimetableFilter,
} from "@/components/timetable/use-timetable";
import { useNavigationState } from "@/hooks/use-navigation-state";
import { useSchoolConfig } from "@/hooks/use-school-config";
import { findPeriod, roomKey, type Room } from "@shared/school-week";

type View = "arm" | "teacher" | "room";
type Cell = { day: number; periodNumber: number };

export default function AdminTimetable() {
  const { sync } = useNavigationState();
  const [params, setParams] = useSearchParams();
  const { Arm } = useArmWord();
  const { config } = useSchoolConfig();
  const rooms: Room[] = (config as any).rooms ?? [];
  const [selected, setSelected] = useState<Cell | null>(null);

  // ── What can be picked ────────────────────────────────────────────────────
  const { data: current, isLoading: termLoading } = useQuery<any>({
    queryKey: ["timetable-current-term"],
    queryFn: () => getAction("get-current-term", {}),
  });
  const { data: terms = [] } = useQuery<{ id: string; name: string }[]>({
    queryKey: ["timetable-terms", current?.session?.id ?? null],
    queryFn: () =>
      getAction("list-terms", { academicYearId: current?.session?.id }),
    enabled: !termLoading,
  });
  const { data: arms = [] } = useArms();
  const { data: staff } = useQuery<{ active: any[] }>({
    queryKey: ["admin-staff"],
    queryFn: () => getAction("list-staff", {}),
  });
  const { data: classes = [] } = useQuery<ClassOption[]>({
    queryKey: ["timetable-classes"],
    queryFn: () => getAction("list-classes", {}),
  });
  // Whoever teaches a class first, so the picker opens on someone with a week.
  const teachers = useMemo(() => {
    const teaching = new Set(classes.map((c) => c.primaryTeacherUserId));
    return (staff?.active ?? [])
      .filter((s) => s.status !== "suspended")
      .sort(
        (a, b) =>
          Number(teaching.has(b.userId)) - Number(teaching.has(a.userId)) ||
          String(a.name ?? a.email).localeCompare(String(b.name ?? b.email)),
      );
  }, [staff, classes]);

  // ── What is in view: from the URL, else sensible defaults ────────────────
  const termId =
    params.get("termId") ??
    current?.term?.id ??
    current?.nextTerm?.id ??
    undefined;
  const view: View =
    (params.get("view") as View) ??
    (params.get("teacherUserId")
      ? "teacher"
      : params.get("room")
        ? "room"
        : "arm");
  const armId = params.get("armId") ?? arms[0]?.id;
  const teacherUserId = params.get("teacherUserId") ?? teachers[0]?.userId;
  // A room named by the agent or a link matches the list however it is typed.
  const roomParam = params.get("room");
  const room = roomParam
    ? (rooms.find((r) => roomKey(r.name) === roomKey(roomParam))?.name ??
      roomParam)
    : rooms[0]?.name;
  const filter: TimetableFilter = {
    termId,
    armId: view === "arm" ? armId : undefined,
    teacherUserId: view === "teacher" ? teacherUserId : undefined,
    room: view === "room" ? room : undefined,
  };
  const set = (next: Record<string, string | undefined>) => {
    const merged = new URLSearchParams(params);
    for (const [k, v] of Object.entries(next)) {
      if (v) merged.set(k, v);
      else merged.delete(k);
    }
    setParams(merged, { replace: true });
    setSelected(null);
  };

  const { data: tt, isLoading } = useTimetable(filter, !termLoading);
  const { place, remove } = useTimetableEdits(filter);

  // A term with nothing of its own: is there a term before it to copy?
  const empty =
    !!tt?.week && !!termId && !tt.fromUntermedRows && tt.periods.length === 0;
  const { data: copyFrom } = useQuery<{ from: { name: string } } | null>({
    queryKey: ["timetable-copy-preview", termId],
    queryFn: () => callAction("copy-timetable", { toTermId: termId }),
    enabled: empty,
    retry: false,
  });

  useEffect(() => {
    sync({
      role: "admin",
      view: "timetable",
      termId,
      timetableView: view,
      ...filter,
      ...(selected ? { selectedCell: selected } : {}),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sync, termId, view, armId, teacherUserId, room, selected]);

  const choosable = useMemo(() => {
    if (view === "arm" && armId) {
      return classes.filter(
        (c) => c.armId === armId || (c.optionArmIds ?? []).includes(armId),
      );
    }
    if (view === "teacher" && teacherUserId) {
      const theirs = classes.filter(
        (c) => c.primaryTeacherUserId === teacherUserId,
      );
      return theirs.length ? theirs : classes;
    }
    return classes;
  }, [classes, view, armId, teacherUserId]);

  const termName = tt?.term?.name ?? terms.find((t) => t.id === termId)?.name;
  const readOnly = !!tt?.fromUntermedRows;
  const clashes = tt?.clashes ?? [];

  // ── Header ────────────────────────────────────────────────────────────────
  const entityOptions: { value: string; label: string }[] =
    view === "arm"
      ? arms.map((a) => ({ value: a.id, label: a.name }))
      : view === "teacher"
        ? teachers.map((t) => ({ value: t.userId, label: t.name ?? t.email }))
        : rooms.map((r) => ({ value: r.name, label: r.name }));
  const entityValue =
    view === "arm" ? armId : view === "teacher" ? teacherUserId : room;
  const entityKey =
    view === "arm" ? "armId" : view === "teacher" ? "teacherUserId" : "room";

  const header = (
    <div className="flex flex-wrap items-center gap-2">
      <Select
        value={termId}
        onValueChange={(v) => set({ termId: v })}
        disabled={!terms.length}
      >
        <SelectTrigger className="h-8 w-40 text-xs" aria-label="Term">
          <SelectValue placeholder="Term" />
        </SelectTrigger>
        <SelectContent>
          {terms.map((t) => (
            <SelectItem key={t.id} value={t.id}>
              {t.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select
        value={view}
        onValueChange={(v) =>
          set({
            view: v,
            armId: undefined,
            teacherUserId: undefined,
            room: undefined,
          })
        }
      >
        <SelectTrigger className="h-8 w-28 text-xs" aria-label="View by">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="arm">By {Arm.toLowerCase()}</SelectItem>
          <SelectItem value="teacher">By teacher</SelectItem>
          <SelectItem value="room">By room</SelectItem>
        </SelectContent>
      </Select>
      {entityOptions.length ? (
        <Select
          value={entityValue}
          onValueChange={(v) => set({ [entityKey]: v })}
        >
          <SelectTrigger
            className="h-8 w-44 text-xs"
            aria-label={
              view === "arm" ? Arm : view === "teacher" ? "Teacher" : "Room"
            }
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {entityOptions.map((o) => (
              <SelectItem key={o.value} value={o.value}>
                {o.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ) : null}
      {clashes.length > 0 ? (
        <Popover>
          <PopoverTrigger asChild>
            <button type="button" aria-label="Clashes">
              <Badge variant="destructive" data-testid="clash-count">
                {clashes.length} clash{clashes.length === 1 ? "" : "es"}
              </Badge>
            </button>
          </PopoverTrigger>
          <PopoverContent align="start" className="w-80 space-y-2 text-sm">
            {clashes.map((c, i) => (
              <p key={i}>{c.message}</p>
            ))}
          </PopoverContent>
        </Popover>
      ) : null}
    </div>
  );

  // ── Body ──────────────────────────────────────────────────────────────────
  let body: React.ReactNode;
  if (termLoading || isLoading || !tt) {
    body = <ListState loading rows={4} title="" />;
  } else if (!tt.week) {
    body = (
      <div className="rounded-lg border border-dashed p-10 text-center space-y-3">
        <p className="text-sm text-muted-foreground">
          Set the days your school teaches and its periods first.
        </p>
        <Button asChild>
          <Link to="/admin/settings">Set the school week</Link>
        </Button>
      </div>
    );
  } else if (!tt.term) {
    body = (
      <ListState
        icon={IconCalendarTime}
        title="No term to show"
        description="Add this session's terms in Settings → Terms."
      />
    );
  } else if (empty && copyFrom?.from) {
    body = (
      <div className="rounded-lg border border-dashed p-10 text-center space-y-3">
        <p className="text-sm text-muted-foreground">
          {termName} has no timetable yet.
        </p>
        <CopyTimetableAction
          label={`Copy from ${copyFrom.from.name}`}
          args={{ toTermId: termId! }}
        />
      </div>
    );
  } else {
    const week = tt.week;
    body = (
      <div className="space-y-3">
        {readOnly ? (
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border bg-muted/30 px-4 py-3">
            <p className="text-sm text-muted-foreground">
              This is the school's earlier timetable. Copy it into {termName} to
              change it.
            </p>
            <CopyTimetableAction
              label={`Copy into ${termName}`}
              args={{ toTermId: termId!, fromEarlier: true }}
            />
          </div>
        ) : null}
        <TimetableGrid
          week={week}
          dayNames={tt.dayNames}
          periods={tt.periods}
          clashes={clashes}
          selected={selected}
          renderCell={
            readOnly
              ? undefined
              : (day, periodNumber, entries, cell) => {
                  const slot = findPeriod(week, day, periodNumber)!;
                  const isOpen =
                    selected?.day === day &&
                    selected.periodNumber === periodNumber;
                  return (
                    <PeriodCellPopover
                      open={isOpen}
                      onOpenChange={(o) =>
                        setSelected(o ? { day, periodNumber } : null)
                      }
                      title={`${tt.dayNames[day] ?? day}, period ${periodNumber} · ${slot.start}–${slot.end}`}
                      entries={entries}
                      classes={choosable}
                      rooms={rooms}
                      defaultRoom={view === "room" ? room : undefined}
                      onSave={(s) => {
                        const cls =
                          classes.find((c) => c.id === s.classId) ??
                          ({ id: s.classId, name: "…" } as ClassOption);
                        place({
                          cls,
                          day,
                          periodNumber,
                          start: slot.start,
                          end: slot.end,
                          room: s.room,
                          scheduleId: s.scheduleId,
                        });
                      }}
                      onRemove={remove}
                    >
                      {cell}
                    </PeriodCellPopover>
                  );
                }
          }
        />
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col overflow-y-auto overflow-x-hidden">
      <div className="shrink-0 space-y-3 px-4 pb-4 pt-6 sm:px-6">
        <h1 className="text-xl font-semibold">Timetable</h1>
        {header}
      </div>
      <div className="flex-1 px-4 pb-6 sm:px-6">{body}</div>
    </div>
  );
}
