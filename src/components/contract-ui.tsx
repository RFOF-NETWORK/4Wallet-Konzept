// src/components/contract-ui.tsx
// PZQQET-Axiom: Operative Asset-Kontrolle & Sicherheits-Schicht
// Zweck: Exekutive Schnittstelle für Smart-Contract-Interaktionen mit Callback-Anbindung

import React from 'react';

interface ContractAction {
    label: string;
    id: string; // Eindeutige ID für den transaction-handler
    style: 'primary' | 'secondary' | 'danger';
}

export const ContractUI = ({ onAction }: { onAction: (actionId: string) => void }) => {
    // Zentrales Register aller operativen Aktionen
    const actions: ContractAction[] = [
        { label: 'Send', id: 'SEND', style: 'primary' },
        { label: 'Receive', id: 'RECEIVE', style: 'secondary' },
        { label: 'Withdraw', id: 'WITHDRAW', style: 'danger' },
        { label: 'Deposit', id: 'DEPOSIT', style: 'primary' },
        { label: 'Mine', id: 'MINE', style: 'secondary' },
        { label: 'Stake', id: 'STAKE', style: 'primary' },
        { label: 'Mint', id: 'MINT', style: 'secondary' },
        { label: 'Burn', id: 'BURN', style: 'danger' },
        { label: 'Wrap', id: 'WRAP', style: 'secondary' },
        { label: 'Bridge', id: 'BRIDGE', style: 'primary' },
    ];

    return (
        <div className="contract-ui">
            <h2>Netzwerk-Operationen</h2>
            <div className="action-grid" style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', 
                gap: '12px',
                padding: '20px' 
            }}>
                {actions.map((item) => (
                    <button 
                        key={item.id} 
                        onClick={() => onAction(item.id)}
                        className={`btn-${item.style}`}
                        style={{ padding: '15px', cursor: 'pointer', borderRadius: '8px' }}
                    >
                        {item.label}
                    </button>
                ))}
            </div>
        </div>
    );
};

console.log("Contract-UI: Operative Schnittstelle mit Callback-Anbindung bereit.");