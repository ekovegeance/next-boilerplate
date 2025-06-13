"use client";

import Link from "next/link";
import {useActionState} from "react";
import {useSearchParams} from "next/navigation";

// import {
//   LoginWithGithub,
//   LoginWithGoogle,
// } from "@/components/stocks/button-oauth";
import {TriangleAlert} from "lucide-react";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import InputError from "@/components/shared/input-error";
import {loginCredentials} from "@/actions/auth.action";
import ButtonSubmit from "@/components/shared/button-submit";
import InputShowPassword from '@/components/shared/input-show-password';
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert";


export function LoginForm() {
    const searchParams = useSearchParams(); // Hook for getting the search parameters
    const error = searchParams?.get("error"); // Get the error from the search parameters

    const [state, action, pending] = useActionState(loginCredentials, null);

    return (
        <form className="flex flex-col gap-6" action={action}>
            <div className="grid gap-6">
                {error === "OAuthAccountNotLinked" ? (
                    <Alert variant="destructive" className="my-3">
                        <TriangleAlert/>
                        <AlertTitle className="font-semibold">{error}</AlertTitle>
                        <AlertDescription>
                            Account already use by other provider
                        </AlertDescription>
                    </Alert>
                ) : null}
                {state?.message && (
                    <Alert variant="destructive" className="my-3">
                        <TriangleAlert/>
                        <AlertTitle className="font-semibold">Whoops!</AlertTitle>
                        <AlertDescription>{state.message}</AlertDescription>
                    </Alert>
                )}

                <div className="grid gap-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="m@example.com"
                        name="email"
                    />
                    <InputError message={state?.error?.email}/>
                </div>

                <div className="grid gap-2">
                    <InputShowPassword label="Password" name="password"/>
                    <InputError message={state?.error?.password}/>
                    <Link
                        href="/forgot-password"
                        className="ml-auto inline-block text-sm underline"
                    >
                        Forgot password?
                    </Link>
                </div>

                <ButtonSubmit submit="Login" submitting="Login" pending={pending}/>

                {/* Oauth login */}
                {/* <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="relative z-10 bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <LoginWithGithub />
          <LoginWithGoogle />
        </div> */}

                <div className="mt-4 text-center text-sm grid grid-rows-1 gap-2">
                    <p className="text-muted-foreground"> Don&apos;t have an account?</p>
                    <Link href="/register" className="underline">
                        Sign up with Credentials
                    </Link>
                </div>
            </div>
        </form>
    );
}
