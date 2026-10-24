import { useQuery } from "@tanstack/react-query";
import { agentNativePath } from "@agent-native/core/client";

export interface TeacherExtension {
  id: string;
  name: string;
  description?: string;
}

/**
 * The extensions this teacher may open: the ones the admin has marked for
 * teachers, out of the framework's own list of what the person can see.
 */
export function useTeacherExtensions() {
  const { data, isLoading } = useQuery({
    queryKey: ["teacher-extensions"],
    queryFn: async (): Promise<TeacherExtension[]> => {
      const [audience, list] = await Promise.all([
        fetch(
          agentNativePath("/_agent-native/actions/get-extension-audience"),
        ).then((r) => (r.ok ? r.json() : { teacherIds: [] })),
        fetch(agentNativePath("/_agent-native/extensions")).then((r) =>
          r.ok ? r.json() : [],
        ),
      ]);
      const marked = new Set<string>(audience.teacherIds ?? []);
      return (Array.isArray(list) ? list : []).filter((e: TeacherExtension) =>
        marked.has(e.id),
      );
    },
  });
  return { extensions: data ?? [], isLoading };
}
