import { auth as middleware } from '@/auth';

const protectedResources = [
    "/dashboard",
    "/examples",
    "/settings/profile",
    "/settings/password",
    "/settings/appearance",
];
export default middleware((req) => {
    const isLoggedIn = !!req.auth?.user;
    const pathname = req.nextUrl.pathname;

    if (!isLoggedIn && protectedResources.includes(pathname)) {
        return Response.redirect(new URL("/login", req.nextUrl));
    }
    if (isLoggedIn && pathname.startsWith("/login")) {
        return Response.redirect(new URL("/dashboard", req.nextUrl));
    }

})

export const config = {
    // runtime: "nodejs",
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
