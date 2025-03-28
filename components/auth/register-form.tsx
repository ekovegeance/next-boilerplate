"use client";

import Link from "next/link";
import { TriangleAlert } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { registerCredentials } from "@/actions/auth.action";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useActionState } from "react";
import InputError from "@/components/stocks/input-error";
import ButtonSubmit from "@/components/stocks/button-submit";
import InputShowPassword from "@/components/stocks/input-show-password";
import InputStrongPassword from "../stocks/input-strong-password";

export function RegisterForm() {
  const [state, formAction] = useActionState(registerCredentials, null);

  return (
    <form action={formAction} className="flex flex-col gap-8">
      {state?.message && (
        <Alert variant="destructive" className="my-3">
          <TriangleAlert />
          <AlertTitle className="font-semibold">Woops!</AlertTitle>
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
        <ButtonSubmit submitting={"Create account"} submit={"Create account"} />
      </div>

      <div className="text-muted-foreground text-center text-sm">
        Have an account?{" "}
        <Link href="login" className="underline">
          Login
        </Link>
      </div>
    </form>
  );
}
