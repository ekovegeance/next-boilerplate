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

export function RegisterForm() {
  const [state, formAction] = useActionState(registerCredentials, null);

  return (
    <>
      <form action={formAction}>
        <div className="space-y-6">
          {state?.message && (
            <Alert variant="destructive" className="my-3">
              <TriangleAlert />
              <AlertTitle className="font-semibold">Woops!</AlertTitle>
              <AlertDescription>{state.message}</AlertDescription>
            </Alert>
          )}
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" type="text" placeholder="John Doe" />
              <InputError message={state?.error?.name} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="m@example.com"
              />
              <InputError message={state?.error?.email} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" />
              <InputError message={state?.error?.password} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
              />
              <InputError message={state?.error?.confirmPassword} />
            </div>
            <ButtonSubmit submitting={"Registering"} submit={"Register"} />
          </div>
        </div>
      </form>
      <div className="mt-4 text-center text-sm">
        Have an account?{" "}
        <Link href="login" className="underline">
          Login
        </Link>
      </div>
    </>
  );
}
