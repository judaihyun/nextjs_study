'use client';
import { useEffect } from "react";

export default function LoginCallbackPage() {

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get("token");
        if (token) {
            document.cookie = `access_token=${token}; path=/; max-age=3600`;
            window.location.href = "/";
        }
    }, []);

    return <h1>로그인 콜백 처리 중...</h1>;
}