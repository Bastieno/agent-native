import { useNavigationState } from "@/hooks/use-navigation-state";
import { useSchoolConfig } from "@/hooks/use-school-config";
import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { agentNativePath } from "@agent-native/core/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { IconSettings, IconDeviceFloppy } from "@tabler/icons-react";

async function callAction(name: string, params: Record<string, unknown>) {
  const res = await fetch(agentNativePath(`/_agent-native/actions/${name}`), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error((err as any).error ?? "Request failed");
  }
  return res.json();
}

export default function AdminSettings() {
  const { sync } = useNavigationState();
  const { config } = useSchoolConfig();
  const qc = useQueryClient();

  // School Guide state
  const [guideContent, setGuideContent] = useState("");
  const [guideSaving, setGuideSaving] = useState(false);

  useEffect(() => {
    sync({ role: "admin", view: "settings" });
  }, [sync]);

  const { data: guideData } = useQuery<{
    content: string | null;
    updatedAt: string | null;
  }>({
    queryKey: ["school-guide"],
    queryFn: async () => {
      const res = await fetch(
        agentNativePath("/_agent-native/actions/get-school-resource"),
      );
      if (!res.ok) return { content: null, updatedAt: null };
      return res.json();
    },
  });

  // Populate textarea when data loads (only if user hasn't started editing)
  useEffect(() => {
    if (guideData?.content !== undefined && guideContent === "") {
      setGuideContent(guideData.content ?? "");
    }
  }, [guideData?.content]);

  async function handleSaveGuide() {
    if (!guideContent.trim()) return;
    setGuideSaving(true);
    try {
      await callAction("update-school-resource", { content: guideContent });
      qc.invalidateQueries({ queryKey: ["school-guide"] });
      toast.success("School Guide saved");
    } catch (e: any) {
      toast.error(e.message ?? "Failed to save School Guide");
    } finally {
      setGuideSaving(false);
    }
  }

  return (
    <div className="h-full overflow-auto p-6 space-y-4">
      <div>
        <h1 className="text-xl font-semibold">School Settings</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Configure your school's grading system, terminology, and structure.
        </p>
      </div>
      <Tabs defaultValue="grading">
        <TabsList>
          <TabsTrigger value="grading">Grading</TabsTrigger>
          <TabsTrigger value="terms">Terms</TabsTrigger>
          <TabsTrigger value="custom-fields">Custom Fields</TabsTrigger>
          <TabsTrigger value="labels">Terminology</TabsTrigger>
          <TabsTrigger value="guide">School Guide</TabsTrigger>
        </TabsList>

        <TabsContent value="grading" className="mt-4 space-y-4">
          <div className="rounded-lg border bg-card p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium">Grading Scale</h3>
              <Badge variant="outline">{config.gradingScale.type}</Badge>
            </div>
            <div className="space-y-1">
              {config.gradingScale.levels.map((level) => (
                <div
                  key={level.grade}
                  className="flex items-center justify-between text-sm"
                >
                  <span className="font-medium w-8">{level.grade}</span>
                  <span className="text-muted-foreground">
                    {level.min}% – {level.max}%
                  </span>
                  {level.label && (
                    <span className="text-muted-foreground text-xs">
                      {level.label}
                    </span>
                  )}
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground">
              Use the agent to update your grading scale.
            </p>
          </div>
          <div className="rounded-lg border bg-card p-4 space-y-2">
            <h3 className="text-sm font-medium">Pass Mark</h3>
            <p className="text-2xl font-semibold">{config.passMark}%</p>
          </div>
        </TabsContent>

        <TabsContent value="terms" className="mt-4">
          <div className="rounded-lg border bg-card p-4 space-y-2">
            <h3 className="text-sm font-medium">Term Structure</h3>
            <Badge variant="secondary" className="capitalize">
              {config.termStructure}
            </Badge>
            <p className="text-xs text-muted-foreground">
              Use the agent to create or modify terms and academic years.
            </p>
          </div>
        </TabsContent>

        <TabsContent value="custom-fields" className="mt-4">
          <div className="rounded-lg border bg-card p-4">
            <h3 className="text-sm font-medium mb-2">Custom Fields</h3>
            <p className="text-xs text-muted-foreground">
              Use the agent to add custom fields to students, lesson notes, and
              assessments. For example: "add a 'house' field to students with
              options Phoenix, Eagle, Lion, Shark".
            </p>
          </div>
        </TabsContent>

        <TabsContent value="labels" className="mt-4">
          <div className="rounded-lg border bg-card p-4 space-y-3">
            <h3 className="text-sm font-medium">Terminology Overrides</h3>
            {Object.keys(config.customLabels).length === 0 ? (
              <p className="text-xs text-muted-foreground">
                No custom labels set. Ask the agent to set custom terminology,
                e.g. "call students 'learners' and teachers 'educators'".
              </p>
            ) : (
              <div className="space-y-1">
                {Object.entries(config.customLabels).map(([key, value]) => (
                  <div key={key} className="flex items-center gap-2 text-sm">
                    <span className="text-muted-foreground">{key}</span>
                    <span>→</span>
                    <span className="font-medium">{value as string}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="guide" className="mt-4 space-y-3">
          <div className="rounded-lg border bg-card p-4 space-y-3">
            <div>
              <h3 className="text-sm font-medium">School Guide</h3>
              <p className="text-xs text-muted-foreground mt-1">
                This markdown document tells the agent about your school —
                identity, pedagogy, curriculum frameworks, grading conventions,
                and terminology. The agent reads it at the start of every
                curriculum, grading, and analytics session.
              </p>
            </div>
            <div className="space-y-1.5">
              <p className="text-xs text-muted-foreground">
                Tip: include grade structure, term structure, exam boards (WAEC,
                Common Core, Cambridge, etc.), any school-specific rules, and
                preferred terminology.
              </p>
              <Textarea
                className="font-mono text-xs min-h-80 resize-y"
                placeholder={`# School Identity\n\nName: ...\nLocation: ...\nType: secondary | primary | tertiary\n\n# Grade Structure\n\n...\n\n# Term Structure\n\n3 terms per academic year, ~13 weeks each.\n\n# Curriculum Frameworks\n\n...\n\n# Exam Boards\n\n...\n\n# Grading Conventions\n\n...\n`}
                value={guideContent}
                onChange={(e) => setGuideContent(e.target.value)}
              />
            </div>
            {guideData?.updatedAt && (
              <p className="text-xs text-muted-foreground">
                Last updated: {new Date(guideData.updatedAt).toLocaleString()}
              </p>
            )}
            <div className="flex justify-end">
              <Button
                size="sm"
                onClick={handleSaveGuide}
                disabled={guideSaving || !guideContent.trim()}
              >
                <IconDeviceFloppy size={14} className="mr-1.5" />
                {guideSaving ? "Saving…" : "Save Guide"}
              </Button>
            </div>
          </div>
          <div className="rounded-lg border bg-muted/40 p-3">
            <p className="text-xs text-muted-foreground">
              <strong>Pro tip:</strong> You can also ask the agent to update the
              School Guide for you — e.g. "update the school guide to note that
              we follow WAEC for SSS certification and use Common Core for
              Mathematics".
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
