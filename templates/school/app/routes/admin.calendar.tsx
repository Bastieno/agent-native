import { useQuery } from "@tanstack/react-query";
import { agentNativePath } from "@agent-native/core/client";
import { useNavigationState } from "@/hooks/use-navigation-state";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { ListState } from "@/components/ListState";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { IconCalendar, IconChevronRight } from "@tabler/icons-react";

async function getJson(path: string) {
  const res = await fetch(agentNativePath(path));
  if (!res.ok) return null;
  return res.json();
}

export default function AdminCalendar() {
  const { sync } = useNavigationState();
  const [termId, setTermId] = useState<string>("");

  useEffect(() => {
    sync({ role: "admin", view: "calendar" });
  }, [sync]);

  const { data: terms = [] } = useQuery<any[]>({
    queryKey: ["terms"],
    queryFn: async () =>
      (await getJson("/_agent-native/actions/list-terms")) ?? [],
  });

  // Default to the term covering today, else the first one.
  useEffect(() => {
    if (termId || terms.length === 0) return;
    const today = new Date().toISOString().slice(0, 10);
    const current = terms.find(
      (t: any) => t.startDate <= today && t.endDate >= today,
    );
    setTermId(current?.id ?? terms[0].id);
  }, [terms, termId]);

  const { data: calendar, isLoading } = useQuery({
    queryKey: ["curriculum-calendar", termId],
    queryFn: async () =>
      await getJson(
        `/_agent-native/actions/get-curriculum-calendar?termId=${termId}`,
      ),
    enabled: !!termId,
  });

  const today = new Date().toISOString().slice(0, 10);
  const termStart = calendar?.term?.startDate;
  const currentWeek =
    termStart && today >= termStart
      ? Math.floor(
          (new Date(today).getTime() - new Date(termStart).getTime()) /
            (7 * 24 * 60 * 60 * 1000),
        ) + 1
      : null;

  return (
    <div className="h-full overflow-auto p-6 space-y-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold">Curriculum Calendar</h1>
          <p className="text-sm text-muted-foreground mt-1">
            What each year group covers, week by week.
          </p>
        </div>
        {terms.length > 0 && (
          <Select value={termId} onValueChange={setTermId}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select term" />
            </SelectTrigger>
            <SelectContent>
              {terms.map((t: any) => (
                <SelectItem key={t.id} value={t.id}>
                  {t.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>

      {isLoading || !calendar || calendar.unitCount === 0 ? (
        <ListState
          loading={isLoading}
          icon={IconCalendar}
          title="No curriculum planned for this term"
          description="Ask the agent to generate a scheme of work for a subject and year group."
          rows={5}
        />
      ) : (
        <>
          <div className="flex flex-wrap gap-4 text-sm">
            {[
              { label: "Teaching weeks", value: calendar.weeks },
              { label: "Units", value: calendar.unitCount },
              { label: "Lesson notes", value: calendar.lessonNoteCount },
              {
                label: "Finalized",
                value: `${calendar.finalizedLessonCount}/${calendar.lessonNoteCount}`,
              },
            ].map(({ label, value }) => (
              <div key={label} className="rounded-lg border bg-card px-4 py-2">
                <p className="text-lg font-semibold leading-tight">{value}</p>
                <p className="text-xs text-muted-foreground">{label}</p>
              </div>
            ))}
          </div>

          <div className="space-y-2">
            {calendar.calendar.map((week: any) => {
              const isCurrent = currentWeek === week.week;
              return (
                <Collapsible key={week.week} defaultOpen={isCurrent}>
                  <div
                    className={`rounded-lg border ${isCurrent ? "border-primary/60 bg-primary/5" : ""}`}
                  >
                    <CollapsibleTrigger className="group flex w-full items-center gap-3 px-4 py-3 text-left">
                      <IconChevronRight
                        size={15}
                        className="shrink-0 text-muted-foreground transition-transform group-data-[state=open]:rotate-90"
                      />
                      <span className="text-sm font-medium shrink-0">
                        Week {week.week}
                      </span>
                      {isCurrent && (
                        <Badge className="text-xs h-5">This week</Badge>
                      )}
                      <span className="text-xs text-muted-foreground truncate ml-1">
                        {week.entries.length === 0
                          ? "Nothing planned"
                          : week.entries
                              .map(
                                (e: any) => `${e.subjectName} · ${e.unitTitle}`,
                              )
                              .join("  ·  ")}
                      </span>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <div className="border-t px-4 py-3 space-y-4">
                        {week.entries.length === 0 ? (
                          <p className="text-sm text-muted-foreground">
                            No unit covers this week.
                          </p>
                        ) : (
                          week.entries.map((entry: any) => (
                            <div key={entry.unitId} className="space-y-2">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="text-sm font-medium">
                                  {entry.subjectName}
                                </span>
                                <Badge variant="outline" className="text-xs">
                                  {entry.gradeLevelName}
                                </Badge>
                                <span className="text-xs text-muted-foreground">
                                  {entry.unitTitle}
                                </span>
                                <Badge
                                  variant={
                                    entry.lessonsPrepared > 0
                                      ? "default"
                                      : "secondary"
                                  }
                                  className="text-xs ml-auto"
                                >
                                  {entry.lessonsPrepared > 0
                                    ? `${entry.lessonsPrepared} lesson${entry.lessonsPrepared === 1 ? "" : "s"} ready`
                                    : entry.lessonsDrafted > 0
                                      ? "Draft lesson"
                                      : "No lesson note"}
                                </Badge>
                              </div>
                              {entry.objectives.length > 0 && (
                                <ul className="list-disc pl-5 space-y-0.5">
                                  {entry.objectives
                                    .slice(0, 4)
                                    .map((o: string, i: number) => (
                                      <li
                                        key={i}
                                        className="text-xs text-muted-foreground"
                                      >
                                        {o}
                                      </li>
                                    ))}
                                  {entry.objectives.length > 4 && (
                                    <li className="text-xs text-muted-foreground">
                                      +{entry.objectives.length - 4} more
                                    </li>
                                  )}
                                </ul>
                              )}
                            </div>
                          ))
                        )}
                      </div>
                    </CollapsibleContent>
                  </div>
                </Collapsible>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
