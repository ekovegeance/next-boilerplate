"use client";

import { useActionState } from "react";
import { signOut } from "next-auth/react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import HeadingSmall from "@/components/heading-small";
import { deleteUser } from "@/actions/settings.action";
import InputError from "@/components/shared/input-error";
import ButtonSubmit from "@/components/shared/button-submit";
import InputShowPassword from "@/components/shared/input-show-password";


export default function DeleteUser() {
  const [state, action, pending] = useActionState(
    async (prevState: unknown, formData: FormData) => {
      const result = await deleteUser(prevState, formData);

      if (result?.success) return signOut();

      return result;
    },
    null
  );

  return (
    <div className="space-y-6">
      <HeadingSmall
        title="Delete account"
        description="Delete your account and all of its resources"
      />
      <div className="space-y-4 rounded-lg border border-red-100 bg-red-50 p-4 dark:border-red-200/10 dark:bg-red-700/10">
        <div className="relative space-y-0.5 text-red-600 dark:text-red-100">
          <p className="font-medium">Warning</p>
          <p className="text-sm">
            Please proceed with caution, this cannot be undone.
          </p>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button variant="destructive">Delete account</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>
              Are you sure you want to delete your account?
            </DialogTitle>
            <DialogDescription>
              Once your account is deleted, all of its resources and data will
              also be permanently deleted. Please enter your password to confirm
              you would like to permanently delete your account.
            </DialogDescription>
            <form action={action} className="space-y-6">
              <div className="grid gap-2">
                <InputShowPassword label="Password" name="password" />
                <InputError message={state?.errors?.password} />
                {state?.error && <InputError message={[state?.error]} />}
              </div>

              <DialogFooter className="gap-2">
                <DialogClose asChild>
                  <Button variant="secondary">Cancel</Button>
                </DialogClose>
                <ButtonSubmit variant="destructive" submit="Delete account" submitting="Deleting" pending={pending}/>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
