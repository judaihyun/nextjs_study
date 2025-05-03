'use client'

import { createSessionStore, SessionState, SessionStore } from '@/lib/store/session'
import { type ReactNode, createContext, useRef, useContext } from 'react'
import { useStore, type StoreApi } from 'zustand'

export type SessionStoreApi = ReturnType<typeof createSessionStore>

export const SessionStoreContext = createContext<SessionStoreApi | undefined>(
    undefined,
)

export interface SessionStoreProviderProps {
    children: ReactNode
    initialState: SessionState
}

export const SessionStoreProvider = ({
    children,
    initialState
}: SessionStoreProviderProps) => {
    const storeRef = useRef<SessionStoreApi | null>(null)
    if (storeRef.current === null) {
        storeRef.current = createSessionStore(initialState)
    }

    return (
        <SessionStoreContext.Provider value={storeRef.current}>
            {children}
        </SessionStoreContext.Provider>
    )
}

export const useSessionStore = <T,>(
    selector: (store: SessionStore) => T,
): T => {
    const store = useContext(SessionStoreContext)

    if (!store) {
        throw new Error(`useSessionStore must be used within SessionStoreProvider`)
    }

    return useStore(store, selector)
}
