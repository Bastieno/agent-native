import { useQuery } from "@tanstack/react-query";
import { agentNativePath } from "@agent-native/core/client";

export interface GradingLevel {
  grade: string; // e.g. "A", "B", "C"
  min: number;
  max: number;
  label?: string; // e.g. "Excellent"
}

export interface SchoolConfig {
  gradingScale: {
    type: "letter" | "percentage" | "points" | "proficiency";
    levels: GradingLevel[];
  };
  termStructure: "semesters" | "terms" | "quarters";
  gradePrefix: "Grade" | "Form" | "Year" | "Class" | string;
  passMark: number;
  lateSubmissionPolicy: "accepted" | "penalty" | "not_accepted";
  assessmentTerminology: "assignment" | "assessment" | "task" | "homework";
  schoolTimezone: string;
  locale: string;
  customLabels: Record<string, string>;
}

const DEFAULT_CONFIG: SchoolConfig = {
  gradingScale: {
    type: "letter",
    levels: [
      { grade: "A", min: 70, max: 100, label: "Excellent" },
      { grade: "B", min: 60, max: 69, label: "Good" },
      { grade: "C", min: 50, max: 59, label: "Average" },
      { grade: "D", min: 40, max: 49, label: "Below Average" },
      { grade: "F", min: 0, max: 39, label: "Fail" },
    ],
  },
  termStructure: "terms",
  gradePrefix: "Grade",
  passMark: 50,
  lateSubmissionPolicy: "accepted",
  assessmentTerminology: "assessment",
  schoolTimezone: "UTC",
  locale: "en",
  customLabels: {},
};

export function useSchoolConfig() {
  const { data, isLoading } = useQuery<SchoolConfig>({
    queryKey: ["school-config"],
    queryFn: async () => {
      const res = await fetch(agentNativePath("/api/school/config"));
      if (!res.ok) return DEFAULT_CONFIG;
      const json = await res.json();
      return { ...DEFAULT_CONFIG, ...json };
    },
    staleTime: 5 * 60_000,
  });

  const config = data ?? DEFAULT_CONFIG;

  const getLetterGrade = (percentage: number): string => {
    if (config.gradingScale.type !== "letter") return `${percentage}%`;
    const level = config.gradingScale.levels.find(
      (l) => percentage >= l.min && percentage <= l.max,
    );
    return level?.grade ?? "F";
  };

  const label = (key: string, fallback: string): string => {
    return config.customLabels[key] ?? fallback;
  };

  return { config, isLoading, getLetterGrade, label };
}
