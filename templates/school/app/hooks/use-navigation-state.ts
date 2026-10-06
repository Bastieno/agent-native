import { useRef, useCallback } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { agentNativePath } from "@agent-native/core/client";
import { TAB_ID } from "@/lib/tab-id";

// ─── Navigation state shapes per role ────────────────────────────────────────

export interface AdminNav {
  role: "admin";
  view:
    | "overview"
    | "curriculum"
    | "curriculum-setup"
    | "calendar"
    | "staff"
    | "students"
    | "classes"
    // Lesson-note readiness across the school, and a single note opened from
    // it — an admin may write and mark ready on a teacher's behalf.
    | "lessons"
    | "lesson"
    // An activity opened from a lesson's "what your class sees".
    | "assessment"
    | "analytics"
    | "settings"
    | "extensions";
  subjectId?: string;
  /** The class whose lesson notes are open. */
  classId?: string;
  /** The year group open on a subject's curriculum page. */
  gradeLevelId?: string;
  /** The activity being read, and which of its variants is open. */
  assessmentId?: string;
  variantId?: string;
  /** A lesson note open for reading, from the calendar. */
  lessonId?: string;
  departmentId?: string;
  studentId?: string;
  staffUserId?: string;
  curriculumDraftId?: string;
  _ts?: number;
}

export interface TeacherNav {
  role: "teacher";
  view:
    | "dashboard"
    | "classes"
    | "class"
    | "unit"
    | "lesson"
    | "assessment"
    | "gradebook"
    | "students"
    | "analytics"
    // Drafting a curriculum is subject work, so a teacher reaches these too.
    | "curriculum"
    | "curriculum-setup";
  classId?: string;
  unitId?: string;
  lessonId?: string;
  assessmentId?: string;
  variantId?: string;
  studentId?: string;
  termId?: string;
  subjectId?: string;
  /** The drafting session open in the workspace. */
  curriculumDraftId?: string;
  lessonDraftStatus?: "draft" | "finalized";
  _ts?: number;
}

export interface StudentNav {
  role: "student";
  view:
    | "dashboard"
    | "classes"
    | "class"
    | "lesson"
    | "assessment"
    | "submission"
    | "grades"
    | "progress";
  classId?: string;
  lessonId?: string;
  assessmentId?: string;
  submissionId?: string;
  _ts?: number;
}

export type NavigationState = AdminNav | TeacherNav | StudentNav;

async function apiFetch<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(agentNativePath(url), {
    headers: {
      "Content-Type": "application/json",
      "X-Request-Source": TAB_ID,
    },
    ...options,
  });
  if (!res.ok) {
    if (res.status === 404) return undefined as T;
    throw new Error(`Request failed (${res.status})`);
  }
  return res.json();
}

export function useNavigationState() {
  const qc = useQueryClient();
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  // Write-only: UI syncs its current state so the agent can read it
  const putMutation = useMutation({
    mutationFn: (state: NavigationState) =>
      apiFetch("/_agent-native/application-state/navigation", {
        method: "PUT",
        keepalive: true,
        body: JSON.stringify(state),
      }),
  });

  // `sync` must be referentially stable: every route calls it from an effect
  // that lists it as a dependency. Depending on the `useMutation` result object
  // (which changes identity on every mutation state change) caused a
  // PUT → rerender → new sync → effect → PUT loop of ~2 requests/second.
  const mutateRef = useRef(putMutation.mutate);
  mutateRef.current = putMutation.mutate;
  const lastSentRef = useRef<string | null>(null);

  const sync = useCallback((state: NavigationState) => {
    const serialized = JSON.stringify(state);
    if (serialized === lastSentRef.current) return;
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      lastSentRef.current = serialized;
      mutateRef.current(state);
    }, 500);
  }, []);

  // One-shot command: agent writes navigate, UI reads and deletes it
  const command = useQuery<NavigationState | null>({
    queryKey: ["navigate-command"],
    queryFn: async () => {
      const result = await apiFetch<NavigationState | undefined>(
        "/_agent-native/application-state/navigate",
      );
      if (result) {
        return { ...result, _ts: Date.now() } as NavigationState;
      }
      return null;
    },
    refetchInterval: 2_000,
    structuralSharing: false,
  });

  const clearCommand = useCallback(() => {
    apiFetch("/_agent-native/application-state/navigate", {
      method: "DELETE",
    }).catch(() => {});
    qc.setQueryData(["navigate-command"], null);
  }, [qc]);

  return {
    sync,
    command: { data: command.data },
    clearCommand,
  };
}
