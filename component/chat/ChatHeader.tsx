"use client";
import { useSessionStore } from "../provider/session-provider";
import styles from "../../styles/chat.module.css";

const ChatHeader = () => {
    const session = useSessionStore(state => state.session)

    return (
        <div className="mb-5">
            <h1 className="m-0 text-2xl">Chat</h1>
        </div>
    );
};

export default ChatHeader; 