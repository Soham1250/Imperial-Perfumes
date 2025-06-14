const { connectDatabase, closeConnection } = require('./connection');
const Product = require('../models/product.model');
const Collection = require('../models/collection.model');
const User = require('../models/user.model');

/**
 * Seed the database with initial data
 */
const seedDatabase = async () => {
  try {
    // Connect to database
    await connectDatabase();
    console.log('Connected to database for seeding');
    
    // Clear existing data
    await Collection.deleteMany({});
    await Product.deleteMany({});
    
    // Create collections
    console.log('Creating collections...');
    const collections = await Collection.insertMany([
      {
        id: 'office',
        name: 'Office Collection',
        description: 'Sophisticated fragrances perfect for the professional environment. These scents are designed to be subtle yet impactful, leaving a lasting impression in the workplace.',
        image: '/images/collections/office.jpg',
        notes: 'Subtle, Professional, Sophisticated',
        featured: true,
        displayOrder: 1
      },
      {
        id: 'evening',
        name: 'Evening Collection',
        description: 'Bold and captivating fragrances designed for special nights out. These scents command attention and leave a lasting impression.',
        image: '/images/collections/evening.jpg',
        notes: 'Bold, Captivating, Luxurious',
        featured: true,
        displayOrder: 2
      },
      {
        id: 'casual',
        name: 'Casual Collection',
        description: 'Relaxed and approachable fragrances perfect for everyday wear. These scents are designed to be versatile and comfortable.',
        image: '/images/collections/casual.jpg',
        notes: 'Fresh, Relaxed, Approachable',
        featured: true,
        displayOrder: 3
      }
    ]);
    
    console.log(`${collections.length} collections created`);
    
    // Create products
    console.log('Creating products...');
    const products = await Product.insertMany([
      {
        name: 'Imperial Elixir Noir',
        description: 'A sophisticated blend of amber, oud, and spice. This captivating fragrance evolves throughout the day, revealing new facets of its complex character.',
        price: 2499,
        images: ['/images/imperial rogue.png', '/images/products/elixir-noir-2.jpg'],
        collections: [collections[1]._id], // Evening Collection
        fragranceNotes: {
          top: ['Bergamot', 'Black Pepper', 'Cardamom'],
          middle: ['Rose', 'Saffron', 'Cinnamon'],
          base: ['Oud', 'Amber', 'Vanilla', 'Musk']
        },
        sizes: [
          { size: '30ml', priceMultiplier: 1, stock: 15 },
          { size: '60ml', priceMultiplier: 1.8, stock: 10 },
          { size: '100ml', priceMultiplier: 2.5, stock: 5 }
        ],
        featured: true,
        slug: 'imperial-elixir-noir'
      },
      {
        name: 'Royal Oud Intense',
        description: 'A powerful and distinctive fragrance centered around precious oud wood. This royal scent combines the richness of oud with aromatic spices and warm amber.',
        price: 2999,
        images: ['/images/products/royal-oud.jpg', '/images/products/royal-oud-2.jpg'],
        collections: [collections[1]._id], // Evening Collection
        fragranceNotes: {
          top: ['Lemon', 'Pink Pepper', 'Coriander'],
          middle: ['Galbanum', 'Angelica', 'Violet'],
          base: ['Oud', 'Sandalwood', 'Leather', 'Musk']
        },
        sizes: [
          { size: '30ml', priceMultiplier: 1, stock: 8 },
          { size: '60ml', priceMultiplier: 1.8, stock: 12 },
          { size: '100ml', priceMultiplier: 2.5, stock: 6 }
        ],
        featured: false,
        slug: 'royal-oud-intense'
      },
      {
        name: 'Executive Amber',
        description: 'A refined and elegant fragrance perfect for the professional environment. This sophisticated scent combines amber with woody notes and subtle spices.',
        price: 1999,
        images: ['/images/products/executive-amber.jpg', '/images/products/executive-amber-2.jpg'],
        collections: [collections[0]._id], // Office Collection
        fragranceNotes: {
          top: ['Bergamot', 'Mandarin', 'Sage'],
          middle: ['Lavender', 'Geranium', 'Cinnamon'],
          base: ['Amber', 'Patchouli', 'Vetiver', 'Cedar']
        },
        sizes: [
          { size: '30ml', priceMultiplier: 1, stock: 20 },
          { size: '60ml', priceMultiplier: 1.8, stock: 15 },
          { size: '100ml', priceMultiplier: 2.5, stock: 10 }
        ],
        featured: true,
        slug: 'executive-amber'
      },
      {
        name: 'Fresh Citrus Breeze',
        description: 'A light and refreshing fragrance perfect for casual everyday wear. This invigorating scent combines zesty citrus with aromatic herbs and a light woody base.',
        price: 1799,
        images: ['/images/products/citrus-breeze.jpg', '/images/products/citrus-breeze-2.jpg'],
        collections: [collections[2]._id], // Casual Collection
        fragranceNotes: {
          top: ['Lemon', 'Bergamot', 'Grapefruit'],
          middle: ['Mint', 'Rosemary', 'Jasmine'],
          base: ['Cedar', 'Musk', 'Vetiver']
        },
        sizes: [
          { size: '30ml', priceMultiplier: 1, stock: 25 },
          { size: '60ml', priceMultiplier: 1.8, stock: 20 },
          { size: '100ml', priceMultiplier: 2.5, stock: 15 }
        ],
        featured: false,
        slug: 'fresh-citrus-breeze'
      }
    ]);
    
    console.log(`${products.length} products created`);
    
    // Create admin user
    console.log('Creating admin user...');
    const adminUser = await User.create({
      email: 'admin@imperialperfumes.com',
      password: 'Admin@123', // This will be hashed by the pre-save hook
      name: 'Admin User',
      phone: '9876543210',
      role: 'admin',
      isVerified: true
    });
    
    console.log(`Admin user created with email: ${adminUser.email}`);
    
    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    // Close database connection
    await closeConnection();
  }
};

// Run the seed function if this file is executed directly
if (require.main === module) {
  seedDatabase();
}

module.exports = { seedDatabase };
