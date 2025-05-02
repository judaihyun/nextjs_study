"use client";
import { useRef, useState } from "react";
import { useSession } from "../../provider/session-provider";
import MessageList from "./MessageList";
import ChatInput from "./ChatInput";
import ChatHeader from "./ChatHeader";
import styles from "../../styles/chat.module.css";
import client from "../../lib/api/client";

type Message = {
    type: "user" | "assistant";
    content: string;
    delay?: number;
};

const ChatContainer = () => {
    const { session } = useSession();
    const abortController = useRef<AbortController | null>(null);
    const [messages, setMessages] = useState<Message[]>([
        {
            type: "assistant",
            content: "안녕하세요. 무엇을 도와드릴까요?"
        }
    ]);
    const [executionTime, setExecutionTime] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        abortController.current?.abort();
        const controller = new AbortController();
        abortController.current = controller;
        const startTime = performance.now();
        setIsLoading(true);
        setExecutionTime(null);
        setMessages(prev => [
            ...prev,
            {
                type: "user",
                content: "새로운 질문입니다."
            }
        ]);
        await main(controller.signal, startTime);
    };

    const main = async (signal: AbortSignal, startTime: number) => {
        const apis = [
            client.analysisGuide,
            client.sqlGeneration,
            client.insights
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
        <div className={styles.chatContainer}>
            <ChatHeader />
            <MessageList messages={messages} />
            <ChatInput
                onSubmit={handleSubmit}
                isLoading={isLoading}
                onAbort={() => abortController.current?.abort()}
            />
            {executionTime !== null && (
                <div className={styles.executionTime}>
                    <strong>전체 실행 시간:</strong> {executionTime.toFixed(2)}ms
                </div>
            )}
        </div>
    );
};

export default ChatContainer; 