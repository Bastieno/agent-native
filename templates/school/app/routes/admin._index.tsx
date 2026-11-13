import { httpError } from "@/lib/http-error";
import { DraftsWaiting } from "@/components/help/DraftsWaiting";
import { HelpNudge } from "@/components/help/HelpNudge";
import { useQuery } from "@tanstack/react-query";
import { agentNativePath } from "@agent-native/core/client";
import { useNavigationState } from "@/hooks/use-navigation-state";
import { realNameOrNull } from "@shared/person-name";
import { useRole } from "@/hooks/use-role";
import { useReadiness } from "@/hooks/use-readiness";
import { sendToAgentChat } from "@agent-native/core/client";
import { NEEDS, NEED_ORDER } from "@shared/readiness";
import { Button } from "@/components/ui/button";
import { IconCheck, IconCircle } from "@tabler/icons-react";
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
        {note && <p className="mt-0.5 text-xs text-attention">{note}</p>}
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
      if (!res.ok) throw await httpError(res);
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
      if (!res.ok) throw await httpError(res);
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

  const { facts } = useReadiness();
  const setupIncomplete = !!facts && NEED_ORDER.some((n) => !facts[n]);
  const { data: attention } = useAttention();
  const noYearGroup: number = attention?.counts?.learnersWithoutYearGroup ?? 0;
  const noTeacher: number = attention?.counts?.classesWithoutTeacher ?? 0;

  // New until it has something to teach with, not only until it has a record:
  // a school with no subjects, classes or learners is not "all clear".
  // Figures cached by an older version carry no flag: work it out from the counts.
  const needsSetup = stats
    ? (stats.needsSetup ??
      (!stats.studentCount && !stats.classCount && !stats.subjectCount))
    : false;
  const isNewSchool = !schoolId || !!needsSetup;
  // Neither the cached nor the fresh figures yet: show nothing in their place,
  // not zeros that are about to be replaced by the setup card.
  const countsLoading = !!schoolId && !stats;

  useEffect(() => {
    sync({
      role: "admin",
      view: "overview",
      isNewSchool,
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
  }, [sync, schoolId, isNewSchool, stats, isPlaceholderData]);

  return (
    <div className="h-full overflow-auto p-6 space-y-6">
      <div>
        <h1 className="text-xl font-semibold">
          {/* Greet everyone; by name only when we have a real one. */}
          {realNameOrNull(user?.name, user?.email)
            ? `Welcome back, ${realNameOrNull(user?.name, user?.email)}`
            : "Welcome back"}
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Manage your school, staff, students, and curriculum.
        </p>
      </div>
      {/* A school with nothing in it has one clear next step, the card below. */}
      {!isNewSchool && !countsLoading && <HelpNudge />}
      <DraftsWaiting role="admin" />

      {countsLoading ? (
        <div className="h-40 animate-pulse rounded-lg border bg-muted/30" />
      ) : isNewSchool && setupIncomplete ? (
        // Nothing to count yet: the checklist is the whole page.
        <SetupChecklist facts={facts!} />
      ) : isNewSchool ? (
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
          {setupIncomplete && <SetupChecklist facts={facts!} />}
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
 * The first steps, each with what it opens. It is the one place that names
 * what a hidden page needs, and it goes away when the steps are done.
 */
function SetupChecklist({ facts }: { facts: Record<string, boolean> }) {
  const next = NEED_ORDER.find((n) => !facts[n]);
  return (
    <div className="rounded-lg border bg-card p-6">
      <h2 className="text-sm font-medium">Set up your school</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        A few first steps, and more of the app opens as each is done.
      </p>
      <ul className="mt-4 space-y-3">
        {NEED_ORDER.map((n) => (
          <li key={n} className="flex items-start gap-2.5">
            {facts[n] ? (
              <IconCheck size={16} className="mt-0.5 shrink-0 text-primary" />
            ) : (
              <IconCircle
                size={16}
                className="mt-0.5 shrink-0 text-muted-foreground"
              />
            )}
            <div className="min-w-0 flex-1">
              <p
                className={
                  facts[n] ? "text-sm text-muted-foreground" : "text-sm"
                }
              >
                {NEEDS[n].label}
              </p>
              <p className="text-xs text-muted-foreground">{NEEDS[n].opens}</p>
            </div>
            {n === next ? (
              <Button
                size="sm"
                onClick={() =>
                  sendToAgentChat({
                    message: NEEDS[n].ask,
                    // into the box, not sent: the person reads it, edits it and presses send
                    submit: false,
                    openSidebar: true,
                  })
                }
              >
                <IconMessageDots size={14} className="mr-1.5" />
                Start
              </Button>
            ) : null}
          </li>
        ))}
      </ul>
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
  ).map(
    (i: { text: string; page: string; blocks: boolean; show?: string }) => ({
      text: i.text,
      to: `${PAGE_ROUTE[i.page] ?? "/admin"}${i.show ? `?show=${i.show}` : ""}`,
      blocks: i.blocks,
    }),
  );

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
            item.blocks ? "text-attention" : "text-muted-foreground/60"
          }`}
        />
        <span className="underline-offset-2 group-hover:underline">
          {item.text}
        </span>
      </Link>
    </li>
  );
}
