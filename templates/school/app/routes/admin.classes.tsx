import { useQuery, useQueryClient } from "@tanstack/react-query";
import { agentNativePath } from "@agent-native/core/client";
import { useNavigationState } from "@/hooks/use-navigation-state";
import { NO_TEACHER_LABEL } from "@shared/class-teacher";
import { useSearchParams } from "react-router";
import { useEffect, useMemo, useState } from "react";
import { ArmsTab } from "@/components/timetable/ArmsTab";
import { ClassesTabs } from "@/components/timetable/ClassesTabs";
import { callAction } from "@/components/timetable/arms-shared";
import { NewClassDialog } from "@/components/timetable/NewClassDialog";
import { Badge } from "@/components/ui/badge";
import { ListState } from "@/components/ListState";
import { Pagination, usePagination } from "@/components/Pagination";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  IconSchool,
  IconUsers,
  IconChevronDown,
  IconChevronRight,
} from "@tabler/icons-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { countsProblem } from "@shared/lesson-counts";
import { useDoubleWord } from "@/components/timetable/arms-shared";

/**
 * What the teacher picker uses to mean "nobody yet".
 *
 * Not the empty string: a Radix select item may not use it, and the one that
 * did crashed the portal rather than showing a menu.
 */
const UNASSIGNED = "__unassigned__";

export default function AdminClasses() {
  const { sync } = useNavigationState();
  const qc = useQueryClient();
  const [searchParams, setSearchParams] = useSearchParams();
  const tab = searchParams.get("tab") === "arms" ? "arms" : "classes";
  const [newClassOpen, setNewClassOpen] = useState(false);
  const [gradeFilter, setGradeFilter] = useState("all");
  const [teacherFilter, setTeacherFilter] = useState("all");
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

  // Class detail dialog
  const [selectedClass, setSelectedClass] = useState<any>(null);
  const [editTeacher, setEditTeacher] = useState("");
  const [editStatus, setEditStatus] = useState("");
  const [editLoading, setEditLoading] = useState(false);
  // Typed as text so an empty box can mean "not said".
  const [editPeriods, setEditPeriods] = useState("");
  const doubleWords = useDoubleWord();
  const [editDoubles, setEditDoubles] = useState("");

  const { data: staffData } = useQuery<{ active: any[] }>({
    queryKey: ["admin-staff"],
    queryFn: async () => {
      const res = await fetch(
        agentNativePath("/_agent-native/actions/list-staff"),
      );
      if (!res.ok) return { active: [] };
      return res.json();
    },
    enabled: !!selectedClass,
  });
  const staffList = staffData?.active ?? [];

  const { data: classes = [], isLoading } = useQuery<any[]>({
    queryKey: ["admin-classes"],
    queryFn: async () => {
      const res = await fetch(
        // Archived classes too: this page shows the status and is where a
        // class is archived, so hiding them would leave no way back.
        agentNativePath("/_agent-native/actions/list-classes?status=all"),
      );
      if (!res.ok) return [];
      return res.json();
    },
  });

  useEffect(() => {
    sync({
      role: "admin",
      view: "classes",
      tab,
      ...(isLoading ? {} : { classCount: classes.length }),
      gradeFilter,
      teacherFilter,
    } as any);
  }, [sync, tab, isLoading, classes.length, gradeFilter, teacherFilter]);

  const gradeLevels = useMemo(
    () =>
      Array.from(
        new Set(classes.map((c: any) => c.gradeLevelName).filter(Boolean)),
      ).sort(),
    [classes],
  );

  const teachers = useMemo(
    () =>
      Array.from(
        new Set(classes.map((c: any) => c.teacherName).filter(Boolean)),
      ).sort(),
    [classes],
  );

  const filtered = useMemo(
    () =>
      classes.filter((c: any) => {
        if (gradeFilter !== "all" && c.gradeLevelName !== gradeFilter)
          return false;
        if (teacherFilter !== "all" && c.teacherName !== teacherFilter)
          return false;
        return true;
      }),
    [classes, gradeFilter, teacherFilter],
  );

  // Pages run across the whole filtered list; each year group then shows
  // the part of itself that falls on this page, with its full count kept.
  // Sorted by year group first, so a group is not split across pages.
  const sortedByGroup = useMemo(
    () =>
      [...filtered].sort((a: any, b: any) =>
        (a.gradeLevelName ?? "Unassigned").localeCompare(
          b.gradeLevelName ?? "Unassigned",
        ),
      ),
    [filtered],
  );
  const paged = usePagination(sortedByGroup);
  const groupTotals = useMemo(() => {
    const totals: Record<string, number> = {};
    for (const cls of filtered) {
      const key = cls.gradeLevelName ?? "Unassigned";
      totals[key] = (totals[key] ?? 0) + 1;
    }
    return totals;
  }, [filtered]);

  const grouped = useMemo(() => {
    const map: Record<string, any[]> = {};
    for (const cls of paged.items) {
      const key = cls.gradeLevelName ?? "Unassigned";
      if (!map[key]) map[key] = [];
      map[key].push(cls);
    }
    return Object.entries(map).sort(([a], [b]) => a.localeCompare(b));
  }, [paged.items]);

  const toggleGroup = (key: string) =>
    setCollapsed((prev) => ({ ...prev, [key]: !prev[key] }));

  const hasFilters = gradeFilter !== "all" || teacherFilter !== "all";

  function openClassDialog(cls: any) {
    setSelectedClass(cls);
    // The class carries `primaryTeacherUserId`; reading `teacherUserId` found
    // nothing, so every class — including one with a teacher on the row
    // behind the dialog — opened saying "Unassigned". An admin coming here to
    // check who teaches something was told the opposite of the truth.
    setEditTeacher(cls.primaryTeacherUserId ?? cls.teacherUserId ?? "");
    setEditStatus(cls.status ?? "active");
    setEditPeriods(cls.periodsPerWeek?.toString() ?? "");
    setEditDoubles(cls.doublesPerWeek?.toString() ?? "");
  }

  async function handleSaveClass() {
    if (!selectedClass) return;
    const periods = editPeriods.trim() === "" ? null : Number(editPeriods);
    // Doubles are part of the periods; with no periods there are none, and a
    // typed number is said so rather than dropped.
    const typedDoubles = editDoubles.trim() === "" ? null : Number(editDoubles);
    const doubles = periods == null ? null : typedDoubles;
    const countsChanged =
      periods !== (selectedClass.periodsPerWeek ?? null) ||
      doubles !== (selectedClass.doublesPerWeek ?? null);
    const problem =
      countsChanged || (periods == null && typedDoubles != null)
        ? countsProblem(periods, typedDoubles)
        : null;
    if (problem) {
      toast.error(problem);
      return;
    }
    setEditLoading(true);
    // Show the new counts in the list at once; put the old ones back if the
    // school's server says no.
    const patchCounts = (p: number | null, d: number | null) =>
      qc.setQueryData<any[]>(["admin-classes"], (rows) =>
        rows?.map((r) =>
          r.id === selectedClass.id
            ? { ...r, periodsPerWeek: p, doublesPerWeek: d }
            : r,
        ),
      );
    if (countsChanged) patchCounts(periods, doubles);
    try {
      await callAction("update-class", {
        id: selectedClass.id,
        primaryTeacherUserId: editTeacher || undefined,
        status: editStatus,
        ...(countsChanged
          ? { periodsPerWeek: periods, doublesPerWeek: doubles }
          : {}),
      });
      qc.invalidateQueries({ queryKey: ["admin-classes"] });
      qc.invalidateQueries({ queryKey: ["timetable"] });
      toast.success("Class updated");
      setSelectedClass(null);
    } catch (e: any) {
      if (countsChanged)
        patchCounts(
          selectedClass.periodsPerWeek ?? null,
          selectedClass.doublesPerWeek ?? null,
        );
      toast.error(e.message ?? "Failed to update class");
    } finally {
      setEditLoading(false);
    }
  }

  const archivedCount = classes.filter(
    (c: any) => c.status === "archived",
  ).length;

  const tabs = (
    <ClassesTabs
      value={tab}
      onChange={(t) =>
        setSearchParams(t === "arms" ? { tab: "arms" } : {}, { replace: true })
      }
    />
  );
  if (tab === "arms") return <ArmsTab tabs={tabs} />;

  return (
    <div className="h-full overflow-auto flex flex-col">
      {/* Header */}
      <div className="px-6 pt-6 pb-4 space-y-4 shrink-0">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-xl font-semibold">All Classes</h1>
            <p className="text-sm text-muted-foreground mt-1">
              {filtered.length} class{filtered.length !== 1 ? "es" : ""}
              {hasFilters ? " matching filters" : " across the school"}
              {/* This page lists archived classes too, while the overview
                  counts only the ones being taught — so the two pages gave
                  different totals for the same school with nothing to
                  explain the difference. Saying how many are archived
                  reconciles them on sight. */}
              {!hasFilters && archivedCount > 0
                ? `, including ${archivedCount} archived`
                : ""}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Select value={gradeFilter} onValueChange={setGradeFilter}>
              <SelectTrigger className="h-8 text-xs w-36">
                <SelectValue placeholder="Grade level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All grades</SelectItem>
                {gradeLevels.map((g: any) => (
                  <SelectItem key={g} value={g}>
                    {g}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={teacherFilter} onValueChange={setTeacherFilter}>
              <SelectTrigger className="h-8 text-xs w-40">
                <SelectValue placeholder="Teacher" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All teachers</SelectItem>
                {teachers.map((t: any) => (
                  <SelectItem key={t} value={t}>
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {hasFilters && (
              <button
                onClick={() => {
                  setGradeFilter("all");
                  setTeacherFilter("all");
                }}
                className="h-8 px-2.5 text-xs text-muted-foreground hover:text-foreground border rounded-md"
              >
                Clear
              </button>
            )}
            <Button size="sm" onClick={() => setNewClassOpen(true)}>
              New class
            </Button>
          </div>
        </div>
        {tabs}
      </div>
      <NewClassDialog open={newClassOpen} onOpenChange={setNewClassOpen} />

      {/* Content */}
      <div className="flex-1 overflow-auto px-6 pb-6 space-y-3">
        {isLoading || filtered.length === 0 ? (
          <ListState
            loading={isLoading}
            icon={IconSchool}
            title={
              hasFilters ? "No classes match these filters" : "No classes yet"
            }
            description={
              hasFilters
                ? "Try adjusting the filters above."
                : "Ask the agent to create classes."
            }
          />
        ) : (
          grouped.map(([grade, rows]) => {
            const isCollapsed = collapsed[grade];
            return (
              <div key={grade} className="rounded-lg border overflow-hidden">
                {/* Group header */}
                <button
                  onClick={() => toggleGroup(grade)}
                  className="w-full flex items-center justify-between px-4 py-2.5 bg-muted/40 hover:bg-muted/60 transition-colors"
                >
                  <span className="text-sm font-medium">{grade}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-muted-foreground">
                      {groupTotals[grade] ?? rows.length} class
                      {(groupTotals[grade] ?? rows.length) !== 1 ? "es" : ""}
                    </span>
                    {isCollapsed ? (
                      <IconChevronRight
                        size={14}
                        className="text-muted-foreground"
                      />
                    ) : (
                      <IconChevronDown
                        size={14}
                        className="text-muted-foreground"
                      />
                    )}
                  </div>
                </button>

                {/* Table */}
                {!isCollapsed && (
                  <ul className="divide-y border-t sm:hidden">
                    {rows.map((cls: any) => (
                      <li key={cls.id}>
                        <button
                          type="button"
                          onClick={() => openClassDialog(cls)}
                          className="flex w-full items-center gap-3 px-4 py-3 text-left hover:bg-muted/20"
                        >
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-medium">
                              {cls.name}
                            </p>
                            <p className="truncate text-xs text-muted-foreground">
                              {cls.teacherName ?? NO_TEACHER_LABEL}
                            </p>
                          </div>
                          <span className="inline-flex shrink-0 items-center gap-1 text-xs text-muted-foreground">
                            <IconUsers size={13} />
                            {cls.enrollmentCount ?? 0}
                          </span>
                          <Badge
                            variant={
                              cls.status === "active" ? "default" : "secondary"
                            }
                            className="shrink-0 text-xs capitalize"
                          >
                            {cls.status}
                          </Badge>
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
                {!isCollapsed && (
                  <table className="hidden w-full text-sm sm:table">
                    <thead>
                      <tr className="border-b border-t bg-background">
                        <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">
                          Class
                        </th>
                        <th className="hidden px-4 py-2 text-left text-xs font-medium text-muted-foreground sm:table-cell">
                          Subject
                        </th>
                        <th className="hidden px-4 py-2 text-left text-xs font-medium text-muted-foreground sm:table-cell">
                          Teacher
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">
                          Students
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {rows.map((cls: any) => (
                        <tr
                          key={cls.id}
                          className="border-b last:border-0 hover:bg-muted/20 cursor-pointer"
                          onClick={() => openClassDialog(cls)}
                        >
                          <td className="px-4 py-2.5 font-medium">
                            {cls.name}
                            {/* Subject and teacher have their own columns from
                                sm up; on a phone they sit under the name. */}
                            <span className="block text-xs font-normal text-muted-foreground sm:hidden">
                              {cls.teacherName ?? NO_TEACHER_LABEL}
                            </span>
                          </td>
                          <td className="hidden px-4 py-2.5 text-muted-foreground sm:table-cell">
                            {cls.subjectName ?? "—"}
                          </td>
                          <td className="hidden px-4 py-2.5 text-muted-foreground sm:table-cell">
                            {/* A class can be planned before it is staffed;
                                a dash would read as missing data. */}
                            {cls.teacherName ?? (
                              <span className="italic">{NO_TEACHER_LABEL}</span>
                            )}
                          </td>
                          <td className="px-4 py-2.5">
                            <span className="inline-flex items-center gap-1 text-muted-foreground">
                              <IconUsers size={13} />
                              {cls.enrollmentCount ?? 0}
                            </span>
                          </td>
                          <td className="px-4 py-2.5">
                            <Badge
                              variant={
                                cls.status === "active"
                                  ? "default"
                                  : "secondary"
                              }
                              className="text-xs capitalize"
                            >
                              {cls.status}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            );
          })
        )}
        <Pagination {...paged} noun="classes" />
      </div>

      {/* Class detail dialog */}
      <Dialog
        open={!!selectedClass}
        onOpenChange={(o) => !o && setSelectedClass(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedClass?.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2 text-sm">
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-muted-foreground">
              <span>Subject</span>
              <span className="text-foreground">
                {selectedClass?.subjectName ?? "—"}
              </span>
              <span>Grade</span>
              <span className="text-foreground">
                {selectedClass?.gradeLevelName ?? "—"}
              </span>
              <span>Students</span>
              <span className="text-foreground">
                {selectedClass?.enrollmentCount ?? 0}
              </span>
            </div>
            <div className="space-y-1.5">
              <Label>Primary Teacher</Label>
              {/* "Unassigned" is a real choice here — a class can be planned
                  before it is staffed — but it cannot be the empty string:
                  Radix reserves that for clearing a selection and throws if
                  an item uses it. The throw took the whole portal down to an
                  error page the moment anyone opened a class, so this uses a
                  sentinel and maps it back when saving. */}
              <Select
                value={editTeacher || UNASSIGNED}
                onValueChange={(value) =>
                  setEditTeacher(value === UNASSIGNED ? "" : value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Unassigned" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={UNASSIGNED}>Unassigned</SelectItem>
                  {staffList.map((s: any) => (
                    <SelectItem key={s.userId} value={s.userId}>
                      {s.name ?? s.email}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="class-periods">Periods a week</Label>
                <Input
                  id="class-periods"
                  type="number"
                  min={0}
                  inputMode="numeric"
                  value={editPeriods}
                  onChange={(e) => setEditPeriods(e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="class-doubles">
                  Of which {doubleWords.doubles}
                </Label>
                <Input
                  id="class-doubles"
                  type="number"
                  min={0}
                  inputMode="numeric"
                  value={editDoubles}
                  onChange={(e) => setEditDoubles(e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label>Status</Label>
              <Select value={editStatus} onValueChange={setEditStatus}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setSelectedClass(null)}>
              Cancel
            </Button>
            <Button onClick={handleSaveClass} disabled={editLoading}>
              {editLoading ? "Saving…" : "Save"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
