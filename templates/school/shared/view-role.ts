/**
 * Which view-screen branch a signed-in person may be shown: from the role
 * their school profile really holds, never from the role the page wrote into
 * navigation state (anyone can write that). Null: no branch at all.
 */
export type ViewRole = "admin" | "teacher" | "student";

export function viewRoleOf(
  schoolRole: string | null | undefined,
): ViewRole | null {
  switch (schoolRole) {
    case "school_admin":
      return "admin";
    case "teacher":
    case "subject_coordinator":
      return "teacher";
    case "student":
      return "student";
    default:
      return null;
  }
}

/**
 * The branch view-screen shows. A person with no profile gets the admin branch
 * only while they may set their own school up (its owner or admin, before it
 * has a configuration — the same answer the session handler gives); otherwise
 * they have no branch, so what a page writes into navigation state never
 * grants one.
 */
export function viewRoleFor(
  schoolRole: string | null | undefined,
  canSetUp: boolean,
): ViewRole | null {
  const real = viewRoleOf(schoolRole);
  if (real) return real;
  return !schoolRole && canSetUp ? "admin" : null;
}
