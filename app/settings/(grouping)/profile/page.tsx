"use client";

import { useActionState } from "react";
import { updateProfile } from "@/actions/settings.action";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSession } from "next-auth/react";
import InputError from "@/components/stocks/input-error";
import ButtonSubmit from "@/components/stocks/button-submit";

export default function ProfilePage() {
  const { data: session, update } = useSession();

  const [state, formAction] = useActionState(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async (prevState: any, formData: FormData) => {
      const result = await updateProfile(prevState, formData);

      if (result?.success && result?.user) {
        await update({
          user: {
            ...session?.user,
            name: result?.user?.name,
            email: result?.user?.email,
          },
        });
      }
      return result;
    },
    null
  );

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Profile Information</h2>
      <p className="text-gray-600">Update your name and email address</p>

      <form action={formAction} className="space-y-6">
        <div className="grid gap-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            type="text"
            name="name"
            defaultValue={session?.user?.name || ""}
          />
          <InputError message={state?.errors?.name} />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="email">Email address</Label>
          <Input
            id="email"
            type="email"
            name="email"
            defaultValue={session?.user?.email || ""}
          />
          <InputError message={state?.errors?.email} />
        </div>
        {state?.error && (
          <InputError
            message={Array.isArray(state.error) ? state.error : [state.error]}
          />
        )}
       
        <div className="flex flex-row gap-2 items-center">
        <ButtonSubmit submit="Save" submitting="Saving" />
        {state?.success && (
          <p className="text-muted-foreground text-sm">Saved</p>
        )}
        </div>
      </form>
    </div>
  );
}
