import { getWhatsAppConfig } from "@/config/crypto";

export const sendToWhatsApp = (data: {
  email: string;
  device: string;
  deviceInfo: string;
  planName: string;
  planPrice: number;
}) => {
  // Get phone number from secure configuration
  const whatsappConfig = getWhatsAppConfig();
  const phoneNumber = whatsappConfig.phoneNumber;
  
  // Message simplifié pour éviter les problèmes d'encodage
  const message = `NOUVELLE DEMANDE IPTV EXPRESS

Email: ${data.email}
Appareil: ${data.device}
Pack choisi: ${data.planName} - ${data.planPrice}EUR
Infos supplementaires: ${data.deviceInfo || 'Aucune'}

Demande envoyee le: ${new Date().toLocaleString('fr-FR')}`;

  // Encoder le message pour l'URL
  const encodedMessage = encodeURIComponent(message);
  
  // Utiliser wa.me qui est l'URL officielle recommandée par WhatsApp
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
  
  console.log('WhatsApp URL:', whatsappUrl);
  
  // Ouvrir WhatsApp dans un nouvel onglet
  window.open(whatsappUrl, '_blank');
  
  return message;
};

export const getDeviceLabel = (deviceValue: string) => {
  const devices = {
    'smart-tv': 'Smart TV (Samsung, LG, Sony...)',
    'android-tv': 'Android TV / TV Box',
    'mobile': 'Smartphone / Tablette',
    'computer': 'Ordinateur (Windows, Mac, Linux)',
    'other': 'Autre appareil'
  };
  return devices[deviceValue as keyof typeof devices] || deviceValue;
};