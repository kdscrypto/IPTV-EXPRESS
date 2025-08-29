// Input validation and sanitization utilities

/**
 * Sanitize email input to prevent XSS and injection attacks
 */
export const sanitizeEmail = (email: string): string => {
  return email
    .trim()
    .toLowerCase()
    .replace(/[<>'"]/g, '') // Remove potentially dangerous characters
    .slice(0, 254); // RFC 5321 email length limit
};

/**
 * Validate email format
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email) && email.length <= 254;
};

/**
 * Sanitize device info input
 */
export const sanitizeDeviceInfo = (deviceInfo: string): string => {
  return deviceInfo
    .trim()
    .replace(/[<>'"&]/g, '') // Remove HTML/script dangerous characters
    .slice(0, 200); // Reasonable length limit
};

/**
 * Validate device selection
 */
export const isValidDevice = (device: string): boolean => {
  const validDevices = ['smart-tv', 'android-tv', 'mobile', 'computer', 'other'];
  return validDevices.includes(device);
};

/**
 * Rate limiting check (simple in-memory implementation)
 * In production, use Redis or similar for distributed rate limiting
 */
const rateLimitStore = new Map<string, { count: number; lastReset: number }>();

export const checkRateLimit = (identifier: string, maxRequests: number = 5, windowMs: number = 60000): boolean => {
  const now = Date.now();
  const record = rateLimitStore.get(identifier);
  
  if (!record || now - record.lastReset > windowMs) {
    rateLimitStore.set(identifier, { count: 1, lastReset: now });
    return true;
  }
  
  if (record.count >= maxRequests) {
    return false;
  }
  
  record.count++;
  return true;
};