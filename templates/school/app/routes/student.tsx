import { Outlet, useNavigate } from "react-router";
import { useEffect } from "react";
import { AgentSidebar } from "@agent-native/core/client";
import { getSchoolSuggestions } from "@/lib/school-suggestions";
import { StudentNav } from "@/components/layout/StudentNav";
import { useRole } from "@/hooks/use-role";
import { useNavigationState } from "@/hooks/use-navigation-state";
import { DefaultSpinner } from "@agent-native/core/client";

export default function StudentLayout() {
  const { role, isLoading } = useRole();
  const navigate = useNavigate();
  const { command, clearCommand } = useNavigationState();

  useEffect(() => {
    if (!command.data) return;
    const nav = command.data as any;
    clearCommand();
    if (!nav.view) return;
    if (nav.view === "dashboard") navigate("/student");
    else if (nav.view === "classes") navigate("/student/classes");
    else if (nav.view === "class" && nav.classId)
      navigate(`/student/classes/${nav.classId}`);
    else if (nav.view === "assessment" && nav.assessmentId)
      navigate(`/student/assessments/${nav.assessmentId}`);
    else if (nav.view === "grades") navigate("/student/grades");
    else if (nav.view === "progress") navigate("/student/progress");
  }, [command.data, clearCommand, navigate]);

  useEffect(() => {
    if (!isLoading && role !== "student") {
      navigate("/");
    }
  }, [isLoading, role, navigate]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <DefaultSpinner />
      </div>
    );
  }
  if (!isLoading && role !== "student") {
    return null;
  }

  return (
    <AgentSidebar
      emptyStateText="Ask me for help with your assignments!"
      dynamicSuggestions={{ getSuggestions: getSchoolSuggestions }}
      defaultOpen
    >
      <div className="flex h-screen flex-col overflow-hidden bg-background">
        <StudentNav />
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </AgentSidebar>
  );
}
