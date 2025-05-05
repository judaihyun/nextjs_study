import Env from "@/constants/env";
import Cookies from "js-cookie";

type FetchWithAuthOptions = {
    method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
    params?: Record<string, any>; // 항상 쿼리스트링
    body?: any; // 항상 body
    headers?: Record<string, string>;
    signal?: AbortSignal;
};

/**
 * 인증 토큰을 자동으로 헤더에 추가하고,
 * 401(Unauthorized) 발생 시 자동으로 /login으로 리다이렉트하는 fetch 래퍼 함수
 */
export async function fetchWithAuth<T>(
    endpoint: string,
    options: FetchWithAuthOptions = {}
): Promise<T> {
    const token = Cookies.get("access_token");

    let url = `${Env.API_URL || ""}/api${endpoint}`;
    if (options.params) {
        const qs = new URLSearchParams(options.params).toString();
        if (qs) url += (url.includes("?") ? "&" : "?") + qs;
    }

    let fetchBody: any = undefined;
    if (options.body) {
        fetchBody = JSON.stringify(options.body);
    }

    const res = await fetch(url, {
        method: options.method || "GET",
        headers: {
            ...(token && { Authorization: `Bearer ${token}` }),
            "Content-Type": "application/json",
            Accept: "application/json",
            ...(options.headers || {})
        },
        body: fetchBody,
        signal: options.signal,
        cache: "no-store"
    });

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
