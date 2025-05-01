// app/api/session/route.ts
import { NextResponse } from "next/server";

const validToken =
    "1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef";

export async function GET(request: Request) {
    // 쿠키 스토어에서 토큰 가져오기
    const authHeader = request.headers.get("authorization") || "";
    const token = authHeader.replace(/^Bearer\s+/, "");
    console.log("token(from header):", token);

    // 토큰 없거나 잘못됐으면 401 JSON 반환
    if (!token) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    if (token !== validToken) {
        return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }

    // 정상 응답: 반드시 NextResponse.json() 사용
    return NextResponse.json({
        user: { id: 1, name: "홍길동" },
        locale: "ko"
    });
}
