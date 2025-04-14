"use client";

import React from "react";
import Loading from "@/components/ui/loading";
import { Button } from "@/components/ui/button";

/**
 * Submit button component
 * @description A button component that shows a loading spinner when the form is submitting
 * @default
 * @example
 * ```tsx
 * import SubmitButton from "@/components/stocks/submit-button";
 * <SubmitButton submitting="Submitting..." submit="Submit pending={pending}" />
 * ```
 *
 */

export default function ButtonSubmit({
  submitting,
  submit,
  pending,
  variant,
  size,
  className,
  type = "submit",
}: {
  submitting: React.ReactNode;
  submit: React.ReactNode;
  pending?: boolean;
  variant?:
    | "link"
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | null
    | undefined;
  size?: "sm" | "lg" | "icon" | "default" | undefined;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset" | undefined;
}) {
  return (
    <Button
      size={size}
      variant={variant}
      disabled={pending}
      type={type}
      className={className}
    >
      {pending ? (
        <div className="flex justify-center items-center gap-2">
          <Loading />
          {submitting}
        </div>
      ) : (
        submit
      )}
    </Button>
  );
}
