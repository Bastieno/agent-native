import { useParams } from "react-router";
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
  return (
    <LessonNote
      lessonId={lessonId!}
      role="admin"
      backTo={(classId) => `/admin/lessons?classId=${classId}`}
      backFallback="/admin/lessons"
    />
  );
}
