import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
    const token = request.cookies.get("access_token")?.value;
    const { pathname } = request.nextUrl;

    // 로그인/콜백 페이지는 예외 처리
    if (pathname === "/login" || pathname === "/login-callback") {
        return NextResponse.next();
    }

    if (!token) {
        const loginUrl = new URL("/login", request.url);
        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!login|_next/|favicon\\.ico|api/).*)"]
};
