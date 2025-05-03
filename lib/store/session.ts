import { create } from "zustand";
import { createStore } from "zustand/vanilla";

interface User {
    id: number;
    name: string;
}
export interface Session {
    user?: User;
    locale: string;
}

export interface SessionState {
    session: Session | null;
}
export interface SessionActions {
    setSession: (session: Session | null) => void;
}

export type SessionStore = SessionState & SessionActions;

export const defaultSession: Session = {
    user: {
        id: 0,
        name: ""
    },
    locale: "ko"
};

export const createSessionStore = (
    initState: SessionState = { session: defaultSession }
) => {
    return createStore<SessionStore>()(set => ({
        ...initState,
        setSession: (session: Session | null) => set({ session })
    }));
};
