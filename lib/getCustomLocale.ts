import { cookies } from "next/headers";

async function getCustomLocale(): Promise<string> {
    const cook = await cookies();
    const token = cook.get("access_token")?.value;
    if (!token) {
        return "ko"; // 로그인 전 기본 로케일
    }

    const origin = `${process.env.NEXT_PUBLIC_BASE_URL}`;
    const res = await fetch(`${origin}/api/session`, {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json"
        },
        cache: "no-store"
    });
    console.log("getCustomLocale: Response:", res.status, res.statusText);
    if (!res.ok) {
        return "ko"; // 요청 실패 시에도 기본값
    }
    const { locale } = (await res.json()) as { locale: string };
    return locale;
}

export default getCustomLocale;
