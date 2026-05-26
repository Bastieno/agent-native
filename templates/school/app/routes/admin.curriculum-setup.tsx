import { useQuery } from "@tanstack/react-query";
import { agentNativePath } from "@agent-native/core/client";
import { useNavigationState } from "@/hooks/use-navigation-state";
import { useSearchParams } from "react-router";
import { useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { IconWand, IconCheck } from "@tabler/icons-react";
import { useCurriculumDraft } from "@/hooks/use-curriculum-draft";

export default function AdminCurriculumSetup() {
  const { sync } = useNavigationState();
  const [searchParams] = useSearchParams();
  const draftId = searchParams.get("draftId") ?? undefined;

  useEffect(() => {
    sync({ role: "admin", view: "curriculum-setup", curriculumDraftId: draftId });
  }, [sync, draftId]);

  const { draftState: liveDraft } = useCurriculumDraft(draftId ?? null);

  const { data: activeDraft } = useQuery({
    queryKey: ["curriculum-draft", draftId],
    queryFn: async () => {
      if (!draftId) return null;
      const res = await fetch(agentNativePath(`/api/school/curriculum-drafts/${draftId}`));
      if (!res.ok) return null;
      return res.json();
    },
    enabled: !!draftId,
  });

  const draft = liveDraft ?? activeDraft;

  if (!draftId) {
    return (
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-xl font-semibold">Curriculum Setup</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Co-author your curriculum with the agent.
          </p>
        </div>
        <div className="rounded-lg border border-dashed p-12 text-center">
          <IconWand size={28} className="mx-auto text-muted-foreground mb-3" />
          <p className="text-sm font-medium">Start a curriculum session</p>
          <p className="text-xs text-muted-foreground mt-1 max-w-xs mx-auto">
            Ask the agent to start setting up your curriculum. It will guide you
            through subjects, units, and learning objectives in a live session.
          </p>
        </div>
      </div>
    );
  }

  const subjects: any[] = (draft?.stateJson as any)?.subjects ?? [];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">
            {(draft as any)?.sessionTitle ?? "Curriculum Session"}
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Live co-authoring workspace — changes update in real time.
          </p>
        </div>
        {(draft as any)?.status === "committed" ? (
          <Badge className="text-xs gap-1">
            <IconCheck size={12} />
            Committed
          </Badge>
        ) : (
          <Badge variant="secondary" className="text-xs">In Progress</Badge>
        )}
      </div>

      {subjects.length === 0 ? (
        <div className="rounded-lg border border-dashed p-8 text-center">
          <p className="text-sm text-muted-foreground">
            The agent is building the curriculum structure…
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {subjects.map((subject: any, si: number) => (
            <div key={si} className="rounded-lg border p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold">{subject.name}</h3>
                {subject.code && (
                  <span className="text-xs text-muted-foreground">{subject.code}</span>
                )}
              </div>
              {subject.units && subject.units.length > 0 && (
                <div className="space-y-2 pl-2 border-l-2 border-muted">
                  {subject.units.map((unit: any, ui: number) => (
                    <div key={ui} className="space-y-1">
                      <p className="text-sm font-medium">{unit.title}</p>
                      {unit.learningObjectives && unit.learningObjectives.length > 0 && (
                        <ul className="space-y-0.5 pl-3">
                          {unit.learningObjectives.map((obj: string, oi: number) => (
                            <li key={oi} className="text-xs text-muted-foreground flex gap-1.5">
                              <span>•</span>
                              <span>{obj}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
