import { useNavigationState } from "@/hooks/use-navigation-state";
import { useSchoolConfig } from "@/hooks/use-school-config";
import { useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { IconSettings } from "@tabler/icons-react";

export default function AdminSettings() {
  const { sync } = useNavigationState();
  const { config } = useSchoolConfig();

  useEffect(() => {
    sync({ role: "admin", view: "settings" });
  }, [sync]);

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
        </TabsList>
        <TabsContent value="grading" className="mt-4 space-y-4">
          <div className="rounded-lg border bg-card p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium">Grading Scale</h3>
              <Badge variant="outline">{config.gradingScale.type}</Badge>
            </div>
            <div className="space-y-1">
              {config.gradingScale.levels.map((level) => (
                <div key={level.grade} className="flex items-center justify-between text-sm">
                  <span className="font-medium w-8">{level.grade}</span>
                  <span className="text-muted-foreground">{level.min}% – {level.max}%</span>
                  {level.label && <span className="text-muted-foreground text-xs">{level.label}</span>}
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
            <Badge variant="secondary" className="capitalize">{config.termStructure}</Badge>
            <p className="text-xs text-muted-foreground">
              Use the agent to create or modify terms and academic years.
            </p>
          </div>
        </TabsContent>
        <TabsContent value="custom-fields" className="mt-4">
          <div className="rounded-lg border bg-card p-4">
            <h3 className="text-sm font-medium mb-2">Custom Fields</h3>
            <p className="text-xs text-muted-foreground">
              Use the agent to add custom fields to students, lesson notes, and assessments.
              For example: "add a 'house' field to students with options Phoenix, Eagle, Lion, Shark".
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
                    <span className="font-medium">{value}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
