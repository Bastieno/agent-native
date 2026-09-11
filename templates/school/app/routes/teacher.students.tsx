import { useQuery } from "@tanstack/react-query";
import { agentNativePath } from "@agent-native/core/client";
import { useNavigationState } from "@/hooks/use-navigation-state";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { ListState } from "@/components/ListState";
import { Badge } from "@/components/ui/badge";
import { IconUsers, IconSearch } from "@tabler/icons-react";

const categoryColors: Record<string, string> = {
  advanced: "bg-green-100 text-green-700",
  developing: "bg-blue-100 text-blue-700",
  foundational: "bg-amber-100 text-amber-700",
};

export default function TeacherStudents() {
  const { sync } = useNavigationState();
  const [search, setSearch] = useState("");

  useEffect(() => {
    sync({ role: "teacher", view: "students" });
  }, [sync]);

  const { data: students, isLoading } = useQuery({
    queryKey: ["teacher-students"],
    queryFn: async () => {
      const res = await fetch(agentNativePath("/api/school/my-students"));
      if (!res.ok) return [];
      return res.json();
    },
  });

  const filtered = (students ?? []).filter((s: any) => {
    const q = search.toLowerCase();
    return (
      !q ||
      s.name?.toLowerCase().includes(q) ||
      s.email?.toLowerCase().includes(q)
    );
  });

  return (
    <div className="p-6 space-y-6 overflow-y-auto h-full">
      <div>
        <h1 className="text-xl font-semibold">Students</h1>
        <p className="text-sm text-muted-foreground mt-1">
          All students across your classes.
        </p>
      </div>

      <div className="relative">
        <IconSearch
          size={14}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
        />
        <Input
          placeholder="Search students…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-8 text-sm h-8"
        />
      </div>

      {isLoading || filtered.length === 0 ? (
        <ListState
          loading={isLoading}
          icon={IconUsers}
          title={search ? "No students match your search" : "No students yet"}
        />
      ) : (
        <div className="rounded-lg border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/40">
                <th className="px-4 py-2.5 text-left font-medium">Name</th>
                <th className="px-4 py-2.5 text-left font-medium">Class</th>
                <th className="px-4 py-2.5 text-left font-medium">Category</th>
                <th className="px-4 py-2.5 text-left font-medium">Avg Score</th>
                <th className="px-4 py-2.5 text-left font-medium">
                  Completion
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((s: any) => (
                <tr key={s.id} className="border-b last:border-0">
                  <td className="px-4 py-2.5">
                    <div>
                      <p className="font-medium">{s.name}</p>
                      <p className="text-xs text-muted-foreground">{s.email}</p>
                    </div>
                  </td>
                  <td className="px-4 py-2.5 text-muted-foreground text-xs">
                    {s.className ?? "—"}
                  </td>
                  <td className="px-4 py-2.5">
                    {s.category ? (
                      <span
                        className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium capitalize ${categoryColors[s.category] ?? "bg-muted text-muted-foreground"}`}
                      >
                        {s.category}
                      </span>
                    ) : (
                      <span className="text-xs text-muted-foreground">—</span>
                    )}
                  </td>
                  <td className="px-4 py-2.5 text-muted-foreground">
                    {s.averageScore != null ? `${s.averageScore}%` : "—"}
                  </td>
                  <td className="px-4 py-2.5 text-muted-foreground">
                    {s.completionRate != null ? `${s.completionRate}%` : "—"}
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
