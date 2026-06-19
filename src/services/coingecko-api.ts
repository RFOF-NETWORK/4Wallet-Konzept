// src/services/coingecko-api.ts
// PZQQET-Axiom: Dynamisches Live-Marktdaten-Gateway
// Zweck: Holt Kurse für JEDEN Token, der in der MASTER_REGISTRY definiert ist

const COINGECKO_BASE_URL = 'https://api.coingecko.com/api/v3';

/**
 * Holt Preise für eine Liste von Token-IDs (CoinGecko-Format).
 * @param tokenIds - Array von CoinGecko-IDs (z.B. ['bitcoin', 'ethereum', 'the-open-network'])
 */
export const fetchMarketPrices = async (tokenIds: string[]): Promise<Record<string, number>> => {
    try {
        const ids = tokenIds.join(',');
        const response = await fetch(
            `${COINGECKO_BASE_URL}/simple/price?ids=${ids}&vs_currencies=eur`
        );

        if (!response.ok) {
            throw new Error(`Marktdaten-Abruf fehlgeschlagen: ${response.statusText}`);
        }

        const data = await response.json();

        // Gibt ein Objekt zurück: { "bitcoin": 95000, "ethereum": 3500, ... }
        const prices: Record<string, number> = {};
        tokenIds.forEach(id => {
            prices[id] = data[id]?.eur || 0;
        });

        return prices;
    } catch (error) {
        console.error("[@RFOF-NETWORK] Fehler beim Preis-Update:", error);
        return tokenIds.reduce((acc, id) => ({ ...acc, [id]: 0 }), {});
    }
};

console.log("Services: Universelles CoinGecko-Gateway für alle Registry-Assets bereit.");
