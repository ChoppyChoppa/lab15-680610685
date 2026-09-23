import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { currentStudent } from "@/lib/mock-data";

export default function HomePage() {
  const fullName = `${currentStudent.firstName} ${currentStudent.lastName}`;
  return (
    <div className="mx-auto max-w-xl space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>ระบบลงทะเบียนเรียน CPE & ISNE</CardTitle>
        </CardHeader>
        <CardContent
          className="space-y-4"
          children={
            <Link to="/enrollment">
              <Button variant="default">ไปหน้าลงทะเบียนเรียน</Button>
            </Link>
          }
        ></CardContent>
      </Card>
      <p className="text-center text-xs text-muted-foreground">
        จัดทำโดย {fullName} รหัสนักศึกษา {currentStudent.studentId}
      </p>
    </div>
  );
}
