import { useQuery } from "@tanstack/react-query";
import { agentNativePath } from "@agent-native/core/client";
import { useNavigationState } from "@/hooks/use-navigation-state";
import { useEffect } from "react";
import { Link } from "react-router";
import { Badge } from "@/components/ui/badge";
import { ListState } from "@/components/ListState";
import { IconSchool, IconUsers, IconChevronRight } from "@tabler/icons-react";

export default function TeacherClasses() {
  const { sync } = useNavigationState();

  useEffect(() => {
    sync({ role: "teacher", view: "classes" });
  }, [sync]);

  const { data: classes, isLoading } = useQuery({
    queryKey: ["my-classes"],
    queryFn: async () => {
      const res = await fetch(
        agentNativePath("/_agent-native/actions/get-my-classes"),
      );
      if (!res.ok) return [];
      return res.json();
    },
  });

  return (
    <div className="p-6 space-y-6 overflow-y-auto h-full">
      <div>
        <h1 className="text-xl font-semibold">My Classes</h1>
        <p className="text-sm text-muted-foreground mt-1">
          All classes you're assigned to this term.
        </p>
      </div>

      {isLoading || !classes || classes.length === 0 ? (
        <ListState
          loading={isLoading}
          icon={IconSchool}
          title="No classes assigned yet"
          description="An admin needs to assign you to classes first."
        />
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {(classes ?? []).map((cls: any) => (
            <Link
              key={cls.id}
              to={`/teacher/classes/${cls.id}`}
              className="group rounded-lg border p-4 space-y-3 hover:border-primary/50 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-sm font-semibold group-hover:text-primary transition-colors">
                    {cls.name}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {cls.subjectName ?? "—"} · {cls.gradeLevelName ?? "—"}
                  </p>
                </div>
                <IconChevronRight
                  size={16}
                  className="text-muted-foreground group-hover:text-primary transition-colors mt-0.5"
                />
              </div>
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1">
                  <IconUsers size={12} />
                  {cls.enrollmentCount ?? 0} students
                </span>
                {cls.termName && <span>{cls.termName}</span>}
              </div>
              <div className="flex items-center justify-between">
                <Badge
                  variant={cls.status === "active" ? "default" : "secondary"}
                  className="text-xs capitalize"
                >
                  {cls.status}
                </Badge>
                {cls.pendingSubmissions > 0 && (
                  <span className="text-xs text-amber-600 font-medium">
                    {cls.pendingSubmissions} to grade
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
