"use client";

import { useEffect } from "react";

export default function LoginPage() {
    useEffect(() => {
        document.cookie = "access_token=; Max-Age=0; path=/;";
        console.log("LoginPage 렌더링됨");
    }, []);
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        window.location.href =
            "/login-callback?token=1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef";
    };
    return (
        <div>
            <h1>Login Page</h1>
            <form method="POST" action="/api/login" onSubmit={handleSubmit}>
                <input type="text" name="username" placeholder="Username" />
                <input type="password" name="password" placeholder="Password" />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}
