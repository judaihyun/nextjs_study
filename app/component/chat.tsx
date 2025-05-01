"use client";
import { useEffect, useRef, useState } from "react";
import { useSession } from "../provider/session-provider";
import Cookies from "js-cookie";
import styled from "styled-components";
import client from "@/lib/client";

type Message = {
    type: "user" | "assistant";
    content: string;
    delay?: number;
};

type AnalysisResult = {
    data: string;
    delay: number;
};

const Chat = () => {
    const { session } = useSession();
    const abortController = useRef<AbortController | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const [messages, setMessages] = useState<Message[]>([
        {
            type: "assistant",
            content: "안녕하세요. 무엇을 도와드릴까요?"
        }
    ]);

    useEffect(() => {
        fetchSession();
        return () => {
            abortController.current?.abort();
        };
    }, []);

    useEffect(() => {
        const el = containerRef.current;
        if (el) {
            // 부드럽게 스크롤하려면 scrollTo 대신 scrollIntoView 도 사용 가능
            el.scrollTop = el.scrollHeight;
        }
    }, [messages]);

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
        console.log("🔗 Response:", res.status, res.statusText);
        if (res.status === 401) {
            console.log("Unauthorized access, redirecting to login...");
            window.location.href = "/login";
        }
    };
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        abortController.current?.abort();
        const controller = new AbortController();
        abortController.current = controller;
        setMessages([
            ...messages,
            {
                type: "user",
                content: "새로운 질문입니다."
            }
        ]);
        main(controller.signal);
    };

    const main = async (signal: AbortSignal) => {
        // const analysis = await client.analysisGuide(signal);
        // setMessage(prev => [
        //     ...prev,
        //     { type: "assistant", content: analysis.data, delay: analysis.delay }
        // ]);

        // const sql = await client.sqlGeneration(signal);
        // setMessage(prev => [
        //     ...prev,
        //     { type: "assistant", content: sql.data, delay: sql.delay }
        // ]);

        // const insights = await client.insights(signal);
        // setMessage(prev => [
        //     ...prev,
        //     { type: "assistant", content: insights.data, delay: insights.delay }
        // ]);

        const apis: ((signal: AbortSignal) => Promise<AnalysisResult>)[] = [
            client.analysisGuide,
            client.sqlGeneration,
            client.insights
        ];
        const results: (AnalysisResult | null)[] = new Array(apis.length).fill(
            null
        );
        let renderedCount = 0;

        // 각 API를 병렬 호출하면서 순차 언락 렌더링
        apis.forEach((apiFn, idx) => {
            apiFn(signal)
                .then(res => {
                    results[idx] = res;
                    // 앞 순서가 모두 채워졌다면 연속으로 렌더
                    while (
                        renderedCount < results.length &&
                        results[renderedCount]
                    ) {
                        const { data, delay } = results[renderedCount]!;
                        setMessages(prev => [
                            ...prev,
                            { type: "assistant", content: data, delay }
                        ]);
                        renderedCount++;
                    }
                })
                .catch(err => {
                    if (err.name === "AbortError") {
                        console.log(`API ${idx} aborted`);
                    } else {
                        console.error(`API ${idx} error:`, err);
                        setMessages(prev => [
                            ...prev,
                            {
                                type: "assistant",
                                content: `API ${idx} 오류 발생`
                            }
                        ]);
                        renderedCount++;
                    }
                });
        });
    };

    return (
        <div>
            <h1>Chat Page</h1>
            <p>This is the chat page.{session?.user.name}</p>
            <div>
                <a href="/">Home</a>
            </div>
            <MessageBox ref={containerRef}>
                {messages.map((msg, i) => (
                    <div key={i} className={msg.type}>
                        <strong>[{msg.type}]</strong> {msg.content}
                        {msg.delay != null && <em> ({msg.delay}ms)</em>}
                    </div>
                ))}
            </MessageBox>
            <button onClick={handleSubmit}>Submit</button>
            <button onClick={() => abortController.current?.abort()}>
                Abort
            </button>
        </div>
    );
};

const MessageBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    width: 100%;
    height: 30vh;
    overflow-y: auto;
    background-color: #f0f0f0;
    border-radius: 8px;
    padding: 16px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    margin: 16px 0;
    font-size: 16px;
    color: #333;
    font-family: "Arial", sans-serif;
    font-weight: 400;
    line-height: 1.5;
    text-align: center;
    transition: all 0.3s ease;
`;

export default Chat;
