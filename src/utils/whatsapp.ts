export const sendToWhatsApp = (data: {
  email: string;
  device: string;
  deviceInfo: string;
  planName: string;
  planPrice: number;
}) => {
  const phoneNumber = "+237694564763";
  
  const message = `🎬 NOUVELLE DEMANDE IPTV EXPRESS

📧 Email: ${data.email}
📱 Appareil: ${data.device}
💳 Pack choisi: ${data.planName} - ${data.planPrice}€
ℹ️ Infos supplémentaires: ${data.deviceInfo || 'Aucune'}

Demande envoyée le: ${new Date().toLocaleString('fr-FR')}`;

  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${phoneNumber.replace('+', '')}?text=${encodedMessage}`;
  
  // Ouvrir WhatsApp
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