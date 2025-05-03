"use client";
import { useSessionStore } from "../provider/session-provider";
import styles from "../../styles/chat.module.css";

const ChatHeader = () => {
    const session = useSessionStore(state => state.session)

    return (
        <div className={styles.chatHeader}>
            <h1>Chat Page</h1>
            <p>Welcome, {session?.user?.name}</p>
            <div>
                <a href="/">Home</a>
            </div>
        </div>
    );
};

export default ChatHeader; 