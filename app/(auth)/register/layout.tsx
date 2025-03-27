import AuthLayoutTemplate from "@/layouts/auth/auth-split-layout";
import { type ReactNode } from "react";

export default function RegisterLayout({ children }: { children: ReactNode }) {
  return (
    <AuthLayoutTemplate title="Create an account" description="Enter your details below to create your account">
      {children}
    </AuthLayoutTemplate>
  );
}
