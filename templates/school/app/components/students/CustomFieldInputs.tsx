import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { CustomFieldDef } from "@/hooks/use-custom-fields";

/**
 * Inputs for whatever this school records about a student.
 *
 * These fields were definable from the day the app shipped and visible on no
 * screen — there was a hook to read them and nothing used it — so a House or
 * a Stream could only be set by asking the agent, and could not be read back
 * at all. A field nobody can see is a field nobody fills in.
 *
 * Everything here is drawn from the school's own definitions: their labels,
 * their options, in their order. Nothing is shipped, nothing is assumed, and
 * a school with no fields sees nothing rather than an empty heading.
 */
export function CustomFieldInputs({
  fields,
  values,
  onChange,
}: {
  fields: CustomFieldDef[];
  values: Record<string, unknown>;
  onChange: (name: string, value: unknown) => void;
}) {
  if (fields.length === 0) return null;

  return (
    <>
      {fields.map((field) => {
        const value = values[field.name];
        const label = field.label ?? field.name;
        return (
          <div key={field.name} className="space-y-1.5">
            <Label>
              {label}
              {field.required ? (
                <span className="ml-1 text-xs text-muted-foreground">
                  (required)
                </span>
              ) : null}
            </Label>
            {field.type === "enum" ? (
              <Select
                // "Not set" is a real answer: a school may add a field years
                // into a student's time here, and if the form cannot express
                // "not known yet" it invents data instead.
                value={typeof value === "string" && value ? value : "—"}
                onValueChange={(v) => onChange(field.name, v === "—" ? "" : v)}
              >
                <SelectTrigger className="text-sm">
                  <SelectValue placeholder="Not set" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="—">Not set</SelectItem>
                  {(field.options ?? []).map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : field.type === "boolean" ? (
              <Select
                value={value === true ? "yes" : value === false ? "no" : "—"}
                onValueChange={(v) =>
                  onChange(field.name, v === "—" ? "" : v === "yes")
                }
              >
                <SelectTrigger className="text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="—">Not set</SelectItem>
                  <SelectItem value="yes">Yes</SelectItem>
                  <SelectItem value="no">No</SelectItem>
                </SelectContent>
              </Select>
            ) : (
              <Input
                type={
                  field.type === "date"
                    ? "date"
                    : field.type === "number"
                      ? "number"
                      : "text"
                }
                value={
                  value === undefined || value === null ? "" : String(value)
                }
                onChange={(e) => onChange(field.name, e.target.value)}
              />
            )}
          </div>
        );
      })}
    </>
  );
}

/** What is stored on the record, parsed defensively. */
export function fieldValuesOf(student: any): Record<string, unknown> {
  try {
    const parsed = JSON.parse(student?.customFieldsJson ?? "{}");
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}
