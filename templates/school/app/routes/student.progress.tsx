import { Navigate } from "react-router";

/**
 * My Progress is part of My Grades now: the term average, how much was
 * handed in and what is due next sit at the top of that page. Kept as a
 * redirect so old links and the agent's "progress" still land somewhere.
 */
export default function StudentProgress() {
  return <Navigate to="/student/grades" replace />;
}
