"use client";
import { useEffect, useRef } from "react";
import MessageItem from "./MessageItem";

export type Message = {
    type: "user" | "assistant";
    content: string;
    delay?: number;
};

export interface MessageListProps {
    messages: Message[];
}

const MessageList = ({ messages }: MessageListProps) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = containerRef.current;
        if (el) {
            el.scrollTop = el.scrollHeight;
        }
    }, [messages]);

    return (
        <div
            ref={containerRef}
            className="flex-1 overflow-y-auto p-5 bg-gray-100 rounded-lg mb-5 min-h-0"
        >
            {messages.map((msg, i) => (
                <MessageItem
                    key={i}
                    type={msg.type}
                    content={msg.content}
                    delay={msg.delay}
                />
            ))}
        </div>
    );
};

export default MessageList; 