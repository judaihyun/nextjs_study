import Link from "next/link";

export default function Main() {
    return (
        <div>
            <h1>Protected Home 화면입니다.</h1>
            <Link href="/chat/new">new chat</Link>
            <br />
            <Link href="/chat/23423">[history] chat/234</Link>
        </div>
    );
}
