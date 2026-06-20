// src/utils/formatters.ts
// PZQQET-Axiom: Human-Readable Translation Layer
// Zweck: Transformation von kryptographischen Rohdaten in konsumierbare Finanzwerte

import { ethers } from 'ethers';

export const Formatters = {
    /**
     * Wandelt Wei-Beträge (BigInt/String) in ein lesbares Format um.
     * Standard für EVM-Token sind 18 Dezimalstellen.
     */
    fromWei: (value: string | bigint, decimals: number = 18): string => {
        try {
            return ethers.formatUnits(value, decimals);
        } catch (error) {
            console.error("[Formatter] Fehler bei der Wei-Konvertierung:", error);
            return "0.00";
        }
    },

    /**
     * Formatiert Zahlen für die UI (z.B. Adress-Kürzung).
     */
    truncateAddress: (address: string | null): string => {
        if (!address) return "---";
        return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
    },

    /**
     * Wandelt rohe Netzwerk-Beträge in saubere Währungsanzeigen um.
     */
    toCurrency: (value: number | string, symbol: string = ""): string => {
        const num = typeof value === 'string' ? parseFloat(value) : value;
        return `${num.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 4,
        })} ${symbol}`;
    }
};

console.log("Utils: Formatters-System für menschenlesbare Daten initialisiert.");