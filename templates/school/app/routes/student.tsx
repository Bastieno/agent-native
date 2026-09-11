import { Outlet, useNavigate } from "react-router";
import { useEffect } from "react";
import { AgentSidebar, AgentToggleButton } from "@agent-native/core/client";
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
      // Side by side only on a large desktop. On a tablet the panel would
      // take half the screen before the student has asked anything, leaving
      // too little room to read a question or write an answer.
      overlayBreakpointPx={1279}
      defaultOpen={
        typeof window !== "undefined" ? window.innerWidth >= 1280 : false
      }
    >
      <div className="flex h-screen flex-col overflow-hidden bg-background">
        <StudentNav />
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
        <AgentToggleButton className="fixed bottom-6 right-6 z-30 h-12 w-12 rounded-full border bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 hover:text-primary-foreground xl:hidden" />
      </div>
    </AgentSidebar>
  );
}
