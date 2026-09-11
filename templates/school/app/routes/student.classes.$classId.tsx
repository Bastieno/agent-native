import { useQuery } from "@tanstack/react-query";
import { agentNativePath } from "@agent-native/core/client";
import { useNavigationState } from "@/hooks/use-navigation-state";
import { useEffect } from "react";
import { useParams, Link } from "react-router";
import { Badge } from "@/components/ui/badge";
import {
  IconBook,
  IconChevronRight,
  IconClipboard,
  IconChevronLeft,
} from "@tabler/icons-react";

export default function StudentClassDetail() {
  const { classId } = useParams<{ classId: string }>();
  const { sync } = useNavigationState();

  useEffect(() => {
    sync({ role: "student", view: "class", classId });
  }, [sync, classId]);

  const { data: classDetail } = useQuery({
    queryKey: ["student-class", classId],
    queryFn: async () => {
      const res = await fetch(
        agentNativePath(
          `/_agent-native/actions/get-my-class?classId=${classId}`,
        ),
      );
      if (!res.ok) return null;
      return res.json();
    },
    enabled: !!classId,
  });

  if (!classDetail) {
    return (
      <div className="p-6">
        <div className="rounded-lg border border-dashed p-10 text-center">
          <p className="text-sm text-muted-foreground">Loading class…</p>
        </div>
      </div>
    );
  }

  const { cls, lessons, assessments } = classDetail;

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link
          to="/student/classes"
          className="hover:text-foreground flex items-center gap-1"
        >
          <IconChevronLeft size={14} />
          My Classes
        </Link>
        <IconChevronRight size={14} />
        <span className="text-foreground font-medium">{cls.name}</span>
      </div>

      <div>
        <h1 className="text-xl font-semibold">{cls.name}</h1>
        <p className="text-sm text-muted-foreground mt-1">
          {cls.subjectName ?? "—"} · Teacher: {cls.teacherName ?? "—"}
        </p>
      </div>

      {assessments && assessments.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-sm font-medium flex items-center gap-2">
            <IconClipboard size={14} />
            Assessments
          </h2>
          <div className="space-y-2">
            {assessments.map((a: any) => (
              <Link
                key={a.id}
                to={`/student/assessments/${a.id}`}
                className="group flex items-center justify-between rounded-lg border p-3 hover:border-primary/50 transition-colors"
              >
                <div className="space-y-0.5">
                  <p className="text-sm font-medium group-hover:text-primary transition-colors">
                    {a.title}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {a.assessmentType} ·{" "}
                    {a.dueDate ? `Due ${a.dueDate}` : "No due date"}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge
                    variant={
                      a.submissionStatus === "graded"
                        ? "default"
                        : a.submissionStatus === "submitted"
                          ? "secondary"
                          : "outline"
                    }
                    className="text-xs capitalize"
                  >
                    {a.submissionStatus ?? "not started"}
                  </Badge>
                  <IconChevronRight
                    size={14}
                    className="text-muted-foreground group-hover:text-primary transition-colors"
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {lessons && lessons.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-sm font-medium flex items-center gap-2">
            <IconBook size={14} />
            Lesson Notes
          </h2>
          <div className="space-y-2">
            {lessons.map((lesson: any) => (
              <Link
                key={lesson.id}
                to={`/student/lessons/${lesson.id}`}
                className="group flex items-center justify-between gap-3 rounded-lg border p-3 hover:border-primary/50 transition-colors"
              >
                <div className="space-y-1">
                  <p className="text-sm font-medium group-hover:text-primary transition-colors">
                    {lesson.title}
                  </p>
                  {lesson.summary && (
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {lesson.summary}
                    </p>
                  )}
                </div>
                <IconChevronRight
                  size={16}
                  className="shrink-0 text-muted-foreground group-hover:text-primary transition-colors"
                />
              </Link>
            ))}
          </div>
        </div>
      )}

      {(!assessments || assessments.length === 0) &&
        (!lessons || lessons.length === 0) && (
          <div className="rounded-lg border border-dashed p-10 text-center">
            <IconBook
              size={28}
              className="mx-auto text-muted-foreground mb-2"
            />
            <p className="text-sm font-medium">Nothing here yet</p>
            <p className="text-xs text-muted-foreground mt-1">
              Your teacher will add lessons and assessments soon.
            </p>
          </div>
        )}
    </div>
  );
}
