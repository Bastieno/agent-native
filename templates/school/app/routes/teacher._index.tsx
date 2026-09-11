import { useQuery } from "@tanstack/react-query";
import { agentNativePath } from "@agent-native/core/client";
import { useNavigationState } from "@/hooks/use-navigation-state";
import { useRole } from "@/hooks/use-role";
import { useEffect } from "react";
import { Link } from "react-router";
import { Badge } from "@/components/ui/badge";
import { IconSchool } from "@tabler/icons-react";

export default function TeacherDashboard() {
  const { sync } = useNavigationState();
  const { user } = useRole();

  const { data: classes = [] } = useQuery<any[]>({
    queryKey: ["my-classes"],
    queryFn: async () => {
      const res = await fetch(
        agentNativePath("/_agent-native/actions/get-my-classes"),
      );
      if (!res.ok) return [];
      return res.json();
    },
  });

  useEffect(() => {
    sync({
      role: "teacher",
      view: "dashboard",
      classCount: classes.length,
    } as any);
  }, [sync, classes.length]);

  return (
    <div className="h-full overflow-auto p-6 space-y-6">
      <div>
        <h1 className="text-xl font-semibold">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Welcome back. Here's your overview.
        </p>
      </div>
      <div>
        <h2 className="text-sm font-medium mb-3">My Classes</h2>
        {classes.length === 0 ? (
          <div className="rounded-lg border border-dashed p-8 text-center">
            <IconSchool
              size={28}
              className="mx-auto text-muted-foreground mb-2"
            />
            <p className="text-sm font-medium">No classes assigned yet</p>
            <p className="text-xs text-muted-foreground mt-1">
              Ask the admin to create classes or assign you to one.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {classes.map((cls: any) => (
              <Link
                key={cls.id}
                to={`/teacher/classes/${cls.id}`}
                className="rounded-lg border bg-card p-4 hover:border-primary/40 transition-colors"
              >
                <p className="text-sm font-medium">{cls.name}</p>
                <Badge
                  variant={cls.status === "active" ? "default" : "secondary"}
                  className="mt-2 text-xs"
                >
                  {cls.status}
                </Badge>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
