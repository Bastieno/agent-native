import { useQuery } from "@tanstack/react-query";
import { agentNativePath } from "@agent-native/core/client";
import { useNavigationState } from "@/hooks/use-navigation-state";
import { useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { IconUsers } from "@tabler/icons-react";

export default function AdminStaff() {
  const { sync } = useNavigationState();

  useEffect(() => {
    sync({ role: "admin", view: "staff" });
  }, [sync]);

  const { data: staff = [] } = useQuery<any[]>({
    queryKey: ["admin-staff"],
    queryFn: async () => {
      const res = await fetch(agentNativePath("/api/school/staff"));
      if (!res.ok) return [];
      return res.json();
    },
  });

  const roleLabel: Record<string, string> = {
    school_admin: "Admin",
    teacher: "Teacher",
    subject_coordinator: "Coordinator",
  };

  return (
    <div className="h-full overflow-auto p-6 space-y-4">
      <div>
        <h1 className="text-xl font-semibold">Staff</h1>
        <p className="text-xs text-muted-foreground mt-0.5">{staff.length} members</p>
      </div>
      {staff.length === 0 ? (
        <div className="rounded-lg border border-dashed p-10 text-center">
          <IconUsers size={32} className="mx-auto text-muted-foreground mb-3" />
          <p className="text-sm font-medium">No staff members yet</p>
          <p className="text-xs text-muted-foreground mt-1">
            Ask the agent to invite staff members.
          </p>
        </div>
      ) : (
        <div className="rounded-lg border divide-y">
          {staff.map((member: any) => (
            <div key={member.id} className="flex items-center justify-between px-4 py-3">
              <div>
                <p className="text-sm font-medium">{member.userId}</p>
                {member.subjectSpecialization && (
                  <p className="text-xs text-muted-foreground">{member.subjectSpecialization}</p>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">
                  {roleLabel[member.schoolRole] ?? member.schoolRole}
                </Badge>
                <Badge variant={member.status === "active" ? "default" : "secondary"} className="text-xs">
                  {member.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
