// src/blockchain/block-processor.ts
// PZQQET-Axiom: Etablierung der Integritätskette #10/#11
// Zweck: Block-Strukturierung, Zeitstempel-Verankerung, Nonce- und Hash-Berechnung

import { ethers } from 'ethers';

export interface BlockData {
    index: number;
    timestamp: number;
    data: string;
    previousHash: string;
    nonce: number;
}

export class BlockProcessor {
    /**
     * Erstellt einen neuen Block-Hash basierend auf dem #10/#11-Standard.
     */
    static calculateHash(block: BlockData): string {
        const payload = `${block.index}${block.timestamp}${block.data}${block.previousHash}${block.nonce}`;
        return ethers.id(payload); // ethers.id ist ein SHA-256 Alias
    }

    /**
     * Implementiert die #11-Logik: Findet den Hash, der den Anforderungen entspricht.
     */
    static mineBlock(index: number, data: string, previousHash: string, difficulty: number): BlockData {
        let nonce = 0;
        let timestamp = Date.now();
        let hash = "";
        const target = "0".repeat(difficulty);

        console.log(`[BlockProcessor] Minen gestartet für Block #${index}...`);

        while (true) {
            const block: BlockData = { index, timestamp, data, previousHash, nonce };
            hash = this.calculateHash(block);

            if (hash.substring(2, 2 + difficulty) === target) {
                console.log(`[BlockProcessor] Block #${index} erfolgreich gemined! Hash: ${hash}`);
                return block;
            }
            nonce++;
        }
    }
}

console.log("Block-Processor: #10/#11-Integritätslogik aktiv.");