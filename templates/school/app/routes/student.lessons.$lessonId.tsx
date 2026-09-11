import { useQuery } from "@tanstack/react-query";
import { agentNativePath } from "@agent-native/core/client";
import { useNavigationState } from "@/hooks/use-navigation-state";
import { useEffect } from "react";
import { useParams, Link } from "react-router";
import { IconChevronLeft } from "@tabler/icons-react";
import { Markdown } from "@/components/Markdown";

export default function StudentLesson() {
  const { lessonId } = useParams<{ lessonId: string }>();
  const { sync } = useNavigationState();

  const { data: lesson, isLoading } = useQuery({
    queryKey: ["student-lesson", lessonId],
    queryFn: async () => {
      const res = await fetch(
        agentNativePath(`/api/school/lessons/${lessonId}`),
      );
      if (!res.ok) return null;
      return res.json();
    },
    enabled: !!lessonId,
  });

  useEffect(() => {
    if (lessonId) sync({ role: "student", view: "lesson", lessonId });
  }, [sync, lessonId]);

  if (isLoading) {
    return (
      <div className="p-6 text-sm text-muted-foreground">Loading lesson…</div>
    );
  }

  if (!lesson) {
    return (
      <div className="p-6 space-y-3">
        <p className="text-sm font-medium">Lesson not available</p>
        <p className="text-sm text-muted-foreground">
          This lesson may not have been shared with your class yet.
        </p>
        <Link
          to="/student/classes"
          className="text-sm text-primary hover:underline"
        >
          Back to my classes
        </Link>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col overflow-hidden">
      <div className="border-b px-6 py-3">
        <Link
          to={
            lesson.classId
              ? `/student/classes/${lesson.classId}`
              : "/student/classes"
          }
          className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 mb-1"
        >
          <IconChevronLeft size={14} />
          Back to class
        </Link>
        <h1 className="text-base font-semibold">{lesson.title}</h1>
        {lesson.summary && (
          <p className="text-xs text-muted-foreground mt-0.5">
            {lesson.summary}
          </p>
        )}
      </div>
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-3xl">
          {lesson.content ? (
            <Markdown>{lesson.content}</Markdown>
          ) : (
            <p className="text-sm text-muted-foreground">
              Your teacher hasn't added notes to this lesson yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
