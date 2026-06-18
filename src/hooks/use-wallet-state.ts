// src/hooks/use-wallet-state.ts
// PZQQET-Axiom: Reaktiver Zustand (Single Source of Truth)
// Zweck: Zentraler Zugriff auf den Login-Status und die Wallet-Adresse für alle UI-Komponenten

import { useState, useEffect } from 'react';

export const useWalletState = () => {
    // Zentraler Zustand
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [address, setAddress] = useState<string | null>(null);
    const [connections, setConnections] = useState<any[]>([]);

    // Logik bei Login-Erfolg
    const login = (userAddress: string) => {
        setIsLoggedIn(true);
        setAddress(userAddress);
        console.log("[@RFOF-NETWORK] Wallet-Status: EINGELOGGT");
    };

    // Logik bei Logout
    const logout = () => {
        setIsLoggedIn(false);
        setAddress(null);
        setConnections([]);
        console.log("[@RFOF-NETWORK] Wallet-Status: AUSGELOGGT");
    };

    // Verbindung verwalten (Hinzufügen/Entfernen)
    const addConnection = (conn: any) => {
        setConnections((prev) => [...prev, conn]);
    };

    const removeConnection = (id: string) => {
        setConnections((prev) => prev.filter((c) => c.id !== id));
    };

    return {
        isLoggedIn,
        address,
        connections,
        login,
        logout,
        addConnection,
        removeConnection
    };
};

console.log("Hooks: useWalletState initialisiert.");