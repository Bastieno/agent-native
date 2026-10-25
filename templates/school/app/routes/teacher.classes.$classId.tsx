import { CapabilityHint } from "@/components/help/CapabilityHint";
import { ConnectAiAppDialog } from "@/components/ConnectAiAppDialog";
import { useParams, useSearchParams } from "react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ListState } from "@/components/ListState";
import { Pagination, usePagination } from "@/components/Pagination";
import { agentNativePath } from "@agent-native/core/client";
import { useNavigationState } from "@/hooks/use-navigation-state";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router";
import { useSchoolDates } from "@/hooks/use-school-dates";
import { useOrigin } from "@/lib/origin";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { isCurrentWeek } from "@shared/term-weeks";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import {
  IconFileText,
  IconClipboardList,
  IconUsers,
  IconDotsVertical,
  IconUserPlus,
  IconSearch,
} from "@tabler/icons-react";
import { BackLink } from "@/components/layout/BackLink";

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

export default function TeacherClass() {
  const { classId } = useParams();
  const { sync } = useNavigationState();
  const qc = useQueryClient();

  // Enroll dialog
  const [enrollOpen, setEnrollOpen] = useState(false);
  const [enrollSearch, setEnrollSearch] = useState("");
  const [enrollLoading, setEnrollLoading] = useState<string | null>(null);

  // Unenroll confirm
  const [unenrollTarget, setUnenrollTarget] = useState<any>(null);
  const [unenrollLoading, setUnenrollLoading] = useState(false);

  useEffect(() => {
    if (classId) sync({ role: "teacher", view: "class", classId });
  }, [sync, classId]);

  const origin = useOrigin();
  const [searchParams, setSearchParams] = useSearchParams();
  const tab = ["lessons", "assessments", "students"].includes(
    searchParams.get("tab") ?? "",
  )
    ? (searchParams.get("tab") as string)
    : "lessons";
  const { formatDate } = useSchoolDates();
  const { data: cls } = useQuery({
    queryKey: ["class", classId],
    queryFn: async () => {
      const res = await fetch(
        agentNativePath(`/_agent-native/actions/get-class?classId=${classId}`),
      );
      if (!res.ok) return null;
      return res.json();
    },
    enabled: !!classId,
  });

  const { data: lessons = [], isLoading: lessonsLoading } = useQuery<any[]>({
    queryKey: ["lessons", classId],
    queryFn: async () => {
      const res = await fetch(
        agentNativePath(
          `/_agent-native/actions/list-lesson-notes?classId=${classId}`,
        ),
      );
      if (!res.ok) return [];
      return res.json();
    },
    enabled: !!classId,
  });

  const { data: allActivities = [], isLoading: activitiesLoading } = useQuery<
    any[]
  >({
    queryKey: ["assessments", classId],
    queryFn: async () => {
      const res = await fetch(
        agentNativePath(
          `/_agent-native/actions/list-assessments?classId=${classId}`,
        ),
      );
      if (!res.ok) return [];
      return res.json();
    },
    enabled: !!classId,
  }); // Reading material and work are both activities underneath, but a teacher
  // asking "what have I set this class?" does not mean the thirteen pages
  // their class reads. Those belong to their week, and are shown there.
  const assessments = allActivities.filter(
    (a: any) => !(a.gradingMode === "none" && a.responseMode === "none"),
  );
  const materialCount = allActivities.length - assessments.length;
  // Handouts and reading that belong to no particular week (a PDF made from a
  // reference, a catch-up page for one learner). They would otherwise be listed
  // nowhere, since the Assessments tab leaves out anything with nothing to hand
  // in and a lesson lists only what is attached to it.
  const looseMaterial = allActivities.filter(
    (a: any) =>
      a.gradingMode === "none" && a.responseMode === "none" && !a.lessonNoteId,
  );

  const { data: students = [], isLoading: studentsLoading } = useQuery<any[]>({
    queryKey: ["class-students", classId],
    queryFn: async () => {
      const res = await fetch(
        agentNativePath(
          `/_agent-native/actions/list-class-students?classId=${classId}`,
        ),
      );
      if (!res.ok) return [];
      return res.json();
    },
    enabled: !!classId,
  });

  const { data: allStudents = [] } = useQuery<any[]>({
    queryKey: ["admin-students"],
    queryFn: async () => {
      const res = await fetch(
        agentNativePath("/_agent-native/actions/list-students"),
      );
      if (!res.ok) return [];
      return res.json();
    },
    enabled: enrollOpen,
  });

  const lessonsPaged = usePagination(lessons);
  const assessmentsPaged = usePagination(assessments);
  const studentsPaged = usePagination(students);
  const enrolledUserIds = useMemo(
    () => new Set(students.map((s: any) => s.studentUserId)),
    [students],
  );

  const filteredAllStudents = allStudents.filter((s: any) => {
    if (enrolledUserIds.has(s.userId)) return false;
    if (!enrollSearch) return true;
    return (
      s.name?.toLowerCase().includes(enrollSearch.toLowerCase()) ||
      s.email?.toLowerCase().includes(enrollSearch.toLowerCase())
    );
  });

  async function handleEnroll(studentUserId: string) {
    setEnrollLoading(studentUserId);
    try {
      await callAction("enroll-student", { classId, studentUserId });
      qc.invalidateQueries({ queryKey: ["class-students", classId] });
      toast.success("Student enrolled");
    } catch (e: any) {
      toast.error(e.message ?? "Failed to enroll student");
    } finally {
      setEnrollLoading(null);
    }
  }

  async function handleUnenroll() {
    if (!unenrollTarget) return;
    setUnenrollLoading(true);
    try {
      await callAction("unenroll-student", {
        classId,
        studentUserId: unenrollTarget.studentUserId,
      });
      qc.invalidateQueries({ queryKey: ["class-students", classId] });
      toast.success("Student removed from class");
      setUnenrollTarget(null);
    } catch (e: any) {
      toast.error(e.message ?? "Failed to unenroll student");
    } finally {
      setUnenrollLoading(false);
    }
  }

  return (
    <div className="h-full overflow-auto p-6 space-y-4">
      <div>
        <BackLink to="/teacher/classes">My classes</BackLink>
        <h1 className="text-xl font-semibold">{cls?.name ?? "Class"}</h1>
        {cls && (
          <Badge
            variant={cls.status === "active" ? "default" : "secondary"}
            className="mt-1"
          >
            {cls.status}
          </Badge>
        )}
      </div>
      <Tabs
        value={tab}
        onValueChange={(v) =>
          // The tab lives in the address, so a page opened from this one can
          // say where it came from, and Back returns to the same tab.
          setSearchParams(v === "lessons" ? {} : { tab: v }, { replace: true })
        }
      >
        {/* Three tabs have to share a phone's width: icons go, text shrinks. */}
        <TabsList className="w-full">
          <TabsTrigger
            value="lessons"
            className="flex-1 px-2 text-xs sm:text-sm"
          >
            <IconFileText size={14} className="mr-1.5 hidden sm:block" />{" "}
            Lessons
            {lessonsLoading ? "" : ` (${lessons.length})`}
          </TabsTrigger>
          <TabsTrigger
            value="assessments"
            className="flex-1 px-2 text-xs sm:text-sm"
          >
            <IconClipboardList size={14} className="mr-1.5 hidden sm:block" />{" "}
            Assessments
            {activitiesLoading ? "" : ` (${assessments.length})`}
          </TabsTrigger>
          <TabsTrigger
            value="students"
            className="flex-1 px-2 text-xs sm:text-sm"
          >
            <IconUsers size={14} className="mr-1.5 hidden sm:block" /> Students
            {studentsLoading ? "" : ` (${students.length})`}
          </TabsTrigger>
        </TabsList>
        <TabsContent value="lessons" className="mt-4 space-y-2">
          <CapabilityHint
            id="teacher-pdf-resource"
            action={
              <ConnectAiAppDialog
                trigger={
                  <Button size="sm" variant="outline">
                    Show me
                  </Button>
                }
              />
            }
          >
            Make a PDF handout from a reference document with your own AI app.
          </CapabilityHint>
          {lessonsLoading ? (
            <ListState loading rows={3} title="Lesson notes" />
          ) : lessons.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No lesson notes yet. Ask the agent to create one.
            </p>
          ) : (
            lessonsPaged.items.map((lesson: any) => {
              // Thirteen near-identical rows, and the one a teacher wants is
              // almost always today's.
              const thisWeek = isCurrentWeek(lesson.lessonDate);
              return (
                <Link
                  key={lesson.id}
                  to={`/teacher/lessons/${lesson.id}`}
                  className={cn(
                    "flex items-center justify-between gap-3 rounded-lg border p-3 transition-colors hover:bg-accent/50",
                    thisWeek && "border-primary/60 bg-primary/5",
                  )}
                >
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-medium">
                      {lesson.title}
                    </span>
                    {/* Where it sits: the week, the unit, and what is waiting
                        on the teacher. One quiet line, nothing to scan past. */}
                    {(() => {
                      const waiting =
                        (lesson.materialCount ?? 0) -
                        (lesson.materialShared ?? 0);
                      const line = [
                        lesson.weekNumber
                          ? `Week ${lesson.weekNumber}${
                              lesson.lessonDate
                                ? ` · ${formatDate(lesson.lessonDate, { day: "numeric", month: "short" })}`
                                : ""
                            }`
                          : lesson.lessonDate
                            ? formatDate(lesson.lessonDate, {
                                day: "numeric",
                                month: "short",
                              })
                            : null,
                        lesson.unitTitle,
                        waiting > 0
                          ? `${waiting} piece${waiting === 1 ? "" : "s"} not shared yet`
                          : null,
                      ].filter(Boolean);
                      return line.length ? (
                        <span className="block truncate text-xs text-muted-foreground">
                          {line.join(" · ")}
                        </span>
                      ) : null;
                    })()}
                  </span>
                  <span className="flex shrink-0 items-center gap-2">
                    {thisWeek ? (
                      <Badge className="text-xs">This week</Badge>
                    ) : null}
                    <Badge
                      variant={
                        lesson.status === "finalized" ? "default" : "secondary"
                      }
                      className="text-xs"
                    >
                      {lesson.status === "finalized" ? "Ready" : "Draft"}
                    </Badge>
                  </span>
                </Link>
              );
            })
          )}
          <Pagination {...lessonsPaged} noun="lessons" />
          {looseMaterial.length > 0 ? (
            <div className="space-y-2 pt-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">
                  Handouts and other material
                </h3>
                <p className="text-xs text-muted-foreground">
                  Not tied to a week. Ask the assistant to attach one to a week.
                </p>
              </div>
              <div className="divide-y rounded-lg border">
                {looseMaterial.map((m: any) => {
                  let forLearners = 0;
                  try {
                    forLearners = m.audienceStudentIdsJson
                      ? JSON.parse(m.audienceStudentIdsJson).length
                      : 0;
                  } catch {
                    forLearners = 0;
                  }
                  return (
                    <Link
                      key={m.id}
                      to={`/teacher/assessments/${m.id}`}
                      state={origin(cls?.name ?? "Class")}
                      className="flex items-center justify-between gap-3 px-4 py-3 text-sm transition-colors hover:bg-accent/50"
                    >
                      <span className="min-w-0">
                        <span className="block truncate font-medium">
                          {m.title}
                        </span>
                        {forLearners > 0 ? (
                          <span className="block text-xs text-muted-foreground">
                            For {forLearners} learner
                            {forLearners === 1 ? "" : "s"} only
                          </span>
                        ) : null}
                      </span>
                      <Badge
                        variant={m.status === "draft" ? "secondary" : "default"}
                        className="shrink-0 text-xs"
                      >
                        {m.status === "draft" ? "Draft" : "Shared"}
                      </Badge>
                    </Link>
                  );
                })}
              </div>
            </div>
          ) : null}
        </TabsContent>
        <TabsContent value="assessments" className="mt-4 space-y-2">
          {/* Say what this list is before saying what it leaves out — the
              other way round reads as an apology for a missing feature. */}
          {materialCount > 0 ? (
            <p className="text-xs text-muted-foreground">
              Work to hand in or mark. The {materialCount} things the class
              reads or practises with are on their own week — see Lessons.
            </p>
          ) : null}
          {activitiesLoading ? (
            <ListState loading rows={3} title="Work" />
          ) : assessments.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              Nothing set for this class to hand in yet. Ask the agent for a
              worksheet or a test.
            </p>
          ) : (
            assessmentsPaged.items.map((assessment: any) => (
              <Link
                key={assessment.id}
                to={`/teacher/assessments/${assessment.id}`}
                state={origin(`${cls?.name ?? "Class"} assessments`)}
                className="flex items-center justify-between rounded-lg border p-3 hover:bg-accent/50 transition-colors"
              >
                <div>
                  <span className="text-sm font-medium">
                    {assessment.title}
                  </span>
                  {assessment.dueDate && (
                    <p className="text-xs text-muted-foreground">
                      Due: {assessment.dueDate}
                    </p>
                  )}
                </div>
                <Badge
                  variant={
                    assessment.status === "published" ? "default" : "secondary"
                  }
                  className="text-xs"
                >
                  {assessment.status}
                </Badge>
              </Link>
            ))
          )}
          <Pagination {...assessmentsPaged} noun="assessments" />
        </TabsContent>
        <TabsContent value="students" className="mt-4 space-y-2">
          <div className="flex justify-end">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setEnrollOpen(true)}
            >
              <IconUserPlus size={14} className="mr-1.5" /> Enroll Student
            </Button>
          </div>
          {studentsLoading ? (
            <ListState loading rows={3} title="Students" />
          ) : students.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No students enrolled. Click &ldquo;Enroll Student&rdquo; to add
              one.
            </p>
          ) : (
            studentsPaged.items.map((s: any) => (
              <div
                key={s.enrollmentId}
                className="flex items-center gap-3 rounded-lg border p-3"
              >
                {/* The name opens the learner: how they are doing, and what
                    to do about it. Back returns to this class. */}
                <Link
                  to={s.studentId ? `/teacher/students/${s.studentId}` : "#"}
                  state={origin(cls?.name ?? "Class")}
                  className="group flex-1 min-w-0"
                >
                  <p className="text-sm font-medium group-hover:text-primary">
                    {s.name ?? s.email ?? s.studentUserId}
                  </p>
                  {s.email && s.name && (
                    <p className="text-xs text-muted-foreground">{s.email}</p>
                  )}
                </Link>
                {s.category && (
                  <Badge variant="outline" className="text-xs capitalize">
                    {s.category}
                  </Badge>
                )}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 shrink-0"
                    >
                      <IconDotsVertical size={14} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      className="text-destructive"
                      onClick={() => setUnenrollTarget(s)}
                    >
                      Remove from class
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ))
          )}
          <Pagination {...studentsPaged} noun="students" />
        </TabsContent>
      </Tabs>

      {/* Enroll Student Dialog */}
      <Dialog open={enrollOpen} onOpenChange={setEnrollOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Enroll Student</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 py-1">
            <div className="relative">
              <IconSearch
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
              <Input
                placeholder="Search students…"
                className="pl-8"
                value={enrollSearch}
                onChange={(e) => setEnrollSearch(e.target.value)}
              />
            </div>
            <div className="max-h-64 overflow-auto space-y-1">
              {filteredAllStudents.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">
                  {allStudents.length === 0
                    ? "No students in the school yet."
                    : "All students are already enrolled."}
                </p>
              ) : (
                filteredAllStudents.map((s: any) => (
                  <div
                    key={s.userId}
                    className="flex items-center justify-between rounded-md border px-3 py-2"
                  >
                    <div>
                      <p className="text-sm font-medium">{s.name ?? s.email}</p>
                      {s.email && s.name && (
                        <p className="text-xs text-muted-foreground">
                          {s.email}
                        </p>
                      )}
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      disabled={enrollLoading === s.userId}
                      onClick={() => handleEnroll(s.userId)}
                    >
                      {enrollLoading === s.userId ? "Enrolling…" : "Enroll"}
                    </Button>
                  </div>
                ))
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Unenroll AlertDialog */}
      <AlertDialog
        open={!!unenrollTarget}
        onOpenChange={(o) => !o && setUnenrollTarget(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Remove {unenrollTarget?.name ?? unenrollTarget?.email} from this
              class?
            </AlertDialogTitle>
            <AlertDialogDescription>
              They will lose access to this class&apos;s lessons and
              assessments.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleUnenroll}
              disabled={unenrollLoading}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {unenrollLoading ? "Removing…" : "Remove"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
