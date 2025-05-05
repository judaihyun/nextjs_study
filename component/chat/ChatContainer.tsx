"use client";
import { useSessionStore } from "@/component/provider/session-provider";
import clientApi from "@/lib/client-api/clientApi";
import { useEffect, useRef, useState } from "react";
import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";
import ChatInput from "./ChatInput";

type Message = {
    type: "user" | "assistant";
    content: string;
    delay?: number;
};

const ChatContainer = () => {
    const { session } = useSessionStore(state => state);
    const abortController = useRef<AbortController | null>(null);

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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        abortController.current?.abort();
        const controller = new AbortController();
        abortController.current = controller;
        setIsLoading(true);
        setExecutionTime(null);
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
                })
        );

        Promise.allSettled(promises).then(() => {
            setIsLoading(false);
        });
    };

    return (
        <div className="flex flex-col h-[calc(100vh-2rem)] max-w-3xl mx-auto p-5">
            <ChatHeader />
            <MessageList messages={messages} />
            <ChatInput
                onSubmit={handleSubmit}
                isLoading={isLoading}
                onAbort={() => abortController.current?.abort()}
                executionTime={executionTime}
            />
        </div>
    );
};

export default ChatContainer;
