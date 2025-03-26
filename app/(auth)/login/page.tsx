import { LoginForm } from "@/components/auth/login-form";
import { Suspense } from "react";

export default function Page() {
  return (
    <div>
    <Suspense fallback={<p>Loading</p>}>
      <LoginForm/>
    </Suspense>
    </div>
  );
}
