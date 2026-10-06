import { useParams } from "react-router";
import { LessonNote } from "@/components/lesson/LessonNote";

export default function TeacherLesson() {
  const { lessonId } = useParams();
  return (
    <LessonNote
      lessonId={lessonId!}
      role="teacher"
      backTo={(classId) => `/teacher/classes/${classId}`}
      backFallback="/teacher/classes"
    />
  );
}
