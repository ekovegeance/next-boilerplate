import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import React from "react";
import floss from "@/public/images/floss.png";

interface AuthLayoutProps {
  name?: string;
  title?: string;
  description?: string;
}

export default function AuthImageLayout({
  children,
  title,
  description,
}: React.PropsWithChildren<AuthLayoutProps>) {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <div className="flex flex-col gap-6">
          <Card className="overflow-hidden">
            <CardContent className="grid p-0 md:grid-cols-2">
              <div className="p-6 md:p-8">
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col items-center text-center">
                    <h1 className="text-xl font-bold">{title}</h1>
                    <p className="text-center text-sm text-muted-foreground">
                      {description}
                    </p>
                  </div>
                  {children}
                </div>
              </div>
              <div className="relative hidden bg-muted md:block">
                <Image
                  src={floss}
                  alt="Image"
                  className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
