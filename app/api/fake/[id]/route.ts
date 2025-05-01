// export const runtime = "edge";

import { NextRequest, NextResponse } from "next/server";

// 짧은 Lorem Ipsum 텍스트 리스트 (30자 이내)
const snippets = [
    "Lorem ipsum dolor sit amet",
    "Consectetur adipiscing elit",
    "Sed do eiusmod tempor",
    "Incididunt ut labore et dolore",
    "Magna aliqua",
    "Ut enim ad minim veniam",
    "Quis nostrud exercitation",
    "Ullamco laboris nisi ut aliquip"
];

// AbortSignal을 사용한 지연 함수
function abortableDelay(ms: number, signal: AbortSignal): Promise<void> {
    return new Promise((resolve, reject) => {
        const timer = setTimeout(resolve, ms);
        signal.addEventListener("abort", () => {
            clearTimeout(timer);
            reject(new Error("Request aborted by client"));
        });
    });
}

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> } // ← note Promise<…>
): Promise<NextResponse> {
    const { signal } = request;
    // 랜덤하게 최대 5초(5000ms) 지연
    const delayMs = Math.random() * (7000 - 3000) + 3000;
    const { id } = await params;
    signal.addEventListener(
        "abort",
        () => console.log(`[API ${id}] abort event fired`),
        { once: true }
    );
    try {
        await abortableDelay(delayMs, signal);
    } catch (err) {
        // 클라이언트 취소 시 499 상태로 응답
        return new NextResponse(null, { status: 499 });
    }

    // 랜덤한 텍스트 선택
    const text = snippets[Math.floor(Math.random() * snippets.length)];

    // JSON 응답
    return new NextResponse(
        JSON.stringify({
            data: `[${id}] - ${text}`,
            delay: Math.floor(delayMs)
        }),
        {
            status: 200,
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            }
        }
    );
}
