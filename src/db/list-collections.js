const { connectDatabase, closeConnection } = require('./connection');

async function listCollections() {
  try {
    // Connect to database
    const db = await connectDatabase();
    console.log('Connected to MongoDB Atlas');
    
    // List all collections
    const collections = await db.db.listCollections().toArray();
    console.log('\nCollections in imperial-perfumes database:');
    collections.forEach(collection => {
      console.log(`- ${collection.name}`);
    });
    
    // Close connection
    await closeConnection();
  } catch (error) {
    console.error('Error:', error);
  }
}

// Run the function
listCollections();
