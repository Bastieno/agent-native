import { useRef, useCallback } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { agentNativePath } from "@agent-native/core/client";

export interface LessonEditState {
  title: string;
  content: string;
  summary?: string;
  status: "draft" | "finalized";
  customFieldsJson?: Record<string, unknown>;
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

export function useLessonEditor(lessonId: string) {
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const appStateKey = `lesson-edit-${lessonId}`;

  // Read live edit state from app-state (agent writes here too)
  const { data: liveEdit } = useQuery<LessonEditState | null>({
    queryKey: ["lesson-edit", lessonId],
    queryFn: () => apiFetch(`/_agent-native/application-state/${appStateKey}`),
    refetchInterval: 2_000,
    enabled: !!lessonId,
  });

  // Write debounced saves to app-state as user types
  const saveMutation = useMutation({
    mutationFn: (state: LessonEditState) =>
      apiFetch(`/_agent-native/application-state/${appStateKey}`, {
        method: "PUT",
        body: JSON.stringify(state),
      }),
  });

  const save = useCallback(
    (state: LessonEditState) => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        saveMutation.mutate(state);
      }, 1_000);
    },
    [saveMutation],
  );

  const clearEdit = useCallback(() => {
    apiFetch(`/_agent-native/application-state/${appStateKey}`, {
      method: "DELETE",
    }).catch(() => {});
  }, [appStateKey]);

  return { liveEdit, save, clearEdit };
}
