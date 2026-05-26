import { useQuery } from "@tanstack/react-query";
import { agentNativePath } from "@agent-native/core/client";
import { useNavigationState } from "@/hooks/use-navigation-state";
import { useRole } from "@/hooks/use-role";
import { useEffect } from "react";
import {
  IconUsers,
  IconSchool,
  IconBook,
} from "@tabler/icons-react";

function StatCard({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: number | string;
  icon: React.ElementType;
}) {
  return (
    <div className="rounded-lg border bg-card p-4 flex items-center gap-4">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
        <Icon size={20} />
      </div>
      <div>
        <p className="text-2xl font-semibold">{value}</p>
        <p className="text-xs text-muted-foreground">{label}</p>
      </div>
    </div>
  );
}

export default function AdminOverview() {
  const { sync } = useNavigationState();
  const { schoolId } = useRole();

  useEffect(() => {
    sync({ role: "admin", view: "overview" });
  }, [sync]);

  const { data: stats } = useQuery({
    queryKey: ["admin-overview-stats"],
    queryFn: async () => {
      const res = await fetch(agentNativePath("/api/school/stats"));
      if (!res.ok) return null;
      return res.json();
    },
  });

  return (
    <div className="h-full overflow-auto p-6 space-y-6">
      <div>
        <h1 className="text-xl font-semibold">School Overview</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Manage your school, staff, students, and curriculum.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Staff Members" value={stats?.staffCount ?? "—"} icon={IconUsers} />
        <StatCard label="Students" value={stats?.studentCount ?? "—"} icon={IconUsers} />
        <StatCard label="Classes" value={stats?.classCount ?? "—"} icon={IconSchool} />
        <StatCard label="Subjects" value={stats?.subjectCount ?? "—"} icon={IconBook} />
      </div>
      <div className="rounded-lg border bg-card p-6">
        <h2 className="text-sm font-medium mb-2">Quick Actions</h2>
        <p className="text-sm text-muted-foreground">
          Use the agent sidebar to configure your school, create subjects, invite staff, or set up your academic year.
        </p>
      </div>
    </div>
  );
}
