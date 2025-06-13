/* eslint-disable @typescript-eslint/no-unused-vars */
import { type DefaultSession, Session } from "next-auth";

/**
 * Type definitions for NextAuth.js with custom user properties.
 * @see https://authjs.dev/getting-started/typescript
 */
declare module "next-auth" {
    interface User {
        id: string;
        avatar: string;
    }

    interface Session {
        user: User & DefaultSession["user"];
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        sub: string;
        avatar: string;
    }
}
