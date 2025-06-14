const mongoose = require('mongoose');

// Get MongoDB URI from environment variables
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/imperial-perfumes';

// Track connection status
let isConnected = false;

/**
 * Initialize the MongoDB connection with improved error handling and connection pooling
 * @returns {Promise<object>} MongoDB connection
 */
const connectDatabase = async () => {
  // If already connected, return existing connection
  if (isConnected) {
    console.log('Using existing database connection');
    return mongoose.connection;
  }

  try {
    // Configure mongoose
    mongoose.set('strictQuery', true);
    
    // Connect with optimized settings
    const connection = await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      maxPoolSize: 10, // Maintain up to 10 socket connections
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
      socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
    });
    
    isConnected = connection.connections[0].readyState === 1;
    
    if (isConnected) {
      console.log('Connected to MongoDB Atlas');
      
      // Handle connection errors after initial connection
      mongoose.connection.on('error', (err) => {
        console.error('MongoDB connection error:', err);
        isConnected = false;
      });
      
      // Handle disconnection
      mongoose.connection.on('disconnected', () => {
        console.warn('MongoDB disconnected');
        isConnected = false;
      });
      
      // Handle process termination
      process.on('SIGINT', async () => {
        await mongoose.connection.close();
        console.log('MongoDB connection closed due to app termination');
        process.exit(0);
      });
      
      return mongoose.connection;
    } else {
      throw new Error('Failed to establish MongoDB connection');
    }
  } catch (error) {
    console.error('MongoDB connection error:', error);
    isConnected = false;
    throw error; // Re-throw to handle in the calling function
  }
};

/**
 * Get a collection by name
 * @param {string} name - Collection name
 * @returns {Collection} MongoDB collection
 */
const getCollection = (name) => {
  if (!isConnected) {
    throw new Error('Database not connected. Call connectDatabase() first.');
  }
  return mongoose.connection.collection(name);
};

/**
 * Close the database connection
 * @returns {Promise<void>}
 */
const closeConnection = async () => {
  if (mongoose.connection && isConnected) {
    await mongoose.connection.close();
    isConnected = false;
    console.log('MongoDB connection closed');
  }
};

module.exports = {
  connectDatabase,
  getCollection,
  closeConnection,
  isConnected: () => isConnected
};
