// src/services/blockchain-fetcher.ts
// PZQQET-Axiom: Observator-Instanz (Nur-Lese-Zugriff)
// Zweck: Abfrage von Kontoständen ohne Signatur-Berechtigung (Sicherheit durch Trennung)

import { ethers } from 'ethers';
import { TonClient } from '@ton/ton'; 

export const BlockchainFetcher = {
    
    /**
     * Ruft den Stand eines Tokens auf einer EVM-Chain ab.
     */
    async getEVMBalance(rpcUrl: string, contractAddress: string, walletAddress: string): Promise<string> {
        try {
            const provider = new ethers.JsonRpcProvider(rpcUrl);
            const erc20Abi = ["function balanceOf(address owner) view returns (uint256)"];
            const contract = new ethers.Contract(contractAddress, erc20Abi, provider);
            
            const balance = await contract.balanceOf(walletAddress);
            return ethers.formatUnits(balance, 18); 
        } catch (error) {
            console.error("[Fetcher] EVM-Fehler:", error);
            return "0";
        }
    },

    /**
     * Ruft den Stand auf der TON-Blockchain ab.
     */
    async getTONBalance(walletAddress: string): Promise<string> {
        try {
            const client = new TonClient({ endpoint: 'https://toncenter.com/api/v2/jsonRPC' });
            const balance = await client.getBalance(walletAddress);
            return (Number(balance) / 1e9).toString(); 
        } catch (error) {
            console.error("[Fetcher] TON-Fehler:", error);
            return "0";
        }
    }
};

console.log("Services: Blockchain-Fetcher (Nur-Lese-Zugriff) im Dienste des RFOF-Network.");
