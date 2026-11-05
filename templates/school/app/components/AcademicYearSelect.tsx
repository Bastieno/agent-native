import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";
import { agentNativePath } from "@agent-native/core/client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Year = { id: string; name: string; status: string };

/**
 * Which academic year a list is showing, kept in the address (?year=) so a
 * reload or a shared link keeps it.
 *
 * The school's current year is the default and needs no parameter. Earlier
 * years are how a teacher looks back at what they taught; an unknown value
 * falls back to the current year rather than an empty page.
 */
export function useViewedYear() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { data: years = [], isSuccess: loaded } = useQuery<Year[]>({
    queryKey: ["academic-years"],
    queryFn: async () => {
      const res = await fetch(
        agentNativePath("/_agent-native/actions/list-academic-years"),
      );
      return res.ok ? res.json() : [];
    },
    staleTime: 60_000,
  });
  const requested = searchParams.get("year");
  const known = years.find((y) => y.id === requested);
  const current = years.find((y) => y.status === "active");
  // The year being looked at, or undefined for "the classes running now".
  const viewed = known && known.id !== current?.id ? known : undefined;
  const choose = (id: string) =>
    setSearchParams(
      (prev) => {
        const params = new URLSearchParams(prev);
        if (id === current?.id) params.delete("year");
        else params.set("year", id);
        return params;
      },
      { replace: true },
    );
  return { years, current, viewed, choose, loaded };
}

/** Hidden until the school has more than one year: nothing to choose between. */
export function AcademicYearSelect({
  years,
  value,
  onChange,
}: {
  years: Year[];
  value: string | undefined;
  onChange: (id: string) => void;
}) {
  if (years.length < 2) return null;
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-52" aria-label="Academic year">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {years.map((y) => (
          <SelectItem key={y.id} value={y.id}>
            {y.name}
            {y.status === "active" ? " (current)" : ""}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
