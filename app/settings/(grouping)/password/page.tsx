"use client";

import HeadingSmall from "@/components/heading-small";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";

export default function PasswordPage() {
  return (
    <div className="space-y-6">
      <HeadingSmall
        title="Update password"
        description="Ensure your account is using a long, random password to stay secure"
      />

      <form className="space-y-6">
        <div className="grid gap-2">
          <Label htmlFor="current_password">Current password</Label>

          <Input
            id="current_password"
            // ref={currentPasswordInput}
            value=""
            onChange={() => {}}
            type="password"
            className="mt-1 block w-full"
            autoComplete="current-password"
            placeholder="Current password"
          />

          {/* <InputError message={errors.current_password} /> */}
        </div>

        <div className="grid gap-2">
          <Label htmlFor="password">New password</Label>

          <Input
            id="password"
            // ref={passwordInput}
            // value={data.password}
            // onChange={(e) => setData("password", e.target.value)}
            type="password"
            className="mt-1 block w-full"
            autoComplete="new-password"
            placeholder="New password"
          />

          {/* <InputError message={errors.password} /> */}
        </div>

        <div className="grid gap-2">
          <Label htmlFor="password_confirmation">Confirm password</Label>

          <Input
            id="password_confirmation"
            // value={data.password_confirmation}
            // onChange={(e) => setData("password_confirmation", e.target.value)}
            type="password"
            className="mt-1 block w-full"
            autoComplete="new-password"
            placeholder="Confirm password"
          />

          {/* <InputError message={errors.password_confirmation} /> */}
        </div>

        <div className="flex items-center gap-4">
          <Button>Save password</Button>

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
