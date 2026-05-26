import { useQuery } from "@tanstack/react-query";
import { agentNativePath } from "@agent-native/core/client";
import { useNavigationState } from "@/hooks/use-navigation-state";
import { useEffect } from "react";
import { Link } from "react-router";
import { Badge } from "@/components/ui/badge";
import { IconBook, IconChevronRight } from "@tabler/icons-react";

export default function StudentClasses() {
  const { sync } = useNavigationState();

  useEffect(() => {
    sync({ role: "student", view: "classes" });
  }, [sync]);

  const { data: classes } = useQuery({
    queryKey: ["my-enrolled-classes"],
    queryFn: async () => {
      const res = await fetch(agentNativePath("/api/school/my-classes"));
      if (!res.ok) return [];
      return res.json();
    },
  });

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-xl font-semibold">My Classes</h1>
        <p className="text-sm text-muted-foreground mt-1">
          All classes you're enrolled in.
        </p>
      </div>

      {!classes || classes.length === 0 ? (
        <div className="rounded-lg border border-dashed p-10 text-center">
          <IconBook size={28} className="mx-auto text-muted-foreground mb-2" />
          <p className="text-sm font-medium">No classes yet</p>
          <p className="text-xs text-muted-foreground mt-1">
            Your teacher will enroll you in classes.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {(classes ?? []).map((cls: any) => (
            <Link
              key={cls.id}
              to={`/student/classes/${cls.id}`}
              className="group flex items-center justify-between rounded-lg border p-4 hover:border-primary/50 transition-colors"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium group-hover:text-primary transition-colors">
                    {cls.name}
                  </p>
                  {cls.pendingAssessments > 0 && (
                    <Badge className="text-xs h-4 px-1.5">
                      {cls.pendingAssessments} due
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">
                  {cls.subjectName ?? "—"} · {cls.teacherName ?? "—"}
                </p>
              </div>
              <IconChevronRight
                size={16}
                className="text-muted-foreground group-hover:text-primary transition-colors"
              />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
