import NextAuth, { NextAuthConfig } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import Credentials from "next-auth/providers/credentials";
import { loginSchema } from "@/lib/schemas/auth";
import { compareSync } from "bcrypt-ts";

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: PrismaAdapter(prisma) as NextAuthConfig["adapter"],
    session: { strategy: "jwt" },
    basePath: "/api/auth",
    pages: { signIn: "/login" },
    providers: [
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
                };
            },
        }),
    ],
    callbacks: {
        jwt({ token, trigger, user, session }) {
            if (trigger === "update" && session?.user) {
                token.name = session.user.name;
                token.avatar = session.user.avatar;
                token.email = session.user.email;
            }
            if (user) {
                token.sub = user.id ?? '';
                token.avatar = user.avatar ?? '';
                token.email = user.email ?? '';
            }
            return token;
        },
        session({ session, token }) {
            if (session.user) {
                session.user.id = token.sub!;
                session.user.avatar = token.avatar as string;
                session.user.email = token.email ?? '';
            }
            return session;
        }
    },
});
