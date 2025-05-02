"use client";
import { ButtonHTMLAttributes } from "react";
import styles from "../../styles/chat.module.css";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
}

const Button = ({ className = "", children, ...props }: ButtonProps) => {
    return (
        <button
            className={`${styles.button} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button; 