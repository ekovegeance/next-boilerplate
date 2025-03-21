import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/prisma"
import Credentials from "next-auth/providers/credentials"
import { loginSchema } from "@/lib/zod"
import { compareSync } from "bcrypt-ts"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: PrismaAdapter(prisma),
    session: { strategy: "jwt",},
    pages: { signIn: "/login" },

    providers: [
        GitHub({
            profile: (profile) => ({
                id: profile.id.toString(), 
                name: profile.name, 
                email: profile.email, 
                image: profile.avatar_url, 
                username: profile.login, 
                role: 'user'
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
                return { ...user, role: user.role || 'user', username: user.username || 'anonymous' };
            },

        }),
    ],
    callbacks: {
        // Make sure the user is authorized to sign in/ Middleware
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const ProtectedRoutes = ["/dashboard", "/account",];

            if (!isLoggedIn && ProtectedRoutes.includes(nextUrl.pathname)) {
                return Response.redirect(new URL("/login", nextUrl));
            }
            if (isLoggedIn && nextUrl.pathname.startsWith("/login")) {
                return Response.redirect(new URL("/dashboard", nextUrl));
            }
            return true;
        },
        jwt({ token, user }) {
            if (user) {
                token.role = user.role
                token.username = user.username
            }
            return token;
        },
        session({ session, token }) {
            session.user.id = token.sub;
            session.user.username = token.username;
            session.user.role = token.role;
            return session;

        },
    }
})