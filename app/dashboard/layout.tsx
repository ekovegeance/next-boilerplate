import AppLayoutTemplate from "@/layouts/app/app-header-layout";
import { type ReactNode } from "react";
import { SessionProvider } from "next-auth/react";

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <AppLayoutTemplate>{children}</AppLayoutTemplate>
    </SessionProvider>
  );
}
