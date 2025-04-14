"use client";

import { cn } from "@/lib/utils";
import { GalleryVerticalEnd } from "lucide-react";

export default function AppLogoIcon({
  className,
  ...props
}: {
  className?: string;
}) {
  return <GalleryVerticalEnd className={cn(className)} {...props} />;
}
