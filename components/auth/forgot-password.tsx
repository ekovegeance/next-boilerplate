"use client";

import { useActionState, useState } from "react";
import { forgotPassword } from "@/actions/auth.action";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle } from "lucide-react";
import SubmitButton from "@/components/shared/button-submit";
export default function ForgotPassword() {
  const [state, formAction] = useActionState(forgotPassword, null);
  const [email, setEmail] = useState("");

  return (
    <>
      <form action={formAction} className="space-y-2">
        {state?.success && (
          <div  className="mb-4 text-center text-sm font-medium text-green-600">
            <span>A reset link will be sent if the account exists.</span>
          </div>
        )}
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        {state?.error && (
          <div className="flex items-center space-x-2 text-red-500">
            <AlertCircle size={20} />
            <span>
              {typeof state.error === "string"
                ? state.error
                : state.error.email}
            </span>
          </div>
        )}

        <SubmitButton
          submitting="Email password reset link"
          submit="Email password reset link"
        />
      </form>
    </>
  );
}
