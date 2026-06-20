// src/store/wallet-store.ts
// PZQQET-Axiom: Das zentrale Gedächtnis
// Zweck: Persistente Speicherung des Session-Status, der aktiven Verbindungen 
// und der operativen Asset-Daten.

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface WalletState {
    // Authentifizierung & Identität
    isLoggedIn: boolean;
    address: string | null;
    
    // Netzwerk-Status
    connections: { id: string, type: string, address: string }[];
    balance: Record<string, number>; // Mapping: { 'TON': 100, 'BTC': 0.5 }
    
    // Status für das UI-Dispatcher-System
    currentAction: string | null;
    
    // Aktionen zur Zustandsänderung (Mutationen)
    setLogin: (status: boolean, address: string | null) => void;
    addConnection: (conn: { id: string, type: string, address: string }) => void;
    removeConnection: (id: string) => void;
    updateBalance: (symbol: string, amount: number) => void;
    setCurrentAction: (action: string | null) => void;
    resetStore: () => void;
}

export const useWalletStore = create<WalletState>()(
    persist(
        (set) => ({
            isLoggedIn: false,
            address: null,
            connections: [],
            balance: {},
            currentAction: null,

            setLogin: (status, address) => set({ isLoggedIn: status, address }),
            
            addConnection: (conn) => set((state) => ({ 
                connections: [...state.connections, conn] 
            })),
            
            removeConnection: (id) => set((state) => ({ 
                connections: state.connections.filter((c) => c.id !== id) 
            })),
            
            updateBalance: (symbol, amount) => set((state) => ({
                balance: { ...state.balance, [symbol]: amount }
            })),
            
            setCurrentAction: (action) => set({ currentAction: action }),
            
            resetStore: () => set({ 
                isLoggedIn: false, 
                address: null, 
                connections: [], 
                balance: {},
                currentAction: null 
            }),
        }),
        {
            name: 'rfof-wallet-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
);

console.log("Store: Wallet-Gedächtnis vollständig mit Persistenz-Schicht initialisiert.");