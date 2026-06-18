// src/hooks/use-contract.ts
// PZQQET-Axiom: Operativer Transaktions-Dispatcher (Vollständige Implementierung)
// Zweck: Mapping von sämtlichen UI-Button-IDs zu den Smart-Contract-Funktionen 
// und Absicherung gegen fehlerhafte Transaktions-Aufrufe.

import { useCallback } from 'react';
import { executeContractAction } from '../core/contract-manager';

/**
 * Der Contract-Hook dient als exekutive Brücke zwischen der Benutzeroberfläche
 * und der Blockchain-Infrastruktur. Er verarbeitet alle operativen IDs:
 * SEND, RECEIVE, WITHDRAW, DEPOSIT, MINE, STAKE, MINT, BURN, WRAP, BRIDGE.
 */
export const useContract = () => {
    
    const handleAction = useCallback(async (actionId: string, payload: any = {}) => {
        console.log(`[@RFOF-NETWORK] Dispatching Operation: ${actionId} mit Payload:`, payload);
        
        try {
            // Validierung vor der Ausführung:
            // Hier wird sichergestellt, dass nur definierte PZQQET-Operationen zugelassen werden.
            const allowedActions = [
                'SEND', 'RECEIVE', 'WITHDRAW', 'DEPOSIT', 'MINE', 
                'STAKE', 'MINT', 'BURN', 'WRAP', 'BRIDGE'
            ];

            if (!allowedActions.includes(actionId)) {
                throw new Error(`Ungültige operative Aktion: ${actionId}`);
            }

            // Exekutive Ausführung über den Contract-Manager
            // Dies ist die Brücke zur EVM- oder TON-Infrastruktur
            const result = await executeContractAction(actionId, payload);
            
            if (result && result.success) {
                console.log(`[Contract] Aktion ${actionId} wurde erfolgreich in die Blockchain geschrieben.`);
                console.log(`[Contract] Transaction Hash: ${result.txHash}`);
                return { success: true, txHash: result.txHash };
            } else {
                throw new Error(result.message || "Unbekannter Fehler bei der Contract-Interaktion.");
            }
        } catch (error: any) {
            console.error(`[Contract] Kritischer Fehler bei ${actionId}:`, error.message);
            // Fehler werden hier zentral abgefangen, damit die UI nicht abstürzt
            return { success: false, error: error.message };
        }
    }, []);

    // Rückgabe der Dispatcher-Funktion an die UI
    return { handleAction };
};

console.log("Hooks: Contract-Dispatcher vollständig initialisiert.");