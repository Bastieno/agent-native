import { useQuery } from "@tanstack/react-query";
import { agentNativePath } from "@agent-native/core/client";
import { useNavigationState } from "@/hooks/use-navigation-state";
import { firstNameOrNull } from "@shared/person-name";
import { useRole } from "@/hooks/use-role";
import { useEffect } from "react";
import { Link } from "react-router";
import {
  IconUsers,
  IconSchool,
  IconBook,
  IconMessageDots,
  IconPointFilled,
} from "@tabler/icons-react";

function StatCard({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: number | string;
  icon: React.ElementType;
}) {
  return (
    <div className="rounded-lg border bg-card p-4 flex items-center gap-4">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
        <Icon size={20} />
      </div>
      <div>
        <p className="text-2xl font-semibold">{value}</p>
        <p className="text-xs text-muted-foreground">{label}</p>
      </div>
    </div>
  );
}

export default function AdminOverview() {
  const { sync } = useNavigationState();
  const { schoolId, user } = useRole();

  const { data: stats } = useQuery({
    queryKey: ["admin-overview-stats"],
    queryFn: async () => {
      const res = await fetch(
        agentNativePath("/_agent-native/actions/get-school-stats"),
      );
      if (!res.ok) return null;
      return res.json();
    },
  });

  const isNewSchool = !schoolId;

  useEffect(() => {
    sync({
      role: "admin",
      view: "overview",
      isNewSchool: !schoolId,
      staffCount: stats?.staffCount ?? 0,
      studentCount: stats?.studentCount ?? 0,
      classCount: stats?.classCount ?? 0,
      subjectCount: stats?.subjectCount ?? 0,
    } as any);
  }, [sync, schoolId, stats]);

  return (
    <div className="h-full overflow-auto p-6 space-y-6">
      <div>
        <h1 className="text-xl font-semibold">
          {firstNameOrNull(user?.name, user?.email)
            ? `Welcome back, ${firstNameOrNull(user?.name, user?.email)}`
            : "School Overview"}
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Manage your school, staff, students, and curriculum.
        </p>
      </div>

      {isNewSchool ? (
        <div className="rounded-lg border-2 border-dashed border-primary/30 bg-primary/5 p-8 flex flex-col items-center text-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
            <IconSchool size={28} />
          </div>
          <div>
            <h2 className="text-base font-semibold">Set up your school</h2>
            <p className="text-sm text-muted-foreground mt-1 max-w-md">
              Your school hasn&apos;t been configured yet. Open the agent
              sidebar and tell it about your school — name, type, grade
              structure, grading scale, and timezone — to get started.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground bg-muted rounded-md px-3 py-2">
            <IconMessageDots size={14} />
            <span>
              Click the chat icon in the top-right of the sidebar, then say:{" "}
              <span className="font-medium text-foreground">
                &quot;Set up my school&quot;
              </span>
            </span>
          </div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            <Link
              to="/admin/staff"
              className="rounded-lg hover:opacity-80 transition-opacity"
            >
              <StatCard
                label="Staff Members"
                value={stats?.staffCount ?? "—"}
                icon={IconUsers}
              />
            </Link>
            <Link
              to="/admin/students"
              className="rounded-lg hover:opacity-80 transition-opacity"
            >
              <StatCard
                label="Students"
                value={stats?.studentCount ?? "—"}
                icon={IconUsers}
              />
            </Link>
            <Link
              to="/admin/classes"
              className="rounded-lg hover:opacity-80 transition-opacity"
            >
              <StatCard
                label="Classes"
                value={stats?.classCount ?? "—"}
                icon={IconSchool}
              />
            </Link>
            <Link
              to="/admin/curriculum"
              className="rounded-lg hover:opacity-80 transition-opacity"
            >
              <StatCard
                label="Subjects"
                value={stats?.subjectCount ?? "—"}
                icon={IconBook}
              />
            </Link>
          </div>
          <NeedsAttention />
        </>
      )}
    </div>
  );
}

/**
 * What this school needs doing, on the page it opens on.
 *
 * The overview was four counters and a card telling the admin to use the
 * agent — which is already in the sidebar beside it. Counting staff and
 * subjects says nothing about whether the school is ready to teach on
 * Monday, and everything that does was already computed on other pages: a
 * class with no teacher cannot have work published to it, a class with no
 * curriculum has nothing to write lesson notes from, and a learner with no
 * year group is outside every plan the school makes.
 *
 * Each line is a count and the page that fixes it. Nothing new is computed
 * here, and a school with nothing outstanding reads one quiet sentence
 * rather than an empty dashboard.
 */
function NeedsAttention() {
  const { data: coverage } = useQuery({
    queryKey: ["admin-overview-coverage"],
    queryFn: async () => {
      const res = await fetch(
        agentNativePath("/_agent-native/actions/get-lesson-note-coverage"),
      );
      if (!res.ok) return null;
      return res.json();
    },
  });
  const { data: records } = useQuery({
    queryKey: ["admin-overview-records"],
    queryFn: async () => {
      const res = await fetch(
        agentNativePath("/_agent-native/actions/check-student-records"),
      );
      if (!res.ok) return null;
      return res.json();
    },
  });

  const totals = coverage?.totals;
  const term = coverage?.term?.name;
  const plural = (n: number, one: string, many: string) =>
    `${n} ${n === 1 ? one : many}`;

  const items: { text: string; to: string }[] = [];
  if (totals?.withoutTeacher) {
    items.push({
      text: `${plural(totals.withoutTeacher, "class has", "classes have")} no teacher, so no work can be published to ${totals.withoutTeacher === 1 ? "it" : "them"}`,
      to: "/admin/classes",
    });
  }
  if (totals?.noCurriculum) {
    items.push({
      text: `${plural(totals.noCurriculum, "class has", "classes have")} no curriculum for ${term ?? "this term"}`,
      to: "/admin/curriculum",
    });
  }
  const behind = (totals?.withGaps ?? 0) + (totals?.withNothing ?? 0);
  if (behind > 0) {
    items.push({
      text: `${plural(behind, "class is", "classes are")} behind on lesson notes`,
      to: "/admin/lessons",
    });
  }
  // Written but not declared ready is its own state, and it is the one a
  // head teacher is asking about on a Sunday: the notes exist, but nobody
  // has said they are ready to teach.
  const written = (totals?.classes ?? 0) - (totals?.noCurriculum ?? 0);
  const notReady = Math.max(0, written - behind - (totals?.ready ?? 0));
  if (notReady > 0) {
    items.push({
      text: `${plural(notReady, "class has", "classes have")} lesson notes written but not yet marked ready`,
      to: "/admin/lessons",
    });
  }
  if (records?.withoutYearGroup?.length) {
    items.push({
      text: `${plural(records.withoutYearGroup.length, "learner has", "learners have")} no year group`,
      to: "/admin/students",
    });
  }
  for (const field of records?.byField ?? []) {
    if (field.missingCount > 0) {
      items.push({
        text: `${plural(field.missingCount, "learner has", "learners have")} no ${field.label}`,
        to: "/admin/students",
      });
    }
  }

  // Still loading, and nothing to say yet.
  if (!coverage && !records) return null;

  return (
    <div className="rounded-lg border bg-card p-6">
      <h2 className="mb-3 text-sm font-medium">Needs attention</h2>
      {items.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          Nothing outstanding: every class has a teacher and a curriculum, the
          lesson notes are written, and every learner&apos;s record is complete.
        </p>
      ) : (
        <ul className="space-y-2">
          {items.map((item) => (
            <li key={item.text}>
              <Link
                to={item.to}
                className="group flex items-start gap-2 text-sm text-muted-foreground hover:text-foreground"
              >
                <IconPointFilled
                  size={14}
                  className="mt-0.5 shrink-0 text-muted-foreground/60"
                />
                <span className="underline-offset-2 group-hover:underline">
                  {item.text}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
