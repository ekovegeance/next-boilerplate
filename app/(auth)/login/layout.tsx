import AuthLayoutTemplate from "@/layouts/auth/auth-split-layout";
import { type ReactNode } from "react";

export default function LoginLayout({ children }: { children: ReactNode }) {
  return (
    <AuthLayoutTemplate title="Log in to your account" description="Enter your email and password below to log in">
      {children}
    </AuthLayoutTemplate>
  );
}
