import { useQuery } from "@tanstack/react-query";

export type SchoolRole =
  | "school_admin"
  | "teacher"
  | "subject_coordinator"
  | "student"
  | null;

/**
 * Where someone without a school role stands: not part of a school, able to
 * set their own school up, or waiting to be given a role in it.
 */
export type SchoolAccess = "none" | "setup" | "waiting";

interface SessionData {
  user?: {
    id: string;
    email: string;
    name: string;
  };
  schoolRole?: SchoolRole;
  schoolId?: string | null;
  access?: SchoolAccess | null;
  schoolName?: string | null;
  accessDenied?: boolean;
}

/** `poll`: keep checking, for a page waiting on someone else to act. */
export function useRole({ poll = false }: { poll?: boolean } = {}) {
  const { data, isLoading } = useQuery<SessionData>({
    queryKey: ["session"],
    queryFn: async () => {
      const res = await fetch("/api/school/session");
      if (!res.ok) return {};
      return res.json();
    },
    staleTime: 60_000,
    refetchInterval: poll ? 5_000 : false,
  });

  return {
    role: data?.schoolRole ?? null,
    user: data?.user ?? null,
    schoolId: data?.schoolId ?? null,
    isLoading,
    isAuthenticated: !!data?.user,
    accessDenied: data?.accessDenied ?? false,
    access: data?.schoolRole ? null : (data?.access ?? null),
    schoolName: data?.schoolName ?? null,
    isAdmin: data?.schoolRole === "school_admin",
    isTeacher:
      data?.schoolRole === "teacher" ||
      data?.schoolRole === "subject_coordinator",
    isStudent: data?.schoolRole === "student",
  };
}
