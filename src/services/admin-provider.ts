// src/services/admin-provider.ts
// PZQQET-Axiom: Admin-Sicherheits-Layer (Autorisierungs-Gateway)
// Zweck: Strikte Prüfung von Berechtigungen für interne vs. externe Token-Operationen

/**
 * Konfiguration der Admin-Wallets.
 * Nur diese Adressen haben die Berechtigung für administrative Aktionen
 * wie Minting oder Burn-Management auf internen RFOF-Token.
 */
const ADMIN_WHITELIST: string[] = [
    "0x4f8aad6f7094c1374bf7c39B3D83E9f01e073cf6", // Admin-Wallet-Adresse
    "0x020e12979b99c342c641f7a126032CD5DF65499E"
];

export const AdminProvider = {
    /**
     * Prüft, ob eine Adresse administrative Rechte besitzt.
     */
    isAdmin: (address: string): boolean => {
        return ADMIN_WHITELIST.includes(address.toLowerCase());
    },

    /**
     * Prüft, ob der Nutzer die Berechtigung hat, eine spezifische Aktion auszuführen.
     * @param actionId - Die operative Aktion (z.B. 'MINT', 'BURN')
     * @param userAddress - Die Adresse des ausführenden Nutzers
     */
    checkPermission: (actionId: string, userAddress: string): boolean => {
        const adminOnlyActions = ['MINT', 'BURN', 'MINE'];

        // Wenn die Aktion eine Admin-Aktion ist, prüfe die Whitelist
        if (adminOnlyActions.includes(actionId)) {
            return AdminProvider.isAdmin(userAddress);
        }

        // Standard-Operationen wie 'SEND' oder 'STAKE' sind für jeden Token-Inhaber erlaubt
        return true;
    }
};

console.log("Services: Admin-Provider (Sicherheits-Gateway) erfolgreich in Services geladen.");