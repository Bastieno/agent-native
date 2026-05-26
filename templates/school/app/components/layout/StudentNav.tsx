import { NavLink } from "react-router";
import {
  IconLayoutDashboard,
  IconBook,
  IconChartBar,
  IconTrophy,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/student", label: "Dashboard", icon: IconLayoutDashboard, end: true },
  { href: "/student/classes", label: "My Classes", icon: IconBook },
  { href: "/student/grades", label: "Grades", icon: IconTrophy },
  { href: "/student/progress", label: "Progress", icon: IconChartBar },
];

export function StudentNav() {
  return (
    <header className="flex h-14 items-center gap-4 border-b bg-background px-4">
      <span className="text-sm font-semibold">Student Portal</span>
      <nav className="flex items-center gap-1">
        {navItems.map(({ href, label, icon: Icon, end }) => (
          <NavLink
            key={href}
            to={href}
            end={end}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm transition-colors",
                isActive
                  ? "bg-accent text-accent-foreground font-medium"
                  : "text-muted-foreground hover:bg-accent/60",
              )
            }
          >
            <Icon size={14} />
            {label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}
