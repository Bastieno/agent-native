import { DraftsWaiting } from "@/components/help/DraftsWaiting";
import { HelpNudge } from "@/components/help/HelpNudge";
import { useQuery } from "@tanstack/react-query";
import { agentNativePath } from "@agent-native/core/client";
import { useNavigationState } from "@/hooks/use-navigation-state";
import { firstNameOrNull } from "@shared/person-name";
import { useRole } from "@/hooks/use-role";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import {
  IconUsers,
  IconSchool,
  IconBook,
  IconMessageDots,
  IconPointFilled,
  IconChevronDown,
} from "@tabler/icons-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

function StatCard({
  label,
  value,
  icon: Icon,
  note,
}: {
  label: string;
  value: number | string;
  icon: React.ElementType;
  /** One fact worth knowing about this count, shown only when there is one. */
  note?: string | null;
}) {
  return (
    <div className="flex h-full items-center gap-4 rounded-lg border bg-card p-4">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
        <Icon size={20} />
      </div>
      <div>
        {value === "—" ? (
          <div
            className="my-1 h-6 w-10 animate-pulse rounded bg-muted"
            aria-label="Loading"
          />
        ) : (
          <p className="text-2xl font-semibold">{value}</p>
        )}
        <p className="text-xs text-muted-foreground">{label}</p>
        {note && <p className="mt-0.5 text-xs text-amber-600">{note}</p>}
      </div>
    </div>
  );
}

// One read feeds the counters' notes and the Needs attention list. The list
// itself is made on the server (`get-school-attention`), so the page and the
// assistant always agree on what needs doing and in what order.
function useAttention() {
  return useQuery({
    queryKey: ["admin-overview-attention"],
    queryFn: async () => {
      const res = await fetch(
        agentNativePath("/_agent-native/actions/get-school-attention"),
      );
      if (!res.ok) return null;
      return res.json();
    },
  });
}

/** Where each kind of item is fixed. */
const PAGE_ROUTE: Record<string, string> = {
  classes: "/admin/classes",
  curriculum: "/admin/curriculum",
  "lesson notes": "/admin/lessons",
  students: "/admin/students",
};

const statsCacheKey = (schoolId: string) => `school-overview-stats:${schoolId}`;

/** The last counters this browser saw, so a return visit shows numbers at once. */
function cachedStats(schoolId: string): Record<string, number> | undefined {
  try {
    const raw = localStorage.getItem(statsCacheKey(schoolId));
    return raw ? JSON.parse(raw) : undefined;
  } catch {
    return undefined;
  }
}

export default function AdminOverview() {
  const { sync } = useNavigationState();
  const { schoolId, user } = useRole();

  const { data: stats, isPlaceholderData } = useQuery({
    queryKey: ["admin-overview-stats"],
    queryFn: async () => {
      const res = await fetch(
        agentNativePath("/_agent-native/actions/get-school-stats"),
      );
      if (!res.ok) return null;
      const fresh = await res.json();
      try {
        if (schoolId) {
          localStorage.setItem(statsCacheKey(schoolId), JSON.stringify(fresh));
        }
      } catch {
        // The cache is a convenience; the page works without it.
      }
      return fresh;
    },
    // Shown until the real figures arrive, then replaced by them.
    // Only for this school, so nobody sees another school's figures.
    placeholderData: () => (schoolId ? cachedStats(schoolId) : undefined),
  });

  const { data: attention } = useAttention();
  const noYearGroup: number = attention?.counts?.learnersWithoutYearGroup ?? 0;
  const noTeacher: number = attention?.counts?.classesWithoutTeacher ?? 0;

  const isNewSchool = !schoolId;

  useEffect(() => {
    sync({
      role: "admin",
      view: "overview",
      isNewSchool: !schoolId,
      // Left out until the counts have loaded, so the agent is never told 0.
      ...(stats && !isPlaceholderData
        ? {
            staffCount: stats.staffCount ?? 0,
            studentCount: stats.studentCount ?? 0,
            classCount: stats.classCount ?? 0,
            subjectCount: stats.subjectCount ?? 0,
          }
        : {}),
    } as any);
  }, [sync, schoolId, stats, isPlaceholderData]);

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
      <HelpNudge />
      <DraftsWaiting role="admin" />

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
              className="h-full rounded-lg hover:opacity-80 transition-opacity"
            >
              <StatCard
                label="Staff Members"
                value={stats?.staffCount ?? "—"}
                icon={IconUsers}
              />
            </Link>
            <Link
              to="/admin/students"
              className="h-full rounded-lg hover:opacity-80 transition-opacity"
            >
              <StatCard
                label="Students"
                value={stats?.studentCount ?? "—"}
                icon={IconUsers}
                note={
                  noYearGroup ? `${noYearGroup} without a year group` : null
                }
              />
            </Link>
            <Link
              to="/admin/classes"
              className="h-full rounded-lg hover:opacity-80 transition-opacity"
            >
              <StatCard
                label="Classes"
                value={stats?.classCount ?? "—"}
                icon={IconSchool}
                note={noTeacher ? `${noTeacher} without a teacher` : null}
              />
            </Link>
            <Link
              to="/admin/curriculum"
              className="h-full rounded-lg hover:opacity-80 transition-opacity"
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
  const { data: attention } = useAttention();
  const [showAll, setShowAll] = useState(false);

  const items: { text: string; to: string; blocks?: boolean }[] = (
    attention?.items ?? []
  ).map((i: { text: string; page: string; blocks: boolean }) => ({
    text: i.text,
    to: PAGE_ROUTE[i.page] ?? "/admin",
    blocks: i.blocks,
  }));

  // Still loading, and nothing to say yet.
  if (!attention) return null;

  return (
    <div className="rounded-lg border bg-card p-6">
      <h2 className="mb-3 text-sm font-medium">Needs attention</h2>
      {items.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          Nothing outstanding: every class has a teacher and a curriculum, the
          lesson notes are written, and every learner&apos;s record is complete.
        </p>
      ) : (
        <Collapsible open={showAll} onOpenChange={setShowAll}>
          <ul className="space-y-2">
            {items.slice(0, VISIBLE).map((item) => (
              <AttentionRow key={item.text} item={item} />
            ))}
          </ul>
          {items.length > VISIBLE && (
            <>
              <CollapsibleContent>
                <ul className="mt-2 space-y-2">
                  {items.slice(VISIBLE).map((item) => (
                    <AttentionRow key={item.text} item={item} />
                  ))}
                </ul>
              </CollapsibleContent>
              <CollapsibleTrigger className="mt-3 flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
                {showAll ? "Show less" : `${items.length - VISIBLE} more`}
                <IconChevronDown
                  size={14}
                  className={showAll ? "rotate-180" : ""}
                />
              </CollapsibleTrigger>
            </>
          )}
        </Collapsible>
      )}
    </div>
  );
}

const VISIBLE = 3;

function AttentionRow({
  item,
}: {
  item: { text: string; to: string; blocks?: boolean };
}) {
  return (
    <li>
      <Link
        to={item.to}
        className={`group flex items-start gap-2 text-sm hover:text-foreground ${
          item.blocks ? "text-foreground" : "text-muted-foreground"
        }`}
      >
        <IconPointFilled
          size={14}
          className={`mt-0.5 shrink-0 ${
            item.blocks ? "text-amber-500" : "text-muted-foreground/60"
          }`}
        />
        <span className="underline-offset-2 group-hover:underline">
          {item.text}
        </span>
      </Link>
    </li>
  );
}
