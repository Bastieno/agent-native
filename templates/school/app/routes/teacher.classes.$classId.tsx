import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { agentNativePath } from "@agent-native/core/client";
import { useNavigationState } from "@/hooks/use-navigation-state";
import { useEffect } from "react";
import { Link } from "react-router";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IconFileText, IconClipboardList, IconUsers } from "@tabler/icons-react";

export default function TeacherClass() {
  const { classId } = useParams();
  const { sync } = useNavigationState();

  useEffect(() => {
    if (classId) sync({ role: "teacher", view: "class", classId });
  }, [sync, classId]);

  const { data: cls } = useQuery({
    queryKey: ["class", classId],
    queryFn: async () => {
      const res = await fetch(agentNativePath(`/api/school/classes/${classId}`));
      if (!res.ok) return null;
      return res.json();
    },
    enabled: !!classId,
  });

  const { data: lessons = [] } = useQuery<any[]>({
    queryKey: ["lessons", classId],
    queryFn: async () => {
      const res = await fetch(agentNativePath(`/api/school/lessons?classId=${classId}`));
      if (!res.ok) return [];
      return res.json();
    },
    enabled: !!classId,
  });

  const { data: assessments = [] } = useQuery<any[]>({
    queryKey: ["assessments", classId],
    queryFn: async () => {
      const res = await fetch(agentNativePath(`/api/school/assessments?classId=${classId}`));
      if (!res.ok) return [];
      return res.json();
    },
    enabled: !!classId,
  });

  const { data: students = [] } = useQuery<any[]>({
    queryKey: ["class-students", classId],
    queryFn: async () => {
      const res = await fetch(agentNativePath(`/api/school/class-students?classId=${classId}`));
      if (!res.ok) return [];
      return res.json();
    },
    enabled: !!classId,
  });

  return (
    <div className="h-full overflow-auto p-6 space-y-4">
      <div>
        <h1 className="text-xl font-semibold">{cls?.name ?? "Class"}</h1>
        {cls && (
          <Badge variant={cls.status === "active" ? "default" : "secondary"} className="mt-1">
            {cls.status}
          </Badge>
        )}
      </div>
      <Tabs defaultValue="lessons">
        <TabsList>
          <TabsTrigger value="lessons">
            <IconFileText size={14} className="mr-1.5" /> Lessons ({lessons.length})
          </TabsTrigger>
          <TabsTrigger value="assessments">
            <IconClipboardList size={14} className="mr-1.5" /> Assessments ({assessments.length})
          </TabsTrigger>
          <TabsTrigger value="students">
            <IconUsers size={14} className="mr-1.5" /> Students ({students.length})
          </TabsTrigger>
        </TabsList>
        <TabsContent value="lessons" className="mt-4 space-y-2">
          {lessons.length === 0 ? (
            <p className="text-sm text-muted-foreground">No lesson notes yet. Ask the agent to create one.</p>
          ) : (
            lessons.map((lesson: any) => (
              <Link
                key={lesson.id}
                to={`/teacher/lessons/${lesson.id}`}
                className="flex items-center justify-between rounded-lg border p-3 hover:bg-accent/50 transition-colors"
              >
                <span className="text-sm font-medium">{lesson.title}</span>
                <Badge variant={lesson.status === "finalized" ? "default" : "secondary"} className="text-xs">
                  {lesson.status}
                </Badge>
              </Link>
            ))
          )}
        </TabsContent>
        <TabsContent value="assessments" className="mt-4 space-y-2">
          {assessments.length === 0 ? (
            <p className="text-sm text-muted-foreground">No assessments yet. Ask the agent to create one.</p>
          ) : (
            assessments.map((assessment: any) => (
              <Link
                key={assessment.id}
                to={`/teacher/assessments/${assessment.id}`}
                className="flex items-center justify-between rounded-lg border p-3 hover:bg-accent/50 transition-colors"
              >
                <div>
                  <span className="text-sm font-medium">{assessment.title}</span>
                  {assessment.dueDate && (
                    <p className="text-xs text-muted-foreground">Due: {assessment.dueDate}</p>
                  )}
                </div>
                <Badge variant={assessment.status === "published" ? "default" : "secondary"} className="text-xs">
                  {assessment.status}
                </Badge>
              </Link>
            ))
          )}
        </TabsContent>
        <TabsContent value="students" className="mt-4 space-y-1">
          {students.length === 0 ? (
            <p className="text-sm text-muted-foreground">No students enrolled. Ask the agent to enroll students.</p>
          ) : (
            students.map((s: any) => (
              <div key={s.enrollmentId} className="flex items-center justify-between rounded-lg border p-3">
                <div>
                  <p className="text-sm font-medium">{s.name ?? s.email ?? s.studentUserId}</p>
                  {s.email && s.name && <p className="text-xs text-muted-foreground">{s.email}</p>}
                </div>
                {s.category && (
                  <Badge variant="outline" className="text-xs capitalize">{s.category}</Badge>
                )}
              </div>
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
