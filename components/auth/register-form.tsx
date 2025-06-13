"use client";

import Link from "next/link";
import { useActionState } from "react";

import { TriangleAlert } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import InputError from "@/components/shared/input-error";
import { registerCredentials } from "@/actions/auth.action";
import ButtonSubmit from "@/components/shared/button-submit";
import InputStrongPassword from "@/components/shared/input-strong-password";
import InputShowPassword from "@/components/shared/input-show-password";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function RegisterForm() {
  const [state, action, pending] = useActionState(registerCredentials, null);

  return (
    <form action={action} className="flex flex-col gap-8">
      {state?.message && (
        <Alert variant="destructive" className="my-3">
          <TriangleAlert />
          <AlertTitle className="font-semibold">Whoops!</AlertTitle>
          <AlertDescription>{state.message}</AlertDescription>
        </Alert>
      )}
      <div className="flex flex-col gap-6">
        <div className="grid gap-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" type="text" placeholder="Full name" />
          <InputError message={state?.error?.name} />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="m@example.com"
          />
          <InputError message={state?.error?.email} />
        </div>
        <div className="grid gap-2">
          <InputStrongPassword label="Password" name="password" />
          <InputError className="-mt-4" message={state?.error?.password} />
        </div>
        <div className="grid gap-2">
          <InputShowPassword
            label="Confirm password"
            id="confirmPassword"
            name="confirmPassword"
          />
          <InputError message={state?.error?.confirmPassword} />
        </div>
        <ButtonSubmit submit={"Create account"} submitting={"Creating"} pending={pending} />
      </div>

      <div className="text-muted-foreground text-center text-sm">
        Have an account?{" "}
        <Link href="/login" className="underline">
          Login
        </Link>
      </div>
    </form>
  );
}
