"use client";
import { useSessionStore } from "@/component/provider/session-provider";
import clientApi from "@/lib/client-api/clientApi";
import { useEffect, useRef, useState } from "react";

type Message = {
    type: "user" | "assistant";
    content: string;
    delay?: number;
};

const ChatContainer = () => {
    const { session } = useSessionStore((state) => state);
    const abortController = useRef<AbortController | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const [messages, setMessages] = useState<Message[]>([
        {
            type: "assistant",
            content: "안녕하세요. 무엇을 도와드릴까요?"
        }
    ]);
    const [executionTime, setExecutionTime] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        return () => {
            abortController.current?.abort();
        };
    }, []);

    useEffect(() => {
        const el = containerRef.current;
        if (el) {
            el.scrollTop = el.scrollHeight;
        }
    }, [messages]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        abortController.current?.abort();
        const controller = new AbortController();
        abortController.current = controller;
        const startTime = performance.now();
        setIsLoading(true);
        setExecutionTime(null);
        setMessages([
            ...messages,
            {
                type: "user",
                content: "새로운 질문입니다."
            }
        ]);
        main(controller.signal, startTime);
    };

    const main = async (signal: AbortSignal, startTime: number) => {
        const apis = [
            clientApi.analysisGuide,
            clientApi.sqlGeneration,
            clientApi.insights
        ];
        const results = new Array(apis.length).fill(null);
        let renderedCount = 0;

        const promises = apis.map((apiFn, idx) =>
            apiFn(signal)
                .then(res => {
                    results[idx] = res;
                    while (renderedCount < results.length && results[renderedCount]) {
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
                })
        );

        Promise.allSettled(promises).then(() => {
            const endTime = performance.now();
            const totalTime = endTime - startTime;
            setExecutionTime(totalTime);
            setIsLoading(false);
        });
    };

    return (
        <div className="flex flex-col h-[calc(100vh-2rem)] max-w-3xl mx-auto p-5">
            <div className="mb-5">
                <h1 className="m-0 text-2xl">Chat</h1>
            </div>

            <div
                ref={containerRef}
                className="flex-1 overflow-y-auto p-5 bg-gray-100 rounded-lg mb-5 min-h-0"
            >
                {messages.map((msg, i) => (
                    <div
                        key={i}
                        className={`mb-2.5 p-2.5 rounded ${msg.type === "user"
                            ? "bg-blue-100 ml-auto max-w-[70%]"
                            : "bg-gray-200 mr-auto max-w-[70%]"
                            }`}
                    >
                        <strong>[{msg.type}]</strong> {msg.content}
                        {msg.delay != null && <em> ({msg.delay}ms)</em>}
                    </div>
                ))}
            </div>

            <div className="p-5 bg-white rounded-lg shadow">
                <button
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className="px-4 py-2 rounded bg-blue-500 text-white cursor-pointer text-sm transition-colors hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed mr-2.5"
                >
                    {isLoading ? '처리 중...' : 'Submit'}
                </button>
                <button
                    onClick={() => abortController.current?.abort()}
                    className="px-4 py-2 rounded bg-red-500 text-white cursor-pointer text-sm transition-colors hover:bg-red-600"
                >
                    Abort
                </button>

                {executionTime !== null && (
                    <div className="mt-2.5 p-2.5 bg-gray-100 rounded text-sm text-gray-600">
                        <strong>전체 실행 시간:</strong> {executionTime.toFixed(2)}ms
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChatContainer;
