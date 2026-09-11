import { useQuery } from "@tanstack/react-query";
import { agentNativePath } from "@agent-native/core/client";
import { useNavigationState } from "@/hooks/use-navigation-state";
import { useEffect } from "react";
import { IconPuzzle } from "@tabler/icons-react";

export default function AdminExtensions() {
  const { sync } = useNavigationState();

  useEffect(() => {
    sync({ role: "admin", view: "extensions" });
  }, [sync]);

  const { data: extensions } = useQuery({
    queryKey: ["school-extensions"],
    queryFn: async () => {
      const res = await fetch(agentNativePath("/_agent-native/extensions"));
      if (!res.ok) return [];
      return res.json();
    },
  });

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-xl font-semibold">Extensions</h1>
        <p className="text-sm text-muted-foreground mt-1">
          School-specific mini-apps created by the agent.
        </p>
      </div>

      {!extensions || extensions.length === 0 ? (
        <div className="rounded-lg border border-dashed p-12 text-center">
          <IconPuzzle
            size={28}
            className="mx-auto text-muted-foreground mb-3"
          />
          <p className="text-sm font-medium">No extensions yet</p>
          <p className="text-xs text-muted-foreground mt-1 max-w-xs mx-auto">
            Ask the agent to create school-specific widgets — house badges,
            attendance trackers, custom dashboards, and more.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {(extensions ?? []).map((ext: any) => (
            <div key={ext.id} className="rounded-lg border p-4 space-y-2">
              <div className="flex items-start justify-between">
                <h3 className="text-sm font-semibold">{ext.name}</h3>
              </div>
              {ext.description && (
                <p className="text-xs text-muted-foreground">
                  {ext.description}
                </p>
              )}
              <iframe
                src={agentNativePath(
                  `/_agent-native/extensions/${ext.id}/render`,
                )}
                className="w-full h-48 rounded border bg-muted/20"
                sandbox="allow-scripts allow-same-origin"
                title={ext.name}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
