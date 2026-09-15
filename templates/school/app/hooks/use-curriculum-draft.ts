import { useQuery, useMutation } from "@tanstack/react-query";
import { agentNativePath } from "@agent-native/core/client";

export interface CurriculumDraftState {
  draftId: string;
  stateJson: Record<string, unknown>;
  step?: string;
  lastAction?: string;
}

async function apiFetch<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(agentNativePath(url), {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok) {
    if (res.status === 404) return undefined as T;
    throw new Error(`Request failed (${res.status})`);
  }
  return res.json();
}

export function useCurriculumDraft(draftId: string | null) {
  const appStateKey = draftId ? `curriculum-draft-${draftId}` : null;

  // Polls the live co-authoring workspace — agent writes here as it builds curriculum
  const { data: draftState, isLoading } = useQuery<CurriculumDraftState | null>(
    {
      // Distinct from the stored draft's own key: this polls the live
      // app-state the agent writes, which carries the evolving tree but not
      // the record's title or status. Sharing a key had them overwrite each
      // other, and whichever landed last decided what the page showed.
      queryKey: ["curriculum-draft-live", draftId],
      queryFn: () =>
        appStateKey
          ? apiFetch(`/_agent-native/application-state/${appStateKey}`)
          : null,
      refetchInterval: 2_000,
      enabled: !!draftId,
    },
  );

  const updateMutation = useMutation({
    mutationFn: (state: Partial<CurriculumDraftState>) =>
      appStateKey
        ? apiFetch(`/_agent-native/application-state/${appStateKey}`, {
            method: "PUT",
            body: JSON.stringify(state),
          })
        : Promise.resolve(null),
  });

  return { draftState, isLoading, update: updateMutation.mutate };
}
