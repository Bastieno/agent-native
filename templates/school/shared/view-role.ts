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
