"use client";
import Button from "../common/Button";
import styles from "../../styles/chat.module.css";

interface ChatInputProps {
    onSubmit: (e: React.FormEvent) => void;
    isLoading: boolean;
    onAbort: () => void;
}

const ChatInput = ({ onSubmit, isLoading, onAbort }: ChatInputProps) => {
    return (
        <div className={styles.chatInput}>
            <form onSubmit={onSubmit}>
                <Button
                    type="submit"
                    disabled={isLoading}
                    className={styles.submitButton}
                >
                    {isLoading ? "처리 중..." : "Submit"}
                </Button>
                <Button
                    type="button"
                    onClick={onAbort}
                    className={styles.abortButton}
                >
                    Abort
                </Button>
            </form>
        </div>
    );
};

export default ChatInput; 