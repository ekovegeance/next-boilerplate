import AppLayoutTemplate from "@/layouts/app/app-header-layout";
import { type ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";


export default async function AppLayout({ children }: { children: ReactNode }) {
  const session = await auth();

  if (session?.user) {
    session.user = {
      id: "",
      name: session.user.name,
      email: session.user.email,
      image: session.user.image,
      avatar: session.user.avatar
    };
  }

  return(
      <SessionProvider session={session}>
        <AppLayoutTemplate>{children}</AppLayoutTemplate>
      </SessionProvider>
  );
}