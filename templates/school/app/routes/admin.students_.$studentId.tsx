import { useParams } from "react-router";
import { LearnerProfile } from "@/components/LearnerProfile";

export default function AdminStudent() {
  const { studentId } = useParams<{ studentId: string }>();
  return (
    <LearnerProfile
      studentId={studentId}
      role="admin"
      backTo="/admin/students"
    />
  );
}
