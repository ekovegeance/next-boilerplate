"use client";

import { updateProfile } from "@/actions/settings.action";
import HeadingSmall from "@/components/heading-small";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useActionState } from "react";
import InputError from '@/components/stocks/input-error';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { TriangleAlert } from "lucide-react";
import { useSession } from "next-auth/react";
import { Transition } from '@headlessui/react';



export default   function ProfilePage() {

const  {data: session} = useSession();

  const [state, formAction] = useActionState(updateProfile, null);

  return (
    <div className="space-y-6">
      <HeadingSmall
        title="Profile information"
        description="Update your name and email address"
      />

      <form action={formAction} className="space-y-6">
      {state?.message && (
          <Alert variant="destructive" className="my-3">
            <TriangleAlert />
            <AlertTitle className="font-semibold">Woops!</AlertTitle>
            <AlertDescription>{state.message}</AlertDescription>
          </Alert>
        )}
        <div className="grid gap-2">
          <Label htmlFor="name">Name</Label>

          <Input
            id="name"
            type="text"
            name="name"
            className="mt-1 block w-full"
            required
            autoComplete="name"
            placeholder="Name"
           defaultValue={session?.user?.name ?? ''}
          />

          <InputError className="mt-2" message={state?.error?.name} />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="email">Email address</Label>

          <Input
            id="email"
            type="email"
            name="email"
            className="mt-1 block w-full"
            required
            autoComplete="username"
            placeholder="Email address"
            defaultValue={session?.user?.email ?? ''}
          />

          <InputError className="mt-2" message={state?.error?.email} />
        </div>

        <div className="flex items-center gap-4">
          <Button>Save</Button>
          <Transition
                show={state?.success === "updated"}
                enter="transition ease-in-out"
                enterFrom="opacity-0"
                leave="transition ease-in-out"
                leaveTo="opacity-0"
            >
                <p className="text-sm text-neutral-600">Saved</p>
            </Transition>
        </div>
      </form>
    </div>
  );
}
