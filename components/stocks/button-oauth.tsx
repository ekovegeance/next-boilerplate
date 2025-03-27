// Dependencies: npm install @remixicon/react

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { RiGithubFill, RiGoogleFill } from "@remixicon/react";

/**
 * UI component for login with
 * @see https://originui.com/buttons
 * @returns
 */

// Login with Github
export function LoginWithGithub() {
  return (
    <Button
      variant="outline"
      aria-label="Login with Google"
      onClick={() => signIn("github")}
    >
      <RiGithubFill size={16} aria-hidden="true" />
    </Button>
  );
}

// Login with Google
export function LoginWithGoogle() {
  return (
    <Button
    variant="outline"
    aria-label="Login with Google"
    onClick={() => signIn("google")}
  >
    <RiGoogleFill size={16} aria-hidden="true" />
  </Button>
  );
}
