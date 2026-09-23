import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectGroup,
} from "@/components/ui/select";
import { currentStudent, courses } from "@/lib/mock-data";

type RegisterDialogProps = {
  onAdd: (courseId: string) => void;
};

export function RegisterDialog({ onAdd }: RegisterDialogProps) {
  const [open, setOpen] = useState(false); // true = แสดง Dialog
  const [courseId, setCourseId] = useState<string>("");

  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault(); // ไม่ให้หน้าเว็บ reload
    if (courseId) {
      onAdd(courseId);
    }
    setCourseId(""); // เคลียร์ฟอร์ม
    setOpen(false); // ปิด Dialog
  }

  const availableCourses = courses.filter(
    (course) => !currentStudent.courses?.includes(course.courseId),
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* ปุ่มที่กดแล้วเปิด Dialog */}
      <DialogTrigger>
        <Button>ลงทะเบียน</Button>
      </DialogTrigger>

      {/* ฟอร์มที่แสดงออกมาเมื่อกดปุ่ม */}
      <DialogContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <DialogHeader>
            <DialogTitle>ลงทะเบียนเรียน</DialogTitle>
            <DialogDescription>
              เลือกวิชาที่ต้องการลงทะเบียน แล้วกรอกข้อมูลให้ครบ
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-2">
            <Label htmlFor="studentId">วิชา</Label>
            <Select
              id="student"
              value={courseId}
              onValueChange={(value) => {
                if (value !== null) {
                  setCourseId(value);
                }
              }}
            >
              <SelectTrigger className="w-full">
                {courseId ? (
                  <span className="block max-w-[350px] truncate text-left">
                    {(() => {
                      const selectedCourse = courses.find(
                        (course) => course.courseId === courseId,
                      );
                      return selectedCourse
                        ? `${selectedCourse.courseId} - ${selectedCourse.courseTitle}`
                        : "เลือกวิชา";
                    })()}
                  </span>
                ) : (
                  <span className="text-muted-foreground">เลือกวิชา</span>
                )}
              </SelectTrigger>
              <SelectContent alignItemWithTrigger={false}>
                <SelectGroup>
                  {availableCourses.map((course) => (
                    <SelectItem key={course.courseId} value={course.courseId}>
                      <span className="whitespace-normal">
                        {course.courseId} - {course.courseTitle}
                      </span>
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="studentId">เวลา</Label>
            <Input
              id="studentId"
              type="time"
              defaultValue={new Date().toLocaleTimeString("en-GB", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="fullName">ชื่อ นศ.</Label>
            <Input id="fullName" placeholder="Cillian Murphy" readOnly />
          </div>

          <div className="space-y-2">
            <Label htmlFor="courseId">โปรแกรม</Label>
            <Input id="courseId" placeholder="CPE" readOnly />
          </div>

          <DialogFooter>
            <Button type="submit" disabled={!courseId}>
              ยืนยันการลงทะเบียน
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
