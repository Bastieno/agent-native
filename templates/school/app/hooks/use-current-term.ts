import { useQuery } from "@tanstack/react-query";
import { agentNativePath } from "@agent-native/core/client";

/**
 * The session and term the school is in, for anywhere that needs to say so.
 * Slow-moving data, so it is cached for the session rather than polled.
 */
export function useCurrentTerm() {
  const { data } = useQuery<{ label?: string; inBreak?: boolean } | null>({
    queryKey: ["current-term"],
    queryFn: async () => {
      const res = await fetch(
        agentNativePath("/_agent-native/actions/get-current-term"),
      );
      if (!res.ok) return null;
      const text = await res.text();
      if (!text.trim()) return null;
      try {
        return JSON.parse(text);
      } catch {
        return null;
      }
    },
    staleTime: 10 * 60_000,
  });
  return data ?? null;
}
