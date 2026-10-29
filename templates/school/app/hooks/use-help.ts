import { useCallback, useMemo } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { agentNativePath } from "@agent-native/core/client";
import {
  capabilitiesFor,
  helpRoleOf,
  HIGHLIGHTS,
  type Capability,
} from "../../shared/capabilities";
import { useRole } from "@/hooks/use-role";
import { useSchoolConfig } from "@/hooks/use-school-config";
import { schoolWords } from "../../shared/school-words";

interface SeenData {
  seen: string[];
  tourAt: string | null;
}

/**
 * What this person can do, and what they have already been shown.
 *
 * Seen entries are kept on the server, per person, so a person who has opened
 * something on their phone is not shown it again on their laptop. Marking
 * something seen updates the screen at once and tells the server afterwards.
 */
export function useHelp() {
  const { role } = useRole();
  const qc = useQueryClient();
  const helpRole = helpRoleOf(role);
  const coordinator = role === "subject_coordinator";

  const { config } = useSchoolConfig();
  const words = useMemo(() => schoolWords(config), [config]);
  const capabilities = useMemo(
    () => (helpRole ? capabilitiesFor(helpRole, { coordinator, words }) : []),
    [helpRole, coordinator, words],
  );

  const { data, isLoading } = useQuery<SeenData>({
    queryKey: ["help-seen"],
    queryFn: async () => {
      const res = await fetch(agentNativePath("/api/school/help"));
      if (!res.ok) return { seen: [], tourAt: null };
      return res.json();
    },
    enabled: !!helpRole,
    staleTime: 60_000,
  });

  const seen = useMemo(() => new Set(data?.seen ?? []), [data]);
  const tourDone = !!data?.tourAt;

  // New for someone who has done the tour: added after they did it, and not
  // seen. Before the tour, the welcome card does the introducing instead.
  const fresh: Capability[] = useMemo(() => {
    if (!tourDone || !data?.tourAt) return [];
    const since = data.tourAt.slice(0, 10);
    return capabilities.filter((c) => c.added > since && !seen.has(c.id));
  }, [capabilities, seen, tourDone, data?.tourAt]);

  const highlights = useMemo(
    () =>
      helpRole
        ? HIGHLIGHTS[helpRole]
            .map((id) => capabilities.find((c) => c.id === id))
            .filter((c): c is Capability => !!c)
        : [],
    [helpRole, capabilities],
  );

  const markSeen = useCallback(
    (ids: string[]) => {
      if (ids.length === 0) return;
      qc.setQueryData<SeenData>(["help-seen"], (old) => {
        const base = old ?? { seen: [], tourAt: null };
        return {
          seen: [
            ...new Set([...base.seen, ...ids.filter((i) => i !== "tour")]),
          ],
          tourAt: ids.includes("tour")
            ? (base.tourAt ?? new Date().toISOString())
            : base.tourAt,
        };
      });
      void fetch(agentNativePath("/api/school/help-seen"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids }),
      });
    },
    [qc],
  );

  return {
    role,
    helpRole,
    coordinator,
    capabilities,
    seen,
    fresh,
    highlights,
    tourDone,
    isLoading,
    /** Something worth a quiet marker on the Help link. */
    hasNews: !!helpRole && !isLoading && (!tourDone || fresh.length > 0),
    markSeen,
  };
}
