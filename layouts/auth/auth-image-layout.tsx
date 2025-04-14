import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import React from "react";
import floss from "@/public/images/floss.png";
import { cn } from "@/lib/utils";

interface AuthLayoutProps {
  name?: string;
  title?: string;
  description?: string;
}

export default function AuthImageLayout({
  children,
  title,
  description,
  ...props
}: React.PropsWithChildren<AuthLayoutProps> & { className?: string }) {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <div className={cn("flex flex-col gap-6", props.className)} {...props}>
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
              <div className="bg-muted relative hidden md:block">
                <Image
                  src={floss}
                  alt="alt"
                  className="absolute inset-0 h-full min-h-svh -mt-24 object-cover dark:brightness-[0.2] dark:grayscale"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
