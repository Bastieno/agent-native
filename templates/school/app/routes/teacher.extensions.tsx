import { ListState } from "@/components/ListState";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { useNavigationState } from "@/hooks/use-navigation-state";
import { useEffect } from "react";
import { IconPuzzle } from "@tabler/icons-react";
import { useTeacherExtensions } from "@/hooks/use-teacher-extensions";

export default function TeacherExtensions() {
  const { sync } = useNavigationState();
  useEffect(() => {
    sync({ role: "teacher", view: "extensions" });
  }, [sync]);

  const { extensions, isLoading } = useTeacherExtensions();

  return (
    <div className="h-full space-y-6 overflow-auto p-6 pb-24">
      <div>
        <h1 className="text-xl font-semibold">Extensions</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Mini-apps your school has made for teachers.
        </p>
      </div>

      {isLoading ? (
        <ListState loading rows={2} title="Extensions" />
      ) : extensions.length === 0 ? (
        <div className="rounded-lg border border-dashed p-12 text-center">
          <IconPuzzle
            size={28}
            className="mx-auto mb-3 text-muted-foreground"
          />
          <p className="text-sm font-medium">Nothing here yet</p>
          <p className="mx-auto mt-1 max-w-xs text-xs text-muted-foreground">
            When an admin shares a mini-app with teachers, it appears here.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {extensions.map((ext) => (
            <div key={ext.id} className="space-y-2 rounded-lg border p-4">
              <h3 className="text-sm font-semibold">{ext.name}</h3>
              {ext.description && (
                <p className="text-xs text-muted-foreground">
                  {ext.description}
                </p>
              )}
              <Button asChild variant="outline" size="sm" className="mt-1">
                <Link to={`/teacher/extension/${ext.id}`}>Open</Link>
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
