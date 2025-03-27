import AuthLayoutTemplate from "@/layouts/auth/auth-split-layout";
import { type ReactNode } from "react";

export default function ForgotLayout({ children }: { children: ReactNode }) {
  return (
    <AuthLayoutTemplate title="Forgot password" description="Enter your email to receive a password reset link">
      {children}
    </AuthLayoutTemplate>
  );
}
