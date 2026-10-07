import { NavLink } from "react-router";
import {
  IconLayoutDashboard,
  IconBook,
  IconCalendarWeek,
  IconChartBar,
  IconTrophy,
  IconLogout,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { useSchoolConfig } from "@/hooks/use-school-config";
import { AgentToggleButton, agentNativePath } from "@agent-native/core/client";

const navItems = [
  {
    href: "/student",
    label: "Dashboard",
    icon: IconLayoutDashboard,
    end: true,
  },
  { href: "/student/week", label: "My week", icon: IconCalendarWeek },
  { href: "/student/classes", label: "My Classes", icon: IconBook },
  { href: "/student/grades", label: "Grades", icon: IconTrophy },
  { href: "/student/progress", label: "Progress", icon: IconChartBar },
];

export function StudentNav() {
  const { config } = useSchoolConfig();
  const schoolName =
    (config as any)?.theme?.displayName ??
    (config as any)?.name ??
    "Student Portal";
  const crest = (config as any)?.theme?.logoUrl ?? null;
  return (
    <header className="flex h-14 items-center gap-2 border-b bg-background px-3 sm:gap-4 sm:px-4">
      {/* The title is the first thing to go on a tablet with the agent panel
          open — the navigation itself matters more. */}
      {crest ? (
        <img
          src={crest}
          alt=""
          className="hidden h-6 w-6 shrink-0 object-contain sm:block"
        />
      ) : null}
      <span className="hidden text-sm font-semibold shrink-0 lg:inline">
        {schoolName}
      </span>
      <nav className="flex flex-1 items-center gap-1 overflow-x-auto">
        {navItems.map(({ href, label, icon: Icon, end }) => (
          <NavLink
            key={href}
            to={href}
            end={end}
            className={({ isActive }) =>
              cn(
                "flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-md px-2.5 py-1.5 text-sm transition-colors sm:px-3",
                isActive
                  ? "bg-accent text-accent-foreground font-medium"
                  : "text-muted-foreground hover:bg-accent/60",
              )
            }
            title={label}
          >
            <Icon size={16} />
            {/* Labels collapse to icons when the viewport is tight (tablet with
                the agent panel open); the active item keeps its label. */}
            <span className="hidden sm:inline">{label}</span>
          </NavLink>
        ))}
      </nav>
      {/* The student portal has no sidebar, so this is where the agent is
          opened and closed — the floating bubble only covers small screens.
          Without it, closing the panel on a wide screen left no way back. */}
      <AgentToggleButton className="hidden shrink-0 xl:inline-flex" />
      <button
        type="button"
        onClick={async () => {
          await fetch(agentNativePath("/_agent-native/auth/logout"), {
            method: "POST",
          });
          window.location.href = "/login";
        }}
        className="flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-accent/60 shrink-0 sm:px-3"
        title="Sign out"
      >
        <IconLogout size={16} />
        <span className="hidden sm:inline">Sign out</span>
      </button>
    </header>
  );
}
