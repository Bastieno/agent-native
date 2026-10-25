import { useParams } from "react-router";
import { LearnerProfile } from "@/components/LearnerProfile";

export default function TeacherStudent() {
  const { studentId } = useParams<{ studentId: string }>();
  return (
    <LearnerProfile
      studentId={studentId}
      role="teacher"
      backTo="/teacher/students"
    />
  );
}
