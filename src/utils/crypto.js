// src/utils/crypto.js

/**
 * Generates a SHA-256 hash of the PIN combined with a unique salt (the user UID).
 * @param {string} pin - The 4-digit PIN string.
 * @param {string} salt - The unique Firebase UID.
 * @returns {Promise<string>} - The hex representation of the hash.
 */
export async function hashPin(pin, salt) {
  // Combine PIN and Salt
  const combined = `${pin}:${salt}`;
  
  // Encode as UTF-8
  const encoder = new TextEncoder();
  const data = encoder.encode(combined);
  
  // Hash using native Web Crypto API
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  
  // Convert buffer to hex string
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  
  return hashHex;
}