import { useParams } from "react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { agentNativePath } from "@agent-native/core/client";
import { useNavigationState } from "@/hooks/use-navigation-state";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router";
import { Badge } from "@/components/ui/badge";
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

  const { data: cls } = useQuery({
    queryKey: ["class", classId],
    queryFn: async () => {
      const res = await fetch(
        agentNativePath(`/api/school/classes/${classId}`),
      );
      if (!res.ok) return null;
      return res.json();
    },
    enabled: !!classId,
  });

  const { data: lessons = [] } = useQuery<any[]>({
    queryKey: ["lessons", classId],
    queryFn: async () => {
      const res = await fetch(
        agentNativePath(`/api/school/lessons?classId=${classId}`),
      );
      if (!res.ok) return [];
      return res.json();
    },
    enabled: !!classId,
  });

  const { data: assessments = [] } = useQuery<any[]>({
    queryKey: ["assessments", classId],
    queryFn: async () => {
      const res = await fetch(
        agentNativePath(`/api/school/assessments?classId=${classId}`),
      );
      if (!res.ok) return [];
      return res.json();
    },
    enabled: !!classId,
  });

  const { data: students = [] } = useQuery<any[]>({
    queryKey: ["class-students", classId],
    queryFn: async () => {
      const res = await fetch(
        agentNativePath(`/api/school/class-students?classId=${classId}`),
      );
      if (!res.ok) return [];
      return res.json();
    },
    enabled: !!classId,
  });

  const { data: allStudents = [] } = useQuery<any[]>({
    queryKey: ["admin-students"],
    queryFn: async () => {
      const res = await fetch(agentNativePath("/api/school/students"));
      if (!res.ok) return [];
      return res.json();
    },
    enabled: enrollOpen,
  });

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
      <Tabs defaultValue="lessons">
        <TabsList>
          <TabsTrigger value="lessons">
            <IconFileText size={14} className="mr-1.5" /> Lessons (
            {lessons.length})
          </TabsTrigger>
          <TabsTrigger value="assessments">
            <IconClipboardList size={14} className="mr-1.5" /> Assessments (
            {assessments.length})
          </TabsTrigger>
          <TabsTrigger value="students">
            <IconUsers size={14} className="mr-1.5" /> Students (
            {students.length})
          </TabsTrigger>
        </TabsList>
        <TabsContent value="lessons" className="mt-4 space-y-2">
          {lessons.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No lesson notes yet. Ask the agent to create one.
            </p>
          ) : (
            lessons.map((lesson: any) => (
              <Link
                key={lesson.id}
                to={`/teacher/lessons/${lesson.id}`}
                className="flex items-center justify-between rounded-lg border p-3 hover:bg-accent/50 transition-colors"
              >
                <span className="text-sm font-medium">{lesson.title}</span>
                <Badge
                  variant={
                    lesson.status === "finalized" ? "default" : "secondary"
                  }
                  className="text-xs"
                >
                  {lesson.status}
                </Badge>
              </Link>
            ))
          )}
        </TabsContent>
        <TabsContent value="assessments" className="mt-4 space-y-2">
          {assessments.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No assessments yet. Ask the agent to create one.
            </p>
          ) : (
            assessments.map((assessment: any) => (
              <Link
                key={assessment.id}
                to={`/teacher/assessments/${assessment.id}`}
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
          {students.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No students enrolled. Click &ldquo;Enroll Student&rdquo; to add
              one.
            </p>
          ) : (
            students.map((s: any) => (
              <div
                key={s.enrollmentId}
                className="flex items-center gap-3 rounded-lg border p-3"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">
                    {s.name ?? s.email ?? s.studentUserId}
                  </p>
                  {s.email && s.name && (
                    <p className="text-xs text-muted-foreground">{s.email}</p>
                  )}
                </div>
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
