import Env from "@/constants/env";
import Cookies from "js-cookie";

/**
 * 인증 토큰을 자동으로 헤더에 추가하고,
 * 401(Unauthorized) 발생 시 자동으로 /login으로 리다이렉트하는 fetch 래퍼 함수
 */
export async function fetchWithAuth<T>(
    endpoint: string,
    options: RequestInit = {},
    signal?: AbortSignal
): Promise<T> {
    const token = Cookies.get("access_token");
    const url = `${Env.API_URL || ""}/api${endpoint}`;

    const res = await fetch(url, {
        ...options,
        headers: {
            ...(token && { Authorization: `Bearer ${token}` }),
            "Content-Type": "application/json",
            Accept: "application/json",
            ...(options.headers || {})
        },
        signal,
        cache: "no-store"
    });

    // 인증 실패 시 공통 처리
    if (res.status === 401) {
        if (typeof window !== "undefined") {
            window.location.href = "/login";
        }
        throw new Error("Unauthorized");
    }

    if (!res.ok) {
        const text = await res.text();
        throw new Error(text || res.statusText);
    }

    return res.json();
}
