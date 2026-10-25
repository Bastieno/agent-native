import { useQuery } from "@tanstack/react-query";
import { agentNativePath } from "@agent-native/core/client";
import { useEffect } from "react";
import { Link, useParams } from "react-router";
import { IconCalendarWeek, IconChevronRight } from "@tabler/icons-react";
import { Badge } from "@/components/ui/badge";
import { BackLink } from "@/components/layout/BackLink";
import { ListState } from "@/components/ListState";
import { FindingList, type Finding, NextStepList } from "@/components/Findings";
import { useNavigationState } from "@/hooks/use-navigation-state";
import { cn } from "@/lib/utils";
import { useBackTarget, useOrigin } from "@/lib/origin";

type ClassRow = {
  classId: string;
  name: string;
  subject: string;
  yearGroup: string | null;
  arm: string | null;
  role: "leads" | "supports";
  learners: number;
  average: number | null;
  othersAverage: number | null;
  othersCount: number;
  waitingForMarks: number;
  unpublishedMarks: number;
  notes: { expected: number; written: number; ready: number } | null;
};

type Profile = {
  teacher: {
    userId: string;
    name: string | null;
    email: string | null;
    schoolRole: string;
    specialisation: string | null;
    status: string;
  };
  term: { id: string; name: string } | null;
  passMark: number;
  summary: {
    classesLed: number;
    classesSupported: number;
    learners: number;
    periodsPerWeek: number;
    waitingForMarks: number;
    unpublishedMarks: number;
  };
  classes: ClassRow[];
  findings: { strengths: Finding[]; concerns: Finding[]; next: string[] };
  counting: { missedWorkCountsAsZero: boolean };
};

const roleLabel: Record<string, string> = {
  school_admin: "Admin",
  teacher: "Teacher",
  subject_coordinator: "Subject coordinator",
};

/**
 * One teacher, for the admin who has to act on it.
 *
 * It leads with what needs attention, each with its evidence one tap away,
 * then the classes with each average beside the school's other classes in the
 * same subject and year group. A figure on its own cannot tell a hard cohort
 * from a hard term, so the page says where to look and never why: the
 * suggestion is to ask the teacher.
 */
export default function AdminStaffMember() {
  const { userId } = useParams<{ userId: string }>();
  const back = useBackTarget({ to: "/admin/staff", label: "Staff" });
  const origin = useOrigin();
  const { sync } = useNavigationState();

  useEffect(() => {
    sync({ role: "admin", view: "staff", staffUserId: userId });
  }, [sync, userId]);

  const { data, isLoading, error } = useQuery<Profile>({
    queryKey: ["teacher-profile", userId],
    queryFn: async () => {
      const res = await fetch(
        agentNativePath(
          `/_agent-native/actions/get-teacher-profile?userId=${userId}`,
        ),
      );
      if (!res.ok) throw new Error(String(res.status));
      return res.json();
    },
    enabled: !!userId,
  });

  if (isLoading) {
    return (
      <div className="p-6">
        <ListState loading rows={4} title="Staff" />
      </div>
    );
  }
  if (error || !data) {
    return (
      <div className="space-y-3 p-6">
        <BackLink to={back.to}>{back.label}</BackLink>
        <ListState
          title="This person isn't available"
          description="They may have been removed from the school."
        />
      </div>
    );
  }

  const { teacher, summary, classes, findings, term, passMark } = data;

  return (
    <div className="h-full space-y-6 overflow-auto p-4 pb-24 sm:p-6 sm:pb-24">
      <div>
        <BackLink to={back.to}>{back.label}</BackLink>
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-xl font-semibold">
            {teacher.name ?? teacher.email}
          </h1>
          <Badge variant="outline">
            {roleLabel[teacher.schoolRole] ?? teacher.schoolRole}
          </Badge>
          {teacher.status !== "active" ? (
            <Badge variant="secondary">{teacher.status}</Badge>
          ) : null}
        </div>
        <p className="mt-1 text-sm text-muted-foreground">
          {[teacher.specialisation, teacher.email, term?.name]
            .filter(Boolean)
            .join(" · ")}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Tile
          label="Classes led"
          value={summary.classesLed}
          note={
            summary.classesSupported > 0
              ? `${summary.classesSupported} supported`
              : `${summary.learners} learners`
          }
        />
        <Tile
          label="Periods a week"
          value={summary.periodsPerWeek}
          note={
            <Link
              to={`/admin/timetable?teacherUserId=${teacher.userId}`}
              className="inline-flex items-center gap-1 hover:text-foreground"
            >
              <IconCalendarWeek size={12} />
              Their week
            </Link>
          }
        />
        <Tile
          label="Waiting to be marked"
          value={summary.waitingForMarks}
          note="handed in, no mark yet"
          warn={summary.waitingForMarks > 0}
        />
        <Tile
          label="Marks unpublished"
          value={summary.unpublishedMarks}
          note="learners cannot see them"
          warn={summary.unpublishedMarks > 0}
        />
      </div>

      {findings.concerns.length > 0 ? (
        <FindingList
          title="Needs attention"
          tone="concern"
          items={findings.concerns}
        />
      ) : null}
      {findings.strengths.length > 0 ? (
        <FindingList
          title="Going well"
          tone="good"
          items={findings.strengths}
        />
      ) : null}
      {findings.next.length > 0 ? (
        <section className="space-y-2">
          <h2 className="text-sm font-medium">Suggested next steps</h2>
          <NextStepList steps={findings.next} />
        </section>
      ) : null}

      <section className="space-y-2">
        <h2 className="text-sm font-medium">Classes</h2>
        {classes.length === 0 ? (
          <ListState
            title="No classes yet"
            description="Give them a class from the Classes page."
          />
        ) : (
          <div className="divide-y rounded-lg border">
            {classes.map((c) => (
              <ClassLine
                key={c.classId}
                c={c}
                passMark={passMark}
                from={origin(teacher.name ?? "Teacher")}
              />
            ))}
          </div>
        )}
        <p className="text-xs text-muted-foreground">
          Counted like the report card: published marks only
          {data.counting.missedWorkCountsAsZero
            ? ", with work not handed in counted as zero"
            : ", with work not handed in left out of the average"}
          . "Others" is the mean of the school's other classes in the same
          subject and year group.
        </p>
      </section>
    </div>
  );
}

function Tile({
  label,
  value,
  note,
  warn,
}: {
  label: string;
  value: number;
  note?: React.ReactNode;
  warn?: boolean;
}) {
  return (
    <div className="rounded-lg border bg-card p-4">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p
        className={cn(
          "mt-1 text-2xl font-semibold",
          warn && "text-destructive",
        )}
      >
        {value}
      </p>
      {note ? <p className="text-xs text-muted-foreground">{note}</p> : null}
    </div>
  );
}

function ClassLine({
  c,
  passMark,
  from,
}: {
  c: ClassRow;
  passMark: number;
  from: ReturnType<ReturnType<typeof useOrigin>>;
}) {
  const below = c.average != null && c.average < passMark;
  return (
    <Link
      to={`/admin/classes/${c.classId}`}
      state={from}
      className="group flex items-center gap-3 px-4 py-3 hover:bg-muted/30"
    >
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium group-hover:text-primary">
          {c.name}
          {c.role === "supports" ? (
            <span className="ml-2 text-xs font-normal text-muted-foreground">
              supports
            </span>
          ) : null}
        </p>
        <p className="truncate text-xs text-muted-foreground">
          {[c.subject, c.yearGroup, c.arm].filter(Boolean).join(" · ")}
          {c.waitingForMarks > 0 ? ` · ${c.waitingForMarks} to mark` : ""}
          {c.notes && c.notes.written < c.notes.expected
            ? ` · ${c.notes.written}/${c.notes.expected} notes`
            : ""}
        </p>
      </div>
      <div className="text-right">
        <p
          className={cn(
            "text-sm font-medium tabular-nums",
            below && "text-destructive",
          )}
        >
          {c.average != null ? `${c.average}%` : "—"}
        </p>
        <p className="text-xs tabular-nums text-muted-foreground">
          {c.othersAverage != null
            ? `others ${c.othersAverage}%`
            : "only class in " + (c.yearGroup ?? "its year")}
        </p>
      </div>
      <IconChevronRight size={16} className="shrink-0 text-muted-foreground" />
    </Link>
  );
}
