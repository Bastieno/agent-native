import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { agentNativePath } from "@agent-native/core/client";
import { useNavigationState } from "@/hooks/use-navigation-state";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IconAlertTriangle } from "@tabler/icons-react";

export default function TeacherAssessment() {
  const { assessmentId } = useParams();
  const { sync } = useNavigationState();
  const [activeVariant, setActiveVariant] = useState<string | null>(null);

  const { data: assessment } = useQuery({
    queryKey: ["assessment", assessmentId],
    queryFn: async () => {
      const res = await fetch(agentNativePath(`/api/school/assessments/${assessmentId}`));
      if (!res.ok) return null;
      return res.json();
    },
    enabled: !!assessmentId,
  });

  const { data: variants = [] } = useQuery<any[]>({
    queryKey: ["variants", assessmentId],
    queryFn: async () => {
      const res = await fetch(agentNativePath(`/api/school/variants?assessmentId=${assessmentId}`));
      if (!res.ok) return [];
      return res.json();
    },
    enabled: !!assessmentId,
  });

  const { data: submissions = [] } = useQuery<any[]>({
    queryKey: ["submissions", assessmentId],
    queryFn: async () => {
      const res = await fetch(agentNativePath(`/api/school/submissions?assessmentId=${assessmentId}`));
      if (!res.ok) return [];
      return res.json();
    },
    enabled: !!assessmentId,
  });

  useEffect(() => {
    if (!assessmentId) return;
    const variantId = activeVariant ?? undefined;
    sync({ role: "teacher", view: "assessment", assessmentId, variantId });
  }, [sync, assessmentId, activeVariant]);

  const statusColor: Record<string, string> = {
    draft: "secondary",
    published: "default",
    closed: "outline",
  };

  const submittedCount = submissions.filter((s: any) => s.status === "submitted").length;
  const gradedCount = submissions.filter((s: any) => s.status === "graded").length;

  return (
    <div className="h-full overflow-auto p-6 space-y-4">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-xl font-semibold">{assessment?.title ?? "Assessment"}</h1>
          {assessment?.dueDate && (
            <p className="text-xs text-muted-foreground mt-0.5">Due: {assessment.dueDate}</p>
          )}
        </div>
        {assessment && (
          <Badge variant={statusColor[assessment.status] as any}>{assessment.status}</Badge>
        )}
      </div>

      <div className="flex gap-4 text-sm">
        <div className="text-center">
          <p className="text-xl font-semibold">{submittedCount}</p>
          <p className="text-xs text-muted-foreground">Submitted</p>
        </div>
        <div className="text-center">
          <p className="text-xl font-semibold">{gradedCount}</p>
          <p className="text-xs text-muted-foreground">Graded</p>
        </div>
        <div className="text-center">
          <p className="text-xl font-semibold">{variants.length}</p>
          <p className="text-xs text-muted-foreground">Variants</p>
        </div>
      </div>

      <Tabs defaultValue="variants">
        <TabsList>
          <TabsTrigger value="variants">Variants</TabsTrigger>
          <TabsTrigger value="submissions">Submissions</TabsTrigger>
        </TabsList>
        <TabsContent value="variants" className="mt-4 space-y-3">
          {variants.length === 0 ? (
            <div className="rounded-lg border border-dashed p-8 text-center">
              <p className="text-sm font-medium">No variants yet</p>
              <p className="text-xs text-muted-foreground mt-1">
                Ask the agent to create variants (e.g. "create hard, medium, and easy versions").
              </p>
            </div>
          ) : (
            <div className="grid gap-3">
              {variants.map((variant: any) => (
                <button
                  key={variant.id}
                  onClick={() => setActiveVariant(variant.id)}
                  className={`rounded-lg border p-4 text-left space-y-2 transition-colors hover:border-primary/40 ${
                    activeVariant === variant.id ? "border-primary bg-primary/5" : ""
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{variant.label}</span>
                    <Badge variant="outline" className="text-xs capitalize">{variant.difficulty}</Badge>
                    <span className="text-xs text-muted-foreground ml-auto">{variant.totalPoints} pts</span>
                  </div>
                  {variant.instructions && (
                    <p className="text-xs text-muted-foreground line-clamp-2">{variant.instructions}</p>
                  )}
                </button>
              ))}
            </div>
          )}
        </TabsContent>
        <TabsContent value="submissions" className="mt-4 space-y-2">
          {submissions.length === 0 ? (
            <p className="text-sm text-muted-foreground">No submissions yet.</p>
          ) : (
            submissions.map((sub: any) => (
              <div key={sub.id} className="flex items-center justify-between rounded-lg border p-3">
                <span className="text-sm">{sub.studentId}</span>
                <Badge variant={sub.status === "graded" ? "default" : "secondary"} className="text-xs">
                  {sub.status}
                </Badge>
              </div>
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
