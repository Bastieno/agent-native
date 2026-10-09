import { useQuery } from "@tanstack/react-query";
import { agentNativePath } from "@agent-native/core/client";
import { useSchoolConfig } from "@/hooks/use-school-config";

export interface Arm {
  id: string;
  name: string;
  gradeLevelId: string;
  gradeLevelName: string | null;
  stream: string | null;
  homeRoom: string | null;
  formTeacherUserId: string | null;
  learnerCount: number;
}

export interface GradeLevel {
  id: string;
  name: string;
}

/** The school's word for an arm: "Arm" until they have chosen another. */
export function useArmWord() {
  const { config } = useSchoolConfig();
  const raw = (config.customLabels?.arm ?? "").trim() || "Arm";
  return {
    Arm: raw.charAt(0).toUpperCase() + raw.slice(1),
    arm: raw.toLowerCase(),
  };
}

export async function callAction(
  name: string,
  params: Record<string, unknown>,
  method: "GET" | "POST" = "POST",
) {
  const res = await fetch(agentNativePath(`/_agent-native/actions/${name}`), {
    method,
    headers: { "Content-Type": "application/json" },
    body: method === "POST" ? JSON.stringify(params) : undefined,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error((err as any).error ?? "Request failed");
  }
  return res.json();
}

export const ARMS_KEY = ["arms"];

export function useArms() {
  return useQuery<Arm[]>({
    queryKey: ARMS_KEY,
    queryFn: async () => (await callAction("list-arms", {}, "GET")).arms ?? [],
  });
}

export function useGradeLevels() {
  return useQuery<GradeLevel[]>({
    queryKey: ["grade-levels"],
    queryFn: async () => callAction("manage-grade-levels", { action: "list" }),
    staleTime: 60_000,
  });
}
