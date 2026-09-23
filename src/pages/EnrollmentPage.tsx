import { CourseCard } from "@/components/course-card";
import { RegisterDialog } from "@/components/register-dialog";
import { courses, currentStudent, enrollments } from "@/lib/mock-data";
import { useState } from "react";

export default function Enrollent() {
  const [student, setStudent] = useState(currentStudent);

  const addCourse = (courseId: string) => {
    currentStudent.courses = [...(currentStudent.courses ?? []), courseId];
    setStudent({ ...currentStudent });
  };

  const deleteCourse = (courseId: string) => {
    currentStudent.courses = currentStudent.courses?.filter(
      (id) => id !== courseId,
    );
    setStudent({ ...currentStudent });
  };
  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-4">
        <h1 className="text-xl font-semibold">รายวิชาทั้งหมด</h1>

        <RegisterDialog onAdd={addCourse} />
      </div>
      <div className="flex flex-col gap-4">
        {courses.map((course) => {
          const enrollment = enrollments.find(
            (e) =>
              e.studentId === student.studentId &&
              e.courseId === course.courseId,
          );
          return (
            <CourseCard
              key={course.courseId}
              course={course}
              student={student}
              onDelete={deleteCourse}
              enrolledAt={enrollment?.enrolledAt}
            />
          );
        })}
      </div>
    </div>
  );
}
