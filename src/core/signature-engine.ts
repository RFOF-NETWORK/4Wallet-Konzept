// src/core/signature-engine.ts
// PZQQET-Axiom: Mathematische Signatur-Isolierung
// Zweck: Erzeugt und verifiziert kryptografische Signaturen ohne externe Abhängigkeiten

import { ethers } from 'ethers';

export interface SignatureRequest {
    message: string;
    privateKey: string;
}

/**
 * Signiert eine Nachricht lokal. 
 * Dies ist der Kern der Transaktions-Autorisierung.
 */
export const signData = async (request: SignatureRequest): Promise<string> => {
    try {
        const wallet = new ethers.Wallet(request.privateKey);
        const signature = await wallet.signMessage(request.message);
        
        console.log("[SignatureEngine] Daten erfolgreich signiert.");
        return signature;
    } catch (error) {
        console.error("[SignatureEngine] Fehler bei der Signatur:", error);
        throw new Error("Signatur-Prozess fehlgeschlagen.");
    }
};

/**
 * Verifiziert eine Signatur lokal gegen eine Adresse.
 */
export const verifySignature = (message: string, signature: string, address: string): boolean => {
    const recoveredAddress = ethers.verifyMessage(message, signature);
    return recoveredAddress.toLowerCase() === address.toLowerCase();
};

console.log("Signature-Engine: Kryptografischer Kern bereit für @RFOF-NETWORK.");