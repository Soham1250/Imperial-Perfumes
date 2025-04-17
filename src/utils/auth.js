// Create a dual-compatible module (works with both CommonJS and ES modules)
const crypto = require('crypto');

/**
 * Hash a password using SHA-256
 * @param {string} password - The plain text password to hash
 * @returns {string} The hashed password
 */
function hashPassword(password) {
  const hash = crypto.createHash('sha256');
  hash.update(password);
  return hash.digest('hex');
}

/**
 * Compare a plain text password with a hashed password
 * @param {string} plainPassword - The plain text password
 * @param {string} hashedPassword - The hashed password to compare against
 * @returns {boolean} Whether the passwords match
 */
function comparePassword(plainPassword, hashedPassword) {
  const hashedPlain = hashPassword(plainPassword);
  return hashedPlain === hashedPassword;
}

// Export for CommonJS
module.exports = {
  hashPassword,
  comparePassword
};

// Export for ES modules
export {
  hashPassword,
  comparePassword
};
