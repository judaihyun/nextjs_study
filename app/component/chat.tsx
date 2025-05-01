'use client'
import { useEffect } from "react";
import { useSession } from "../provider/session-provider";
import Cookies from 'js-cookie';

const Chat = () => {

    const { session } = useSession();

    useEffect(() => {
        // fetchSession();
    }, [])
    const fetchSession = async () => {
        const url = `${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/session`;
        const token = Cookies.get("access_token");
        console.log("token:", token);
        const res = await fetch(url, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            cache: "no-store" // 매번 fresh 요청
        });
        console.log("🔗 Response:", res.status, res.statusText)
        if (res.status === 401) {
            console.log('Unauthorized access, redirecting to login...');
            window.location.href = '/login';
        }
    };
    return (
        <div>
            <h1>Chat Page</h1>
            <p>This is the chat page.{session.user.name}</p>
            <div>
                <a href="/">Home</a>
            </div>
            <div>
                <a href='/server-chat'>server Chat</a>
            </div>
        </div>
    );
}

export default Chat;