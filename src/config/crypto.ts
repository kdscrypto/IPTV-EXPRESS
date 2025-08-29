// Configuration for cryptocurrency addresses and settings
// Using environment variables for security

export interface CryptoConfig {
  address: string;
  network: string;
  icon: string;
  color: string;
}

export interface CryptoAddresses {
  bitcoin: CryptoConfig;
  ethereum: CryptoConfig;
  usdt: CryptoConfig;
}

// Default addresses (fallback - should be replaced via environment)
export const getCryptoAddresses = (): CryptoAddresses => {
  return {
    bitcoin: {
      address: import.meta.env.VITE_CRYPTO_BTC_ADDRESS || "1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2",
      network: "Bitcoin",
      icon: "₿",
      color: "text-orange-500"
    },
    ethereum: {
      address: import.meta.env.VITE_CRYPTO_ETH_ADDRESS || "0x742d35Cc6635C0532925a3b8D5C9E5C3A64D7B1A",
      network: "Ethereum (ERC-20)",
      icon: "Ξ",
      color: "text-blue-500"
    },
    usdt: {
      address: import.meta.env.VITE_CRYPTO_USDT_ADDRESS || "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa",
      network: "USDT (TRC-20)",
      icon: "₮",
      color: "text-green-500"
    }
  };
};

// WhatsApp configuration
export const getWhatsAppConfig = () => {
  return {
    phoneNumber: import.meta.env.VITE_WHATSAPP_PHONE || "237694564763"
  };
};