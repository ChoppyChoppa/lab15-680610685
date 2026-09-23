import { Separator } from "@/components/ui/separator";
import { type FooterProps } from "../lib/Footer";

export default function Footer({ fullName, studentId }: FooterProps) {
  return (
    <footer className="mt-auto">
      <Separator />

      <div className="flex h-10 items-center justify-center text-sm text-muted-foreground">
        จัดทำโดย {fullName} รหัสนักศึกษา {studentId}
      </div>
    </footer>
  );
}
