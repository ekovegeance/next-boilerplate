import NextAuth, { NextAuthConfig } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import Credentials from "next-auth/providers/credentials";
import { loginSchema } from "@/lib/zod";
import { compareSync } from "bcrypt-ts";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: PrismaAdapter(prisma) as NextAuthConfig["adapter"],
    session: { strategy: "jwt" },
    basePath: "/api/auth",
    pages: { signIn: "/login" },
    providers: [
        GitHub({
            profile: (profile) => ({
                id: profile.id.toString(),
                name: profile.name,
                email: profile.email,
                avatar: profile.avatar_url ?? "",
                username: profile.login,
                role: "user",
            })
        }),
        Google,
        Credentials({
            credentials: {
                email: {},
                password: {},
            },
            authorize: async (credentials) => {
                const validatedFields = loginSchema.safeParse(credentials);
                if (!validatedFields.success) {
                    return null;
                }
                const { email, password } = validatedFields.data;
                const user = await prisma.user.findUnique({ where: { email } });

                if (!user || !user.password) {
                    throw new Error("No user found");
                }

                const passwordMatch = compareSync(password, user.password);
                if (!passwordMatch) {
                    return null;
                }

                return {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    emailVerified: user.emailVerified,
                    avatar: user.avatar ?? "",
                    username: user.username ?? "anonymous",
                    role: user.role ?? "user",
                };
            },
        }),
    ],
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const ProtectedRoutes = [
                "/dashboard",
                "/account",
                "/settings",
                "/settings/profile",
                "/settings/password",
                "/settings/appearance",
            ];

            if (!isLoggedIn && ProtectedRoutes.includes(nextUrl.pathname)) {
                return Response.redirect(new URL("/login", nextUrl));
            }
            if (isLoggedIn && nextUrl.pathname.startsWith("/login")) {
                return Response.redirect(new URL("/dashboard", nextUrl));
            }
            return true;
        },

        jwt({ token, trigger, user, session }) {
            if (trigger === "update" && session?.user) {
                token.name = session.user.name;
                token.username = session.user.username;
                token.role = session.user.role;
                token.avatar = session.user.avatar;
                token.email = session.user.email;
            }
            if (user) {
                token.sub = user.id ?? '';
                token.role = user.role ?? '';
                token.username = user.username ?? '';
                token.avatar = user.avatar ?? '';
                token.email = user.email ?? '';
            }
            return token;
        },
        session({ session, token }) {
            if (session.user) {
                session.user.id = token.sub!;
                session.user.username = token.username;
                session.user.role = token.role ?? '';
                session.user.avatar = token.avatar ?? '';
                session.user.email = token.email ?? '';
            }
            return session;
        }
    },
});