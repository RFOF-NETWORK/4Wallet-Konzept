// src/blockchain/transaction-helper.ts
// PZQQET-Axiom: Transaktions-Konfektionierung
// Zweck: Erstellung eines validen, netzwerkspezifischen Payload-Pakets

import { ethers } from 'ethers';

export interface TransactionPayload {
    to: string;
    value: string; // Immer als String (Wei/Satoshis)
    data?: string;
    gasLimit?: string;
    chainId?: number;
}

export const TransactionHelper = {
    /**
     * Baut ein Payload-Paket für EVM-basierte Transaktionen (ETH/ARB/etc.)
     */
    buildEVMPayload: (to: string, amount: string, decimals: number = 18): TransactionPayload => {
        return {
            to,
            value: ethers.parseUnits(amount, decimals).toString(),
            // Hier könnten bei Token-Transfers noch die 'data'-Felder für den ERC20-Call ergänzt werden
        };
    },

    /**
     * Baut ein Payload-Paket für Non-EVM (TON/BTC)
     * TON nutzt Messages statt klassischer EVM-Payloads.
     */
    buildNonEVMPayload: (to: string, amount: string): any => {
        return {
            to,
            amount: (parseFloat(amount) * 1e9).toString(), // TON-Konvertierung
            timestamp: Date.now(),
        };
    },

    /**
     * Zentrale Validierung: Prüft das Paket auf Plausibilität vor dem Signieren.
     */
    validatePayload: (payload: any): boolean => {
        if (!payload.to || !payload.value) {
            console.error("[@RFOF-NETWORK] Fehler: Payload unvollständig.");
            return false;
        }
        return true;
    }
};

console.log("Blockchain: Transaction-Helper (Payload-Konfektionierung) bereit.");