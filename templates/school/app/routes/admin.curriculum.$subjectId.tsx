import { useQuery } from "@tanstack/react-query";
import { agentNativePath } from "@agent-native/core/client";
import { useNavigationState } from "@/hooks/use-navigation-state";
import { useEffect } from "react";
import { useParams } from "react-router";
import { Badge } from "@/components/ui/badge";
import { IconBook, IconChevronRight } from "@tabler/icons-react";

export default function AdminSubjectDetail() {
  const { subjectId } = useParams<{ subjectId: string }>();
  const { sync } = useNavigationState();

  useEffect(() => {
    sync({ role: "admin", view: "curriculum", subjectId });
  }, [sync, subjectId]);

  const { data: subject } = useQuery({
    queryKey: ["subject", subjectId],
    queryFn: async () => {
      const res = await fetch(agentNativePath(`/api/school/subjects/${subjectId}`));
      if (!res.ok) return null;
      return res.json();
    },
    enabled: !!subjectId,
  });

  const { data: units } = useQuery({
    queryKey: ["units", subjectId],
    queryFn: async () => {
      const res = await fetch(agentNativePath(`/api/school/units?subjectId=${subjectId}`));
      if (!res.ok) return [];
      return res.json();
    },
    enabled: !!subjectId,
  });

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span>Curriculum</span>
        <IconChevronRight size={14} />
        <span className="text-foreground font-medium">{subject?.name ?? "Subject"}</span>
      </div>

      {subject && (
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-xl font-semibold">{subject.name}</h1>
            {subject.code && (
              <p className="text-sm text-muted-foreground mt-0.5">Code: {subject.code}</p>
            )}
          </div>
          <Badge variant="secondary" className="text-xs capitalize">
            {subject.status}
          </Badge>
        </div>
      )}

      <div className="space-y-3">
        <h2 className="text-sm font-medium">Units</h2>
        {!units || units.length === 0 ? (
          <div className="rounded-lg border border-dashed p-8 text-center">
            <IconBook size={24} className="mx-auto text-muted-foreground mb-2" />
            <p className="text-sm font-medium">No units yet</p>
            <p className="text-xs text-muted-foreground mt-1">
              Ask the agent to create units for this subject.
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {(units ?? []).map((unit: any, idx: number) => (
              <div
                key={unit.id}
                className="rounded-lg border p-4 space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground w-5">{idx + 1}.</span>
                    <span className="text-sm font-medium">{unit.title}</span>
                  </div>
                  <Badge variant="outline" className="text-xs capitalize">
                    {unit.status}
                  </Badge>
                </div>
                {unit.description && (
                  <p className="text-xs text-muted-foreground pl-7">{unit.description}</p>
                )}
                {unit.learningObjectives && unit.learningObjectives.length > 0 && (
                  <ul className="pl-7 space-y-0.5">
                    {unit.learningObjectives.map((obj: any) => (
                      <li key={obj.id} className="text-xs text-muted-foreground flex gap-1.5">
                        <span>•</span>
                        <span>{obj.description}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
