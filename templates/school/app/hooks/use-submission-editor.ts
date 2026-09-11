import { useRef, useCallback } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { agentNativePath } from "@agent-native/core/client";

export interface SubmissionDraftState {
  content: string;
  attachments?: Array<{ id: string; name: string; url: string }>;
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

export function useSubmissionEditor(submissionId: string) {
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const appStateKey = `submission-draft-${submissionId}`;

  // Read live draft from app-state (agent tutor can see student's in-progress work)
  const { data: draft } = useQuery<SubmissionDraftState | null>({
    queryKey: ["submission-draft", submissionId],
    queryFn: () => apiFetch(`/_agent-native/application-state/${appStateKey}`),
    refetchInterval: 2_000,
    enabled: !!submissionId,
  });

  const saveMutation = useMutation({
    mutationFn: (state: SubmissionDraftState) =>
      apiFetch(`/_agent-native/application-state/${appStateKey}`, {
        method: "PUT",
        body: JSON.stringify(state),
      }),
  });

  // Debounced auto-save — called on every keystroke
  const save = useCallback(
    (state: SubmissionDraftState) => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        saveMutation.mutate(state);
      }, 800);
    },
    [saveMutation],
  );

  const clearDraft = useCallback(() => {
    apiFetch(`/_agent-native/application-state/${appStateKey}`, {
      method: "DELETE",
    }).catch(() => {});
  }, [appStateKey]);

  return { draft, save, clearDraft };
}
