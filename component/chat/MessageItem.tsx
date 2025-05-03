"use client";
import styles from "../../styles/chat.module.css";

type MessageItemProps = {
    type: "user" | "assistant";
    content: string;
    delay?: number;
};

const MessageItem = ({ type, content, delay }: MessageItemProps) => {
    return (
        <div
            className={`mb-2.5 p-2.5 rounded ${type === "user"
                    ? "bg-blue-100 ml-auto max-w-[70%]"
                    : "bg-gray-200 mr-auto max-w-[70%]"
                }`}
        >
            <strong>[{type}]</strong> {content}
            {delay != null && <em> ({delay}ms)</em>}
        </div>
    );
};

export default MessageItem; 