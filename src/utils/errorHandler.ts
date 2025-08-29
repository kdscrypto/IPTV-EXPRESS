// Secure error handling utilities

/**
 * Sanitize error messages to prevent information leakage
 */
export const sanitizeErrorMessage = (error: unknown): string => {
  // Don't expose detailed error information in production
  if (process.env.NODE_ENV === 'production') {
    if (error instanceof Error) {
      // Only return generic messages for common user errors
      if (error.message.includes('email')) {
        return "Erreur de validation de l'email.";
      }
      if (error.message.includes('network') || error.message.includes('fetch')) {
        return "Erreur de connexion. Veuillez réessayer.";
      }
      if (error.message.includes('rate limit')) {
        return "Trop de tentatives. Veuillez patienter.";
      }
    }
    return "Une erreur est survenue. Veuillez réessayer.";
  }
  
  // In development, show more detailed errors for debugging
  if (error instanceof Error) {
    return error.message;
  }
  return String(error);
};

/**
 * Log errors securely without exposing sensitive data
 */
export const logSecureError = (error: unknown, context: string) => {
  const sanitizedError = {
    message: error instanceof Error ? error.message : String(error),
    context,
    timestamp: new Date().toISOString(),
    // Remove any potential sensitive data
    stack: process.env.NODE_ENV === 'development' ? 
      (error instanceof Error ? error.stack : undefined) : undefined
  };
  
  console.error('Secure Error Log:', sanitizedError);
};

/**
 * Handle form submission errors with appropriate user feedback
 */
export const handleFormError = (error: unknown, toast: any) => {
  const userMessage = sanitizeErrorMessage(error);
  logSecureError(error, 'Form Submission');
  
  toast({
    title: "Erreur",
    description: userMessage,
    variant: "destructive"
  });
};

/**
 * Validate and sanitize form data with comprehensive checks
 */
export const validateFormData = (data: {
  email?: string;
  confirmEmail?: string;
  device?: string;
  deviceInfo?: string;
}): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  // Email validation
  if (data.email) {
    if (data.email.length > 254) {
      errors.push("L'adresse email est trop longue.");
    }
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(data.email)) {
      errors.push("Format d'email invalide.");
    }
  }
  
  // Confirm email validation
  if (data.email && data.confirmEmail && data.email !== data.confirmEmail) {
    errors.push("Les adresses email ne correspondent pas.");
  }
  
  // Device validation
  if (data.device) {
    const validDevices = ['smart-tv', 'android-tv', 'mobile', 'computer', 'other'];
    if (!validDevices.includes(data.device)) {
      errors.push("Type d'appareil non valide.");
    }
  }
  
  // Device info validation
  if (data.deviceInfo && data.deviceInfo.length > 200) {
    errors.push("Les informations sur l'appareil sont trop longues.");
  }
  
  return { isValid: errors.length === 0, errors };
};