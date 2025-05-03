'use client'
import Link from "next/link";
import { useSessionStore } from "../provider/session-provider";

export default function MainContainer() {
    const session = useSessionStore(state => state.session)
    return (
        <div>
            <h1>Protected Home 화면입니다.</h1>
            <p>session: {JSON.stringify(session)}</p>
            <Link href="/chat/new">new chat</Link>
            <br />
            <Link href="/chat/23423">[history] chat/234</Link>
        </div>
    );
}

