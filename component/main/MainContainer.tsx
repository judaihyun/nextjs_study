'use client'
import Link from "next/link";
import { useSessionStore } from "../provider/session-provider";

export default function MainContainer() {
    const session = useSessionStore(state => state.session)
    return (
        <div className="p-8 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Protected Home 화면입니다.</h1>
            <p className="mb-6 p-4 bg-gray-100 rounded-lg text-gray-600">
                session: {JSON.stringify(session)}
            </p>
            <div className="flex flex-col gap-4">
                <Link
                    href="/chat/new"
                    className="inline-block px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors w-fit"
                >
                    new chat
                </Link>
                <Link
                    href="/chat/23423"
                    className="inline-block px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors w-fit"
                >
                    [history] chat/234
                </Link>
            </div>
        </div>
    );
}

