// MongoDB connection configuration
// This is a template file. Create a config.js file with this content.
// The actual config.js file should be in .gitignore to prevent exposing credentials
module.exports = {
  // Use environment variable with no fallback in production
  MONGODB_URI: process.env.MONGODB_URI,
  
  // JWT secret for authentication
  JWT_SECRET: process.env.JWT_SECRET || 'development-secret-key',
  
  // Other configuration values
  NODE_ENV: process.env.NODE_ENV || 'development',
  
  // Application URL
  APP_URL: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
};
