const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Define the path to the .env.local file
const envPath = path.join(__dirname, '..', '.env.local');

// Check if .env.local already exists
const envExists = fs.existsSync(envPath);

console.log('\n===== MongoDB Setup for Imperial Perfumes =====\n');

if (envExists) {
  console.log('An .env.local file already exists. Do you want to overwrite it? (y/n)');
  rl.question('> ', (answer) => {
    if (answer.toLowerCase() === 'y') {
      promptForMongoDBURI();
    } else {
      console.log('Setup cancelled. Your existing .env.local file remains unchanged.');
      rl.close();
    }
  });
} else {
  promptForMongoDBURI();
}

function promptForMongoDBURI() {
  console.log('\nPlease enter your MongoDB connection string:');
  console.log('(Format: mongodb+srv://<username>:<password>@<cluster>.mongodb.net/imperial-perfumes?retryWrites=true&w=majority)');
  
  rl.question('> ', (mongodbURI) => {
    if (!mongodbURI) {
      console.log('Error: MongoDB URI is required. Please try again.');
      return promptForMongoDBURI();
    }
    
    console.log('\nPlease enter a secret key for NextAuth:');
    console.log('(This should be a random string, at least 32 characters long)');
    
    rl.question('> ', (nextAuthSecret) => {
      if (!nextAuthSecret || nextAuthSecret.length < 32) {
        console.log('Error: NextAuth secret should be at least 32 characters long. Please try again.');
        return promptForMongoDBURI();
      }
      
      // Create or update the .env.local file
      const envContent = `MONGODB_URI=${mongodbURI}
NEXTAUTH_SECRET=${nextAuthSecret}
NEXTAUTH_URL=http://localhost:3000
`;
      
      try {
        fs.writeFileSync(envPath, envContent);
        console.log('\nSuccess! Your .env.local file has been created with your MongoDB connection string.');
        console.log('\nNext steps:');
        console.log('1. Run "npm run dev" to start your development server');
        console.log('2. To seed your database with initial data, run "npm run seed-db"');
        rl.close();
      } catch (error) {
        console.error('Error writing .env.local file:', error);
        rl.close();
      }
    });
  });
}
