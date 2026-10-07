import { useQuery } from "@tanstack/react-query";
import { agentNativePath } from "@agent-native/core/client";
import type { MyWeek } from "../../server/lib/my-week";

/**
 * The signed-in person's own week. One query key and one read-only (GET)
 * action, shared by the week page and the dashboard so they use one cache.
 * `date` is optional and picks the term.
 */
export function useMyWeek(date?: string) {
  return useQuery<MyWeek | null>({
    queryKey: ["my-week", date ?? null],
    queryFn: async () => {
      const qs = date ? `?date=${encodeURIComponent(date)}` : "";
      const res = await fetch(
        agentNativePath(`/_agent-native/actions/get-my-week${qs}`),
      );
      if (!res.ok) return null;
      return res.json();
    },
  });
}
