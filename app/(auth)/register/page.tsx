import { RegisterForm } from "@/components/auth/register-form";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<p>Loading</p>}>
      <RegisterForm />
    </Suspense>
  );
}
