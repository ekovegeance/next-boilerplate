"use client";

import React, { useActionState } from "react";

import HeadingSmall from "@/components/heading-small";
import InputError from "@/components/shared/input-error";
import { updatePassword } from "@/actions/settings.action";
import ButtonSubmit from "@/components/shared/button-submit";
import InputShowPassword from "@/components/shared/input-show-password";
import InputStrongPassword from "@/components/shared/input-strong-password";

export default function PasswordPage() {
  const [state, action, pending] = useActionState(
    async (prevState: unknown, formData: FormData) => {
      const result = await updatePassword(prevState, formData);
      if (result.success) {
        console.log("sukses");
      }
      return result;
    },
    null
  );

  return (
    <div className="space-y-6">
      <HeadingSmall
        title="Update password"
        description="Ensure your account is using a long, random password to stay secure"
      />

      <form action={action} className="space-y-6">
        <div className="grid gap-2">
          <InputShowPassword
            label="Current password"
            name="currentPassword"
            className="mt-1 block w-full"
            autoComplete="current-password"
            placeholder="Current password"
          />

          {state?.error && <InputError message={[state?.error]} />}
          <InputError message={state?.errors?.currentPassword} />
        </div>

        <div className="grid gap-2">
          <InputStrongPassword
            label="New Password"
            name="newPassword"
            className="mt-1 block w-full"
            autoComplete="new-password"
            placeholder="New password"
          />

          <InputError message={state?.errors?.newPassword} />
        </div>

        <div className="grid gap-2">
          <InputShowPassword
            label="Confirm password"
            name="confirmPassword"
            className="mt-1 block w-full"
            autoComplete="new-password"
            placeholder="Confirm password"
          />

          <InputError message={state?.errors?.confirmPassword} />
        </div>

        <div className="flex flex-row gap-2 items-center">
          <ButtonSubmit submit="Save password" submitting="Saving" pending={pending} />
          {state?.success && (
            <p className="text-muted-foreground text-sm">Saved</p>
          )}
        </div>  
      </form>
    </div>
  );
}
