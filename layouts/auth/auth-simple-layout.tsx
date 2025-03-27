import { Command } from "lucide-react";
import Link from "next/link";
import { type PropsWithChildren } from "react";

interface AuthLayoutProps {
  name?: string;
  title?: string;
  description?: string;
}

export default function AuthSimpleLayout({
  children,
  title,
  description,
}: PropsWithChildren<AuthLayoutProps>) {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-2">
            <Link
              href="/"
              className="flex flex-col items-center gap-2 font-medium"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-md">
                <Command className="size-6" />
              </div>
            </Link>
            <h1 className="text-xl font-bold">{title}</h1>
            <div className="text-center text-sm">{description}</div>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
