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
}: {
  submitting: React.ReactNode;
  submit: React.ReactNode;
  pending?: boolean;
}) {
  return (
    <Button disabled={pending} type="submit">
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
