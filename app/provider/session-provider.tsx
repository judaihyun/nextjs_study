"use client";

import React, { createContext, useContext, ReactNode } from 'react';

// 세션 타입 정의
interface User {
    id: number;
    name: string;
}

export interface Session {
    user: User;
    locale: string;
}

interface SessionContextValue {
    session: Session | null;
}

// 기본값 null 세션
const SessionContext = createContext<SessionContextValue>({ session: null });

// Context 사용 훅
export function useSession() {
    return useContext(SessionContext);
}

// Provider 컴포넌트
interface SessionProviderProps {
    session: Session | null;
    children: ReactNode;
}

export function SessionProvider({ session, children }: SessionProviderProps) {
    return (
        <SessionContext.Provider value={{ session }}>
            {children}
        </SessionContext.Provider>
    );
}
