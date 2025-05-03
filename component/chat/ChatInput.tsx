"use client";
import Button from "../common/Button";
import styles from "../../styles/chat.module.css";

interface ChatInputProps {
    onSubmit: (e: React.FormEvent) => void;
    isLoading: boolean;
    onAbort: () => void;
    executionTime: number | null;
}

const ChatInput = ({ onSubmit, isLoading, onAbort, executionTime }: ChatInputProps) => {
    return (
        <div className="p-5 bg-white rounded-lg shadow">
            <button
                onClick={onSubmit}
                disabled={isLoading}
                className="px-4 py-2 rounded bg-blue-500 text-white cursor-pointer text-sm transition-colors hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed mr-2.5"
            >
                {isLoading ? '처리 중...' : 'Submit'}
            </button>
            <button
                onClick={onAbort}
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
    );
};

export default ChatInput; 