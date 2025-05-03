// src/lib/api.ts
import Cookies from "js-cookie";
import { AnalysisResult } from "@/types/types";

async function fetchWithAuth<T>(
    endpoint: string,
    signal?: AbortSignal
): Promise<T> {
    const token = Cookies.get("access_token");
    const url = `${process.env.NEXT_PUBLIC_BASE_URL || ""}/api${endpoint}`;

    const res = await fetch(url, {
        method: "GET",
        headers: {
            ...(token && { Authorization: `Bearer ${token}` }),
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        signal,
        cache: "no-store"
    });

    // 인증 실패 시 공통 처리
    if (res.status === 401) {
        // 클라이언트 사이드 전체 리다이렉트
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

// 이제 개별 함수는 단순히 endpoint만 넘기면 끝!
export const analysisGuide = (signal: AbortSignal) =>
    fetchWithAuth<AnalysisResult>("/fake/analysis", signal);

export const sqlGeneration = (signal: AbortSignal) =>
    fetchWithAuth<AnalysisResult>("/fake/sql", signal);

export const insights = (signal: AbortSignal) =>
    fetchWithAuth<AnalysisResult>("/fake/insights", signal);

export default { analysisGuide, sqlGeneration, insights };
