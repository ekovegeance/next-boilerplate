"use client";

import { useActionState } from "react";
import { useSession } from "next-auth/react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import DeleteUser from "@/components/delete-user";
import HeadingSmall from "@/components/heading-small";
import InputError from "@/components/shared/input-error";
import { updateProfile } from "@/actions/settings.action";
import ButtonSubmit from "@/components/shared/button-submit";

export default function ProfilePage() {
  const { data: session, update } = useSession();

  const [state, action, pending] = useActionState(
    async (prevState: unknown, formData: FormData) => {
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
      <HeadingSmall
        title="Profile information"
        description="Update your name and email address"
      />

      <form action={action} className="space-y-6">
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
          <ButtonSubmit submit="Save" submitting="Saving" pending={pending} />
          {state?.success && (
            <p className="text-muted-foreground text-sm">Saved</p>
          )}
        </div>
      </form>

      <DeleteUser />
    </div>
  );
}
