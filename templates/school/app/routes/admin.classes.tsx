import { useQuery } from "@tanstack/react-query";
import { agentNativePath } from "@agent-native/core/client";
import { useNavigationState } from "@/hooks/use-navigation-state";
import { useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { IconSchool, IconUsers } from "@tabler/icons-react";

export default function AdminClasses() {
  const { sync } = useNavigationState();

  useEffect(() => {
    sync({ role: "admin", view: "classes" });
  }, [sync]);

  const { data: classes } = useQuery({
    queryKey: ["admin-classes"],
    queryFn: async () => {
      const res = await fetch(agentNativePath("/api/school/classes"));
      if (!res.ok) return [];
      return res.json();
    },
  });

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-xl font-semibold">All Classes</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Overview of every class across the school.
        </p>
      </div>
      {!classes || classes.length === 0 ? (
        <div className="rounded-lg border border-dashed p-10 text-center">
          <IconSchool size={28} className="mx-auto text-muted-foreground mb-2" />
          <p className="text-sm font-medium">No classes yet</p>
          <p className="text-xs text-muted-foreground mt-1">
            Ask the agent to create classes or enroll students.
          </p>
        </div>
      ) : (
        <div className="rounded-lg border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/40">
                <th className="px-4 py-2.5 text-left font-medium">Class</th>
                <th className="px-4 py-2.5 text-left font-medium">Subject</th>
                <th className="px-4 py-2.5 text-left font-medium">Grade Level</th>
                <th className="px-4 py-2.5 text-left font-medium">Teacher</th>
                <th className="px-4 py-2.5 text-left font-medium">Students</th>
                <th className="px-4 py-2.5 text-left font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {(classes ?? []).map((cls: any) => (
                <tr key={cls.id} className="border-b last:border-0">
                  <td className="px-4 py-2.5 font-medium">{cls.name}</td>
                  <td className="px-4 py-2.5 text-muted-foreground">{cls.subjectName ?? "—"}</td>
                  <td className="px-4 py-2.5 text-muted-foreground">{cls.gradeLevelName ?? "—"}</td>
                  <td className="px-4 py-2.5 text-muted-foreground">{cls.teacherName ?? "—"}</td>
                  <td className="px-4 py-2.5">
                    <span className="inline-flex items-center gap-1 text-muted-foreground">
                      <IconUsers size={13} />
                      {cls.enrollmentCount ?? 0}
                    </span>
                  </td>
                  <td className="px-4 py-2.5">
                    <Badge
                      variant={cls.status === "active" ? "default" : "secondary"}
                      className="text-xs capitalize"
                    >
                      {cls.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
