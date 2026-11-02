import { useParams, useSearchParams } from "react-router";
import { LessonNote } from "@/components/lesson/LessonNote";

/**
 * A teacher's lesson note, opened by an admin.
 *
 * The same screen the teacher uses, deliberately: an admin covering an
 * absence should be writing in the place the work actually lives, not in a
 * read-only copy of it.
 */
export default function AdminLesson() {
  const { lessonId } = useParams();
  // The list's year tab and page size ride along, so back lands where the
  // admin came from.
  const [searchParams] = useSearchParams();
  const back = (classId?: string) => {
    const next = new URLSearchParams();
    for (const key of ["year", "rows"]) {
      const value = searchParams.get(key);
      if (value) next.set(key, value);
    }
    if (classId) next.set("classId", classId);
    const query = next.toString();
    return query ? `/admin/lessons?${query}` : "/admin/lessons";
  };
  return (
    <LessonNote
      lessonId={lessonId!}
      role="admin"
      backTo={(classId) => back(classId)}
      backFallback={back()}
    />
  );
}
