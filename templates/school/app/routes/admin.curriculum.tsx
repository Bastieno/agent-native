import { useQuery } from "@tanstack/react-query";
import { agentNativePath } from "@agent-native/core/client";
import { useNavigationState } from "@/hooks/use-navigation-state";
import { useEffect } from "react";
import { Link } from "react-router";
import { Badge } from "@/components/ui/badge";
import { IconBook } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

type Coverage = {
  id: string;
  name: string;
  code: string | null;
  color: string | null;
  units: number;
  objectives: number;
  yearGroups: string[];
  started: boolean;
  emptyUnits: number;
};

/**
 * The curriculum, by how much of it exists.
 *
 * This page used to list every subject with its name, its code and a badge
 * reading "active" — which every subject was, so the badge carried no
 * information while taking the brand colour and the eye. Twenty-six identical
 * cards told an admin nothing about the one thing they came here to find out:
 * what still needs building.
 *
 * Now each card says what has actually been written, the ones not started come
 * first because they are the work, and year groups are shown where they are
 * known — drawn from the units themselves rather than from a label.
 */
export default function AdminCurriculum() {
  const { sync } = useNavigationState();

  useEffect(() => {
    sync({ role: "admin", view: "curriculum" });
  }, [sync]);

  const { data } = useQuery<{
    subjects: Coverage[];
    total: number;
    withCurriculum: number;
    notStarted: number;
  } | null>({
    queryKey: ["curriculum-coverage"],
    queryFn: async () => {
      const res = await fetch(
        agentNativePath("/_agent-native/actions/get-curriculum-coverage"),
      );
      if (!res.ok) return null;
      return res.json();
    },
  });

  const subjects = data?.subjects ?? [];
  // The work comes first: a subject with nothing written is what an admin is
  // here to find.
  const ordered = [...subjects].sort((a, b) => {
    if (a.started !== b.started) return a.started ? 1 : -1;
    return a.name.localeCompare(b.name);
  });

  return (
    <div className="h-full space-y-6 overflow-auto p-6">
      <div>
        <h1 className="text-xl font-semibold">Curriculum</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {data
            ? data.notStarted > 0
              ? `${data.withCurriculum} of ${data.total} subjects have a curriculum · ${data.notStarted} not started`
              : `All ${data.total} subjects have a curriculum`
            : "Subjects, units, and learning objectives for your school."}
        </p>
      </div>

      {subjects.length === 0 ? (
        <div className="rounded-lg border border-dashed p-10 text-center">
          <IconBook size={32} className="mx-auto mb-3 text-muted-foreground" />
          <p className="text-sm font-medium">No subjects yet</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Ask the agent to start a curriculum co-authoring session.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ordered.map((subject) => (
            <Link
              key={subject.id}
              to={`/admin/curriculum/${subject.id}`}
              className={cn(
                "space-y-2 rounded-lg border bg-card p-4 transition-colors hover:border-primary/40",
                // Not started is the state worth noticing, so it is the one
                // that looks different.
                subject.started ? "" : "border-dashed",
              )}
            >
              <div className="flex items-center gap-2">
                <div
                  className="h-3 w-3 shrink-0 rounded-full"
                  style={{
                    backgroundColor: subject.color ?? "hsl(var(--primary))",
                  }}
                />
                <span className="min-w-0 truncate text-sm font-medium">
                  {subject.name}
                </span>
                {subject.code ? (
                  <span className="ml-auto shrink-0 text-[11px] text-muted-foreground">
                    {subject.code}
                  </span>
                ) : null}
              </div>

              {subject.started ? (
                <>
                  <p className="text-xs text-muted-foreground">
                    {subject.units} unit{subject.units === 1 ? "" : "s"} ·{" "}
                    {subject.objectives} objective
                    {subject.objectives === 1 ? "" : "s"}
                  </p>
                  {subject.yearGroups.length > 0 ? (
                    <p className="truncate text-xs text-muted-foreground">
                      {subject.yearGroups.join(", ")}
                    </p>
                  ) : null}
                  {/* Units with nothing in them are half-done, not done. */}
                  {subject.emptyUnits > 0 ? (
                    <Badge variant="outline" className="text-[11px]">
                      {subject.emptyUnits} unit
                      {subject.emptyUnits === 1 ? "" : "s"} with no objectives
                    </Badge>
                  ) : null}
                </>
              ) : (
                <p className="text-xs text-muted-foreground">
                  No curriculum yet
                </p>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
