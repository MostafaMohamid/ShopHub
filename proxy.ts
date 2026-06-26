import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function proxy(req: NextRequest) {
    const token = await getToken({
        req,
        secret: process.env.AUTH_SECRET,
    });

    const { pathname } = req.nextUrl;

    const protectedRoutes = [
        "/cart",
        "/allorders",
        "/checkout",
        "/change-password",
    ];

    const guestRoutes = [
        "/login",
        "/register",
        "/forget-password",
        "/reset-password",
    ];

    if (protectedRoutes.some((route) => pathname.startsWith(route))) {
        if (!token) {
            return NextResponse.redirect(new URL("/login", req.url));
        }
    }

    if (guestRoutes.some((route) => pathname.startsWith(route))) {
        if (token) {
            return NextResponse.redirect(new URL("/", req.url));
        }
    }

    return NextResponse.next();
}

// 👇 Add this here
export const config = {
    matcher: [
        "/cart/:path*",
        "/allorders/:path*",
        "/checkout/:path*",
        "/change-password/:path*",

        "/login/:path*",
        "/register/:path*",
        "/forget-password/:path*",
        "/reset-password/:path*",
    ],
};