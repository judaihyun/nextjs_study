'use client'
import Link from "next/link";
import { useSession } from "../provider/session-provider";

export default function Home() {

    const { session } = useSession();
    console.log('session:', session);
    return <div>
        <h1>Protected Home 화면입니다.{session?.user.name}</h1>
        <Link href="/chat/new">new chat</Link>
        <br />
        <Link href="/chat/23423">chat/234</Link>
    </div>
}