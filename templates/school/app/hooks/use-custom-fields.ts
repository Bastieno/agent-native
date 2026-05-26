import { useQuery } from "@tanstack/react-query";
import { agentNativePath } from "@agent-native/core/client";

export interface CustomFieldDef {
  name: string;
  label: string;
  type: "text" | "number" | "boolean" | "enum" | "date";
  options?: string[]; // for enum type
  required?: boolean;
}

export type CustomFieldEntity =
  | "student"
  | "lesson_note"
  | "assessment"
  | "class";

export type CustomFieldsSchema = Record<CustomFieldEntity, CustomFieldDef[]>;

export function useCustomFields(entity?: CustomFieldEntity) {
  const { data, isLoading } = useQuery<CustomFieldsSchema>({
    queryKey: ["custom-fields-schema"],
    queryFn: async () => {
      const res = await fetch(agentNativePath("/api/school/custom-fields"));
      if (!res.ok) return {} as CustomFieldsSchema;
      return res.json();
    },
    staleTime: 5 * 60_000,
  });

  const schema = data ?? ({} as CustomFieldsSchema);
  const fields = entity ? (schema[entity] ?? []) : [];

  return { schema, fields, isLoading };
}
