import Env from "@/constants/env";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function auth() {
    const cookie = await cookies();
    const token = cookie.get("access_token")?.value;
    if (!token) {
        return null;
    }
    console.log("token:", token);
    const url = `${Env.API_URL || ""}/api/session`;
    console.log("🔗 Fetching:", url);
    const res = await fetch(url, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        cache: "no-store" // 매번 fresh 요청
    });
    console.log("auth Response:", res.status, res.statusText);
    if (res.status === 401) {
        console.log("Unauthorized access, redirecting to login...");
        redirect("/login");
    }
    if (!res.ok) {
        return null;
    }

    try {
        const data = await res.json();
        return {
            user: data.user, // 예시: { name: '홍길동' }
            locale: data.locale // 예시: 'ko', 'en'
        };
    } catch (e) {
        console.error("auth: JSON parse error", e);
        return null;
    }
}
