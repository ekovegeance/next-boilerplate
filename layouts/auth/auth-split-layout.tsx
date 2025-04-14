import { type PropsWithChildren } from "react";
import Image from "next/image";
import floss from "@/public/images/floss.png";
import Link from "next/link";
import AppLogo from "@/components/app-logo";

interface AuthLayoutProps {
  title?: string;
  description?: string;
}

export default function AuthSplitLayout({
  children,
  title,
  description,
}: PropsWithChildren<AuthLayoutProps>) {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link href="/" className="flex items-center gap-2 font-medium">
            <AppLogo/>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-xl font-bold">{title}</h1>
                <p className="text-balance text-sm text-muted-foreground">
                  {description}
                </p>
              </div>
              {children}
            </div>
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <Image
          src={floss}
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
