import { useQuery } from "@tanstack/react-query";
import { agentNativePath } from "@agent-native/core/client";
import { useNavigationState } from "@/hooks/use-navigation-state";
import { useEffect } from "react";
import { useParams, Link } from "react-router";
import {
  IconChevronLeft,
  IconFile,
  IconLink,
  IconNotebook,
  IconVideo,
} from "@tabler/icons-react";
import { weekNumberIn, withoutWeekPrefix } from "@shared/week-prefix";

export default function StudentLesson() {
  const { lessonId } = useParams<{ lessonId: string }>();
  const { sync } = useNavigationState();

  const { data: lesson, isLoading } = useQuery({
    queryKey: ["student-lesson", lessonId],
    queryFn: async () => {
      const res = await fetch(
        agentNativePath(
          `/_agent-native/actions/get-lesson-note?id=${lessonId}`,
        ),
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
      {/* The teacher's plan stays with the teacher. What a learner gets is
          what was shared for them: the material attached to this lesson. */}
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-3xl space-y-3">
          {/* What was set for this week: something to read, something to
              practise, something to hand in. */}
          {lesson.material?.map((m: any) => (
            <Link
              key={m.id}
              to={`/student/assessments/${m.id}`}
              className="flex items-center gap-3 rounded-lg border p-3 transition-colors hover:border-primary/40"
            >
              <IconNotebook size={16} className="shrink-0 text-primary" />
              <div className="min-w-0 flex-1">
                {/* The week is already the title of the page above. */}
                <p className="truncate text-sm font-medium">
                  {withoutWeekPrefix(m.title, weekNumberIn(lesson.title))}
                </p>
                <p className="text-xs text-muted-foreground">
                  {m.responseMode === "none"
                    ? "To read"
                    : m.durationMinutes
                      ? `${m.durationMinutes} minutes once you begin`
                      : "To hand in"}
                </p>
              </div>
            </Link>
          ))}
          {lesson.resources?.length
            ? lesson.resources.map((r: any) => {
                const Icon =
                  r.type === "video"
                    ? IconVideo
                    : r.type === "url"
                      ? IconLink
                      : IconFile;
                return (
                  <a
                    key={r.id}
                    href={r.url ?? "#"}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3 rounded-lg border p-3 transition-colors hover:border-primary/40"
                  >
                    <Icon
                      size={16}
                      className="shrink-0 text-muted-foreground"
                    />
                    <span className="min-w-0 flex-1 truncate text-sm">
                      {r.title}
                    </span>
                  </a>
                );
              })
            : null}
          {!lesson.material?.length && !lesson.resources?.length ? (
            <p className="text-sm text-muted-foreground">
              Nothing has been shared for this lesson yet. Your work for this
              class is under Assessments.
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
