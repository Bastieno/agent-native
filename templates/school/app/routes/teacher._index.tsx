import { useQuery } from "@tanstack/react-query";
import { agentNativePath } from "@agent-native/core/client";
import { useNavigationState } from "@/hooks/use-navigation-state";
import { useRole } from "@/hooks/use-role";
import { useEffect } from "react";
import { Link } from "react-router";
import { Badge } from "@/components/ui/badge";
import { IconSchool } from "@tabler/icons-react";
import { firstNameOrNull } from "@shared/person-name";

export default function TeacherDashboard() {
  const { sync } = useNavigationState();
  const { user } = useRole();

  const { data: classes = [] } = useQuery<any[]>({
    queryKey: ["my-classes"],
    queryFn: async () => {
      const res = await fetch(
        agentNativePath("/_agent-native/actions/get-my-classes"),
      );
      if (!res.ok) return [];
      return res.json();
    },
  });

  useEffect(() => {
    sync({
      role: "teacher",
      view: "dashboard",
      classCount: classes.length,
    } as any);
  }, [sync, classes.length]);

  return (
    <div className="h-full overflow-auto p-6 space-y-6">
      <div>
        {/* A name only when someone gave one — signing up derives one from
            the email address, and "Welcome back, teacher.maths" is worse than
            no name at all. */}
        <h1 className="text-xl font-semibold">
          {firstNameOrNull(user?.name, user?.email)
            ? `Welcome back, ${firstNameOrNull(user?.name, user?.email)}`
            : "Welcome back"}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Here's your overview.
        </p>
      </div>
      <Today />
      <div>
        <h2 className="text-sm font-medium mb-3">My Classes</h2>
        {classes.length === 0 ? (
          <div className="rounded-lg border border-dashed p-8 text-center">
            <IconSchool
              size={28}
              className="mx-auto text-muted-foreground mb-2"
            />
            <p className="text-sm font-medium">No classes assigned yet</p>
            <p className="text-xs text-muted-foreground mt-1">
              Ask the admin to create classes or assign you to one.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {classes.map((cls: any) => (
              <Link
                key={cls.id}
                to={`/teacher/classes/${cls.id}`}
                className="rounded-lg border bg-card p-4 hover:border-primary/40 transition-colors"
              >
                <p className="text-sm font-medium">{cls.name}</p>
                <Badge
                  variant={cls.status === "active" ? "default" : "secondary"}
                  className="mt-2 text-xs"
                >
                  {cls.status}
                </Badge>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * Today, for the teacher whose day it is.
 *
 * "What do I have today?" is the first thing a teacher asks the app, and
 * the agent could answer it while the teacher's own dashboard could not —
 * it listed their classes with no times and no sense of which of them is in
 * an hour. The schedule already carries whether each lesson has a note
 * prepared, which is the reason anyone opens this the night before.
 *
 * A school that has not built a timetable sees nothing rather than an empty
 * heading: plenty run on a paper one, and nagging them about it on their
 * own front page would be the app talking about itself.
 */
function Today() {
  const { data: schedule } = useQuery<any>({
    queryKey: ["my-schedule"],
    queryFn: async () => {
      // This action answers to POST, not GET: asked with the wrong verb it
      // returns 405 and the page quietly shows nothing, which is how a
      // missing timetable and a mistyped request look identical.
      const res = await fetch(
        agentNativePath("/_agent-native/actions/get-my-schedule"),
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: "{}",
        },
      );
      if (!res.ok) return null;
      return res.json();
    },
  });

  const slots: any[] = schedule?.slots ?? [];
  if (!schedule || slots.length === 0) return null;

  return (
    <div>
      <h2 className="mb-3 text-sm font-medium">
        Today · {schedule.dayName}
        {/* A real space, not only a margin — read aloud or copied, "Wednesday"
            and the count ran together. */}
        {schedule.unpreparedCount > 0 ? " " : null}
        {schedule.unpreparedCount > 0 ? (
          <span className="text-xs font-normal text-muted-foreground">
            {schedule.unpreparedCount} without a lesson note
          </span>
        ) : null}
      </h2>
      <div className="divide-y rounded-lg border">
        {slots.map((slot: any) => (
          <div
            key={slot.scheduleId}
            className="flex flex-wrap items-baseline gap-x-3 gap-y-1 px-4 py-3"
          >
            <span className="text-sm tabular-nums text-muted-foreground">
              {slot.startTime}
              {slot.endTime ? `–${slot.endTime}` : ""}
            </span>
            <Link
              to={`/teacher/classes/${slot.classId}`}
              className="text-sm font-medium underline-offset-2 hover:underline"
            >
              {slot.className}
            </Link>
            {slot.room ? (
              <span className="text-xs text-muted-foreground">{slot.room}</span>
            ) : null}
            {/* The one thing worth knowing before the bell. */}
            {slot.lessonPrepared ? (
              <Link
                to={`/teacher/lessons/${slot.lesson?.id}`}
                className="ml-auto text-xs text-muted-foreground underline-offset-2 hover:text-foreground hover:underline"
              >
                Lesson note ready
              </Link>
            ) : (
              <span className="ml-auto text-xs text-muted-foreground">
                No lesson note for today
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
