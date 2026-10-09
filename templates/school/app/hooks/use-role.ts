import { useQuery } from "@tanstack/react-query";

export type SchoolRole =
  | "school_admin"
  | "teacher"
  | "subject_coordinator"
  | "student"
  | null;

interface SessionData {
  user?: {
    id: string;
    email: string;
    name: string;
  };
  schoolRole?: SchoolRole;
  schoolId?: string | null;
  accessDenied?: boolean;
}

export function useRole() {
  const { data, isLoading } = useQuery<SessionData>({
    queryKey: ["session"],
    queryFn: async () => {
      const res = await fetch("/api/school/session");
      if (!res.ok) return {};
      return res.json();
    },
    staleTime: 60_000,
  });

  return {
    role: data?.schoolRole ?? null,
    user: data?.user ?? null,
    schoolId: data?.schoolId ?? null,
    isLoading,
    isAuthenticated: !!data?.user,
    accessDenied: data?.accessDenied ?? false,
    isAdmin: data?.schoolRole === "school_admin",
    isTeacher:
      data?.schoolRole === "teacher" ||
      data?.schoolRole === "subject_coordinator",
    isStudent: data?.schoolRole === "student",
  };
}
