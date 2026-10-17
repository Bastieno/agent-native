import { useQuery } from "@tanstack/react-query";
import { agentNativePath } from "@agent-native/core/client";
import { useNavigationState } from "@/hooks/use-navigation-state";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ListState } from "@/components/ListState";
import { Badge } from "@/components/ui/badge";
import { IconUsers, IconSearch } from "@tabler/icons-react";

const categoryColors: Record<string, string> = {
  advanced: "bg-green-100 text-green-700",
  developing: "bg-blue-100 text-blue-700",
  foundational: "bg-amber-100 text-amber-700",
};

const ALL = "all";

/**
 * Every student a teacher teaches, in one table.
 *
 * A teacher with one class sees their roster and nothing else to think about.
 * A teacher with several sees all of them at once — which is the right default
 * for "has anyone fallen behind?", and the wrong one for marking a single
 * class's work, where other classes' children are noise. So the class filter
 * exists but stays out of the way: it appears only once there is more than one
 * class to choose between.
 */
export default function TeacherStudents() {
  const { sync } = useNavigationState();
  const [search, setSearch] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const classId = searchParams.get("class") ?? ALL;

  useEffect(() => {
    // The agent is told which class is being looked at, so "how is this class
    // doing?" means the same thing to it as it does on screen.
    sync({
      role: "teacher",
      view: "students",
      ...(classId !== ALL ? { classId } : {}),
    });
  }, [sync, classId]);

  const { data: students, isLoading } = useQuery({
    queryKey: ["teacher-students"],
    queryFn: async () => {
      const res = await fetch(
        agentNativePath("/_agent-native/actions/list-my-students"),
      );
      if (!res.ok) return [];
      return res.json();
    },
  });

  // The classes this teacher has, taken from the students themselves rather
  // than fetched again — a class with nobody in it has no roster to filter.
  const myClasses = Array.from(
    new Map<string, string>(
      (students ?? [])
        .flatMap((s: any) => s.classes ?? [])
        .map((c: any) => [String(c.id), String(c.name)] as [string, string]),
    ).entries(),
  )
    .map(([id, name]) => ({ id, name }))
    .sort((a, b) => a.name.localeCompare(b.name));

  const selected = myClasses.find((c) => c.id === classId) ?? null;

  const filtered = (students ?? []).filter((s: any) => {
    const q = search.toLowerCase();
    const matchesSearch =
      !q ||
      s.name?.toLowerCase().includes(q) ||
      s.email?.toLowerCase().includes(q);
    const matchesClass =
      classId === ALL || (s.classes ?? []).some((c: any) => c.id === classId);
    return matchesSearch && matchesClass;
  });

  return (
    <div className="p-6 space-y-6 overflow-y-auto h-full">
      <div>
        <h1 className="text-xl font-semibold">Students</h1>
        <p className="text-sm text-muted-foreground mt-1">
          {selected
            ? `${filtered.length} student${filtered.length === 1 ? "" : "s"} in ${selected.name}.`
            : "All students across your classes."}
        </p>
      </div>

      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <div className="relative flex-1">
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
        {/* Nothing to choose between when you teach one class. */}
        {myClasses.length > 1 ? (
          <Select
            value={classId}
            onValueChange={(value) => {
              const next = new URLSearchParams(searchParams);
              if (value === ALL) next.delete("class");
              else next.set("class", value);
              setSearchParams(next, { replace: true });
            }}
          >
            <SelectTrigger className="h-8 w-full text-sm sm:w-56">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={ALL}>All classes</SelectItem>
              {myClasses.map((c) => (
                <SelectItem key={c.id} value={c.id}>
                  {c.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ) : null}
      </div>

      {isLoading || filtered.length === 0 ? (
        <ListState
          loading={isLoading}
          icon={IconUsers}
          title={
            search
              ? "No students match your search"
              : selected
                ? `No students in ${selected.name}`
                : "No students yet"
          }
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
