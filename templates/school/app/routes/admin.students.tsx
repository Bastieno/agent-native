import { useQuery } from "@tanstack/react-query";
import { agentNativePath } from "@agent-native/core/client";
import { useNavigationState } from "@/hooks/use-navigation-state";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { IconSearch, IconUsers } from "@tabler/icons-react";

export default function AdminStudents() {
  const { sync } = useNavigationState();
  const [search, setSearch] = useState("");

  useEffect(() => {
    sync({ role: "admin", view: "students" });
  }, [sync]);

  const { data: students = [] } = useQuery<any[]>({
    queryKey: ["admin-students"],
    queryFn: async () => {
      const res = await fetch(agentNativePath("/api/school/students"));
      if (!res.ok) return [];
      return res.json();
    },
  });

  const filtered = students.filter((s: any) =>
    !search ||
    s.admissionNumber?.toLowerCase().includes(search.toLowerCase()) ||
    s.userId?.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="h-full overflow-auto p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">Students</h1>
          <p className="text-xs text-muted-foreground mt-0.5">{students.length} enrolled</p>
        </div>
      </div>
      <div className="relative">
        <IconSearch size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search students…"
          className="pl-8"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      {filtered.length === 0 ? (
        <div className="rounded-lg border border-dashed p-10 text-center">
          <IconUsers size={32} className="mx-auto text-muted-foreground mb-3" />
          <p className="text-sm font-medium">No students yet</p>
          <p className="text-xs text-muted-foreground mt-1">
            Ask the agent to invite students or import a roster.
          </p>
        </div>
      ) : (
        <div className="rounded-lg border divide-y">
          {filtered.map((student: any) => (
            <div key={student.id} className="flex items-center justify-between px-4 py-3">
              <div>
                <p className="text-sm font-medium">{student.userId}</p>
                {student.admissionNumber && (
                  <p className="text-xs text-muted-foreground">{student.admissionNumber}</p>
                )}
              </div>
              <Badge variant={student.status === "active" ? "default" : "secondary"}>
                {student.status}
              </Badge>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
