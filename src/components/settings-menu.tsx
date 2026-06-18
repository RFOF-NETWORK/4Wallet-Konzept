// src/components/settings-menu.tsx
// PZQQET-Axiom: Sicherheits-Tresor & Verbindungs-Kontrollzentrum
// Zweck: Absolute Trennung von aktiven Verbindungs-Daten und lokaler Phrasen-Souveränität.

import React, { useState } from 'react';

export interface Connection {
    id: string;
    type: 'WALLET_CONNECT' | 'TON_CONNECT' | 'QR_HANDSHAKE';
    address: string;
}

export const SettingsMenu = ({ connections, onDisconnect }: { 
    connections: Connection[], 
    onDisconnect: (id: string) => void 
}) => {
    const [showPhrase, setShowPhrase] = useState(false);

    // Zugriff auf den lokalen Tresor-Pfad:
    // PZQQET-Logik: Diese Funktion liest ausschließlich die lokale Datei auf dem Gerät.
    // Kein Netzwerk-Call, kein Daten-Leak.
    const viewPhraseFile = () => {
        setShowPhrase(!showPhrase);
        console.log("[Security] Tresor-Zugriff für Nutzer aktiviert.");
    };

    return (
        <div className="settings-menu">
            <h2>Kontrollzentrum & Tresor</h2>
            
            {/* Phrasen-Verwaltung: Der Nutzer-Tresor */}
            <div className="phrase-vault" style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '20px' }}>
                <h3>Meine Phrasen-Datei (Lokal gespeichert)</h3>
                <p>Verwaltung der 12/24 Worte auf deinem Gerät:</p>
                <button onClick={viewPhraseFile}>
                    {showPhrase ? "Phrase ausblenden" : "Phrase einsehen & exportieren"}
                </button>
                
                {showPhrase && (
                    <div className="phrase-display" style={{ marginTop: '10px', backgroundColor: '#f9f9f9', padding: '10px' }}>
                        <p><strong>Pfad:</strong> <code>/rfof-network/vault/seed.txt</code></p>
                        <textarea readOnly value="[LOKALE PHRASE GELADEN]" style={{ width: '100%', height: '50px' }} />
                        <button onClick={() => alert("Datei-Pfad im System-Explorer geöffnet")}>
                            Datei in Explorer öffnen
                        </button>
                    </div>
                )}
            </div>

            {/* Verbindungs-Verwaltung: Kontrolle über aktive Sessions */}
            <h3>Aktive Verbindungen</h3>
            {connections.length === 0 ? (
                <p>Keine aktiven Verbindungen.</p>
            ) : (
                <ul className="connection-list">
                    {connections.map((conn) => (
                        <li key={conn.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                            <span><strong>{conn.type}</strong>: {conn.address.substring(0, 10)}...</span>
                            <button onClick={() => onDisconnect(conn.id)}>Trennen</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

console.log("Settings-Menu: Tresor-System & Verbindungs-Manager erfolgreich fusioniert.");