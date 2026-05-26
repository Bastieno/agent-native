import { useQuery } from "@tanstack/react-query";
import { agentNativePath } from "@agent-native/core/client";
import { useNavigationState } from "@/hooks/use-navigation-state";
import { useEffect } from "react";
import { Link } from "react-router";
import { Badge } from "@/components/ui/badge";
import { IconBook } from "@tabler/icons-react";

export default function AdminCurriculum() {
  const { sync } = useNavigationState();

  useEffect(() => {
    sync({ role: "admin", view: "curriculum" });
  }, [sync]);

  const { data: subjects = [] } = useQuery<any[]>({
    queryKey: ["subjects"],
    queryFn: async () => {
      const res = await fetch(agentNativePath("/api/school/subjects"));
      if (!res.ok) return [];
      return res.json();
    },
  });

  return (
    <div className="h-full overflow-auto p-6 space-y-6">
      <div>
        <h1 className="text-xl font-semibold">Curriculum</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Subjects, units, and learning objectives for your school.
        </p>
      </div>
      {subjects.length === 0 ? (
        <div className="rounded-lg border border-dashed p-10 text-center">
          <IconBook size={32} className="mx-auto text-muted-foreground mb-3" />
          <p className="text-sm font-medium">No subjects yet</p>
          <p className="text-xs text-muted-foreground mt-1">
            Ask the agent to start a curriculum co-authoring session.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
          {subjects.map((subject: any) => (
            <Link
              key={subject.id}
              to={`/admin/curriculum/${subject.id}`}
              className="rounded-lg border bg-card p-4 hover:border-primary/40 transition-colors space-y-2"
            >
              <div className="flex items-center gap-2">
                <div
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: subject.color ?? "hsl(var(--primary))" }}
                />
                <span className="text-sm font-medium">{subject.name}</span>
              </div>
              {subject.code && (
                <Badge variant="secondary" className="text-xs">{subject.code}</Badge>
              )}
              <Badge
                variant={subject.status === "active" ? "default" : "outline"}
                className="text-xs"
              >
                {subject.status}
              </Badge>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
