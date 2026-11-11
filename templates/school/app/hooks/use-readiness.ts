import { useQuery } from "@tanstack/react-query";
import { agentNativePath } from "@agent-native/core/client";
import { httpError } from "@/lib/http-error";
import { useRole } from "@/hooks/use-role";
import { missingFor, type Need, type ReadinessFacts } from "@shared/readiness";

const key = (schoolId: string) => `ellai-readiness:${schoolId}`;

function cached(schoolId: string | null): ReadinessFacts | undefined {
  if (!schoolId || typeof window === "undefined") return undefined;
  try {
    const raw = localStorage.getItem(key(schoolId));
    return raw ? (JSON.parse(raw) as ReadinessFacts) : undefined;
  } catch {
    return undefined;
  }
}

/**
 * Which first steps the school has done. Last known answer for this school is
 * shown while the fresh one loads, so the menu does not flicker; until there
 * is neither, nothing is reported (`ready: false`), so nothing is hidden or
 * locked on a guess.
 */
export function useReadiness() {
  const { schoolId } = useRole();
  const { data } = useQuery<ReadinessFacts>({
    queryKey: ["school-readiness", schoolId],
    enabled: !!schoolId,
    queryFn: async () => {
      const res = await fetch(
        agentNativePath("/_agent-native/actions/get-school-readiness"),
      );
      if (!res.ok) throw await httpError(res);
      const fresh = await res.json();
      try {
        if (schoolId)
          localStorage.setItem(key(schoolId), JSON.stringify(fresh));
      } catch {
        // A convenience only.
      }
      return fresh;
    },
    placeholderData: () => cached(schoolId),
    staleTime: 15_000,
    refetchOnWindowFocus: true,
  });
  return {
    loaded: !!data,
    facts: data ?? null,
    /** What a page is still waiting for; empty while unknown. */
    missing: (path: string): Need[] => (data ? missingFor(path, data) : []),
  };
}
