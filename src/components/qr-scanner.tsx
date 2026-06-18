// src/components/qr-scanner.tsx
// PZQQET-Axiom: Optische Authentifizierungs-Brücke
// Zweck: Schneller QR-Handshake zur Hardware-Authentifizierung

import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader';
import { processHandshake } from '../core/handshake-manager';

export const QrScanner = ({ onScanSuccess }: { onScanSuccess: (data: any) => void }) => {
    const [scanError, setScanError] = useState<string | null>(null);

    const handleResult = (result: any, error: any) => {
        if (result) {
            // PZQQET-Axiom: Scan-Ergebnis sofort an den Handshake-Manager
            const handshakeResult = processHandshake(result.text);
            
            if (handshakeResult.success) {
                console.log("[QR-Scanner] Hardware-Handshake autorisiert.");
                onScanSuccess(handshakeResult);
            } else {
                setScanError("Handshake fehlgeschlagen: Ungültiges Gerät.");
            }
        }
    };

    return (
        <div className="qr-scanner-container">
            <h3>Hardware QR-Handshake</h3>
            <p>Gerät vor die Kamera halten, um RFOF-Handshake zu initiieren.</p>
            
            <QrReader
                onResult={handleResult}
                constraints={{ facingMode: 'environment' }}
                containerStyle={{ width: '300px', height: '300px' }}
            />
            
            {scanError && <p className="error">{scanError}</p>}
        </div>
    );
};

console.log("QR-Scanner: Kamera-Logik für Handshake bereit.");