import { useQuery, useQueryClient } from "@tanstack/react-query";
import { agentNativePath } from "@agent-native/core/client";
import { useNavigationState } from "@/hooks/use-navigation-state";
import { useEffect, useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { ListState } from "@/components/ListState";
import { Button } from "@/components/ui/button";
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

async function callAction(name: string, params: Record<string, unknown>) {
  const res = await fetch(agentNativePath(`/_agent-native/actions/${name}`), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error((err as any).error ?? "Request failed");
  }
  return res.json();
}

export default function AdminClasses() {
  const { sync } = useNavigationState();
  const qc = useQueryClient();
  const [gradeFilter, setGradeFilter] = useState("all");
  const [teacherFilter, setTeacherFilter] = useState("all");
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

  // Class detail dialog
  const [selectedClass, setSelectedClass] = useState<any>(null);
  const [editTeacher, setEditTeacher] = useState("");
  const [editStatus, setEditStatus] = useState("");
  const [editLoading, setEditLoading] = useState(false);

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
        agentNativePath("/_agent-native/actions/list-classes"),
      );
      if (!res.ok) return [];
      return res.json();
    },
  });

  useEffect(() => {
    sync({
      role: "admin",
      view: "classes",
      classCount: classes.length,
      gradeFilter,
      teacherFilter,
    } as any);
  }, [sync, classes.length, gradeFilter, teacherFilter]);

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

  const grouped = useMemo(() => {
    const map: Record<string, any[]> = {};
    for (const cls of filtered) {
      const key = cls.gradeLevelName ?? "Unassigned";
      if (!map[key]) map[key] = [];
      map[key].push(cls);
    }
    return Object.entries(map).sort(([a], [b]) => a.localeCompare(b));
  }, [filtered]);

  const toggleGroup = (key: string) =>
    setCollapsed((prev) => ({ ...prev, [key]: !prev[key] }));

  const hasFilters = gradeFilter !== "all" || teacherFilter !== "all";

  function openClassDialog(cls: any) {
    setSelectedClass(cls);
    setEditTeacher(cls.teacherUserId ?? "");
    setEditStatus(cls.status ?? "active");
  }

  async function handleSaveClass() {
    if (!selectedClass) return;
    setEditLoading(true);
    try {
      await callAction("update-class", {
        id: selectedClass.id,
        primaryTeacherUserId: editTeacher || undefined,
        status: editStatus,
      });
      qc.invalidateQueries({ queryKey: ["admin-classes"] });
      toast.success("Class updated");
      setSelectedClass(null);
    } catch (e: any) {
      toast.error(e.message ?? "Failed to update class");
    } finally {
      setEditLoading(false);
    }
  }

  return (
    <div className="h-full overflow-auto flex flex-col">
      {/* Header */}
      <div className="px-6 pt-6 pb-4 space-y-4 shrink-0">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-xl font-semibold">All Classes</h1>
            <p className="text-sm text-muted-foreground mt-1">
              {filtered.length} class{filtered.length !== 1 ? "es" : ""}
              {hasFilters ? " matching filters" : " across the school"}
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
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
          </div>
        </div>
      </div>

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
                      {rows.length} class{rows.length !== 1 ? "es" : ""}
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
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-t bg-background">
                        <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">
                          Class
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">
                          Subject
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">
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
                          </td>
                          <td className="px-4 py-2.5 text-muted-foreground">
                            {cls.subjectName ?? "—"}
                          </td>
                          <td className="px-4 py-2.5 text-muted-foreground">
                            {cls.teacherName ?? "—"}
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
              <Select value={editTeacher} onValueChange={setEditTeacher}>
                <SelectTrigger>
                  <SelectValue placeholder="Unassigned" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Unassigned</SelectItem>
                  {staffList.map((s: any) => (
                    <SelectItem key={s.userId} value={s.userId}>
                      {s.name ?? s.email}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
