"use client";
import { useEffect, useRef } from "react";
import MessageItem from "./MessageItem";
import styles from "../../styles/chat.module.css";

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
        <div ref={containerRef} className={styles.messageList}>
            {messages.map((message, index) => (
                <MessageItem key={index} message={message} />
            ))}
        </div>
    );
};

export default MessageList; 