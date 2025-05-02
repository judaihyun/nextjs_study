"use client";
import styles from "../../styles/chat.module.css";

type Message = {
    type: "user" | "assistant";
    content: string;
    delay?: number;
};

interface MessageItemProps {
    message: Message;
}

const MessageItem = ({ message }: MessageItemProps) => {
    return (
        <div className={`${styles.messageItem} ${styles[message.type]}`}>
            <strong>[{message.type}]</strong> {message.content}
            {message.delay != null && <em> ({message.delay}ms)</em>}
        </div>
    );
};

export default MessageItem; 