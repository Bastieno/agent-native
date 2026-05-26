import { useQuery } from "@tanstack/react-query";
import { agentNativePath } from "@agent-native/core/client";
import { useNavigationState } from "@/hooks/use-navigation-state";
import { useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { IconUsers, IconMail, IconUser } from "@tabler/icons-react";

const roleLabel: Record<string, string> = {
  school_admin: "Admin",
  teacher: "Teacher",
  subject_coordinator: "Coordinator",
};

export default function AdminStaff() {
  const { sync } = useNavigationState();

  useEffect(() => {
    sync({ role: "admin", view: "staff" });
  }, [sync]);

  const { data } = useQuery<{ active: any[]; pending: any[] }>({
    queryKey: ["admin-staff"],
    queryFn: async () => {
      const res = await fetch(agentNativePath("/api/school/staff"));
      if (!res.ok) return { active: [], pending: [] };
      return res.json();
    },
  });

  const active = data?.active ?? [];
  const pending = data?.pending ?? [];
  const isEmpty = active.length === 0 && pending.length === 0;

  return (
    <div className="h-full overflow-auto p-6 space-y-6">
      <div>
        <h1 className="text-xl font-semibold">Staff</h1>
        <p className="text-xs text-muted-foreground mt-0.5">
          {active.length} active{pending.length > 0 ? `, ${pending.length} pending` : ""}
        </p>
      </div>

      {isEmpty ? (
        <div className="rounded-lg border border-dashed p-10 text-center">
          <IconUsers size={32} className="mx-auto text-muted-foreground mb-3" />
          <p className="text-sm font-medium">No staff members yet</p>
          <p className="text-xs text-muted-foreground mt-1">
            Tell the agent: &ldquo;Invite [name] ([email]) as a teacher&rdquo;
          </p>
        </div>
      ) : (
        <>
          {active.length > 0 && (
            <section className="space-y-2">
              <h2 className="text-sm font-medium text-muted-foreground">Active</h2>
              <div className="rounded-lg border divide-y">
                {active.map((member: any) => (
                  <div key={member.id} className="flex items-center gap-3 px-4 py-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted shrink-0">
                      <IconUser size={15} className="text-muted-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        {member.name ?? member.email ?? member.userId}
                      </p>
                      {member.email && member.name && (
                        <p className="text-xs text-muted-foreground truncate">{member.email}</p>
                      )}
                    </div>
                    <Badge variant="outline" className="text-xs shrink-0">
                      {roleLabel[member.schoolRole] ?? member.schoolRole}
                    </Badge>
                  </div>
                ))}
              </div>
            </section>
          )}

          {pending.length > 0 && (
            <section className="space-y-2">
              <h2 className="text-sm font-medium text-muted-foreground">Pending invitations</h2>
              <div className="rounded-lg border divide-y">
                {pending.map((invite: any) => (
                  <div key={invite.id} className="flex items-center gap-3 px-4 py-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted shrink-0">
                      <IconMail size={15} className="text-muted-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{invite.name}</p>
                      <p className="text-xs text-muted-foreground truncate">{invite.email}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <Badge variant="outline" className="text-xs">
                        {roleLabel[invite.schoolRole] ?? invite.schoolRole}
                      </Badge>
                      <Badge variant="secondary" className="text-xs">Invite sent</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </div>
  );
}
