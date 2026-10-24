import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ListState } from "@/components/ListState";
import { agentNativePath } from "@agent-native/core/client";
import { EmbeddedExtension } from "@agent-native/core/client/extensions";
import { useNavigationState } from "@/hooks/use-navigation-state";
import { useEffect } from "react";
import { IconPuzzle } from "@tabler/icons-react";

export default function AdminExtensions() {
  const { sync } = useNavigationState();

  useEffect(() => {
    sync({ role: "admin", view: "extensions" });
  }, [sync]);

  const queryClient = useQueryClient();
  const { data: audience } = useQuery({
    queryKey: ["extension-audience"],
    queryFn: async () => {
      const res = await fetch(
        agentNativePath("/_agent-native/actions/get-extension-audience"),
      );
      if (!res.ok) return { teacherIds: [] as string[] };
      return res.json() as Promise<{ teacherIds: string[] }>;
    },
  });
  const forTeachers = new Set(audience?.teacherIds ?? []);

  // Switching it on also shares the extension with the school: a teacher can
  // only open what the school may see. Switching it off leaves the sharing as
  // it was.
  const setForTeachers = useMutation({
    mutationFn: async (vars: { id: string; on: boolean }) => {
      if (vars.on) {
        const shared = await fetch(
          agentNativePath(`/_agent-native/extensions/${vars.id}`),
          {
            method: "PUT",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ visibility: "org" }),
          },
        );
        if (!shared.ok) throw new Error("Could not share it with the school.");
      }
      const res = await fetch(
        agentNativePath("/_agent-native/actions/set-extension-audience"),
        {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ extensionId: vars.id, forTeachers: vars.on }),
        },
      );
      if (!res.ok) throw new Error("Could not change who sees it.");
    },
    onMutate: async (vars) => {
      await queryClient.cancelQueries({ queryKey: ["extension-audience"] });
      const before = queryClient.getQueryData<{ teacherIds: string[] }>([
        "extension-audience",
      ]);
      const ids = new Set(before?.teacherIds ?? []);
      if (vars.on) ids.add(vars.id);
      else ids.delete(vars.id);
      queryClient.setQueryData(["extension-audience"], {
        teacherIds: [...ids],
      });
      return { before };
    },
    onError: (err, _vars, ctx) => {
      queryClient.setQueryData(["extension-audience"], ctx?.before);
      toast.error(err instanceof Error ? err.message : "Could not save.");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["extension-audience"] });
      queryClient.invalidateQueries({ queryKey: ["teacher-extensions"] });
    },
  });

  const { data: extensions, isLoading } = useQuery({
    queryKey: ["school-extensions"],
    queryFn: async () => {
      const res = await fetch(agentNativePath("/_agent-native/extensions"));
      if (!res.ok) return [];
      return res.json();
    },
  });

  return (
    <div className="h-full space-y-6 overflow-auto p-6 pb-24">
      <div>
        <h1 className="text-xl font-semibold">Extensions</h1>
        <p className="text-sm text-muted-foreground mt-1">
          School-specific mini-apps. Switch one on for Teachers to put it on
          their Extensions page.
        </p>
      </div>

      {isLoading ? (
        <ListState loading rows={2} title="Extensions" />
      ) : !extensions || extensions.length === 0 ? (
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
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-sm font-semibold">{ext.name}</h3>
                <div className="flex items-center gap-2">
                  <Label
                    htmlFor={`teachers-${ext.id}`}
                    className="text-xs text-muted-foreground"
                  >
                    Teachers
                  </Label>
                  <Switch
                    id={`teachers-${ext.id}`}
                    checked={forTeachers.has(ext.id)}
                    onCheckedChange={(on) =>
                      setForTeachers.mutate({ id: ext.id, on })
                    }
                  />
                </div>
              </div>
              {ext.description && (
                <p className="text-xs text-muted-foreground">
                  {ext.description}
                </p>
              )}
              {/* The framework's own embed, not a bare iframe.
                  An extension talks to the app by posting messages to its
                  host, and the host listener lives in this component. Dropped
                  into a plain iframe, every call an extension makes — reading
                  classes, saving its own data, fetching an external API —
                  waited thirty seconds and failed with "Extension host
                  request timed out". Anything that only drew static HTML
                  looked fine, which is why it survived. */}
              <EmbeddedExtension
                extensionId={ext.id}
                slotId={`admin-extensions-${ext.id}`}
                className="rounded border bg-muted/20"
                initialHeight={192}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
