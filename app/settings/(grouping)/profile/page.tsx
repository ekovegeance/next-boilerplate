"use client";

import HeadingSmall from "@/components/heading-small";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <HeadingSmall
        title="Profile information"
        description="Update your name and email address"
      />

      <form className="space-y-6">
        <div className="grid gap-2">
          <Label htmlFor="name">Name</Label>

          <Input
            id="name"
            className="mt-1 block w-full"
            value=""
            onChange={() => {}}
            required
            autoComplete="name"
            placeholder="Full name"
          />

          {/* <InputError className="mt-2" message={errors.name} /> */}
        </div>

        <div className="grid gap-2">
          <Label htmlFor="email">Email address</Label>

          <Input
            id="email"
            type="email"
            className="mt-1 block w-full"
            value=""
            onChange={() => {}}
            required
            autoComplete="username"
            placeholder="Email address"
          />

          {/* <InputError className="mt-2" message={errors.email} /> */}
        </div>

        <div className="flex items-center gap-4">
          <Button>Save</Button>

          {/* <Transition
                show={recentlySuccessful}
                enter="transition ease-in-out"
                enterFrom="opacity-0"
                leave="transition ease-in-out"
                leaveTo="opacity-0"
            >
                <p className="text-sm text-neutral-600">Saved</p>
            </Transition> */}
        </div>
      </form>
    </div>
  );
}
