import { useQueryClient } from "@tanstack/react-query";
import { agentNativePath } from "@agent-native/core/client";
import { toast } from "sonner";

/**
 * Save part of the school's configuration the way the rest of the app does:
 * the cache changes first so the screen is already right, the request goes in
 * the background, and a refusal puts the old value back and says why.
 */
export function useSaveSchoolConfig() {
  const qc = useQueryClient();
  return function save(patch: Record<string, unknown>, done?: string) {
    const previous = qc.getQueryData(["school-config"]);
    qc.setQueryData(["school-config"], (old: any) => ({ ...old, ...patch }));
    fetch(agentNativePath("/_agent-native/actions/update-school-config"), {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(patch),
    })
      .then(async (res) => {
        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          throw new Error((err as any).error ?? "Request failed");
        }
        if (done) toast.success(done);
        qc.invalidateQueries({ queryKey: ["school-config"] });
      })
      .catch((e: Error) => {
        qc.setQueryData(["school-config"], previous);
        toast.error(e.message ?? "Could not save");
      });
  };
}
