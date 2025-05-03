import { NextRequest, NextResponse } from "next/server";

const publicRoutes = ["/login", "/login-callback"];
export function middleware(request: NextRequest) {
    const token = request.cookies.get("access_token")?.value;
    const { pathname } = request.nextUrl;

    if (publicRoutes.includes(pathname)) {
        return NextResponse.next();
    }

    if (!token) {
        const loginUrl = new URL("/login", request.nextUrl);
        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!login|_next/|favicon\\.ico|api/).*)"]
};
