import type { Course, Student } from "@/lib/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type CourseCardProps = {
  course: Course;
  student: Student;
  enrolledAt?: string;
  onDelete: (courseId: string) => void;
};

export function CourseCard({
  course,
  student,
  enrolledAt,
  onDelete,
}: CourseCardProps) {
  const isEnrolled = student.courses?.includes(course.courseId);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-end justify-between text-base">
          <div>{course.courseTitle}</div>
          <div>
            {isEnrolled ? (
              <Badge className="bg-amber-100 text-amber-800 dark:bg-purple-800 dark:text-purple-100">
                ลงทะเบียนแล้ว
              </Badge>
            ) : (
              <Badge className="bg-purple-100 text-purple-800 dark:bg-amber-800 dark:text-amber-100">
                เปิดรับ
              </Badge>
            )}
          </div>
        </CardTitle>
        <CardDescription>
          รหัสวิชา: {course.courseId} · ผู้สอน: {course.instructors.join(", ")}
        </CardDescription>
      </CardHeader>
      {isEnrolled && (
        <CardContent>
          <div className="flex items-end justify-between">
            <div className="text-xs text-muted-foreground">
              <p>
                ชื่อ นศ.: {student.firstName} {student.lastName}
              </p>
              <p>โปรแกรม: {student.program}</p>
              <p>
                ลงทะเบียนเมื่อ:{" "}
                {enrolledAt
                  ? new Date(enrolledAt).toLocaleString("th-TH-u-ca-buddhist", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                      hour: "numeric",
                      minute: "2-digit",
                      hour12: false,
                    })
                  : "-"}
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="text-red-400"
              onClick={() => onDelete(course.courseId)}
            >
              <Trash2 />
            </Button>
          </div>
        </CardContent>
      )}
    </Card>
  );
}
