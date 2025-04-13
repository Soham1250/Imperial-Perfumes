const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/imperial-perfumes';

// Define schemas directly in the script for seeding
const ReviewSchema = new mongoose.Schema({
  source: { type: String, required: true },
  author: { type: String, required: true },
  text: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  date: { type: Date, default: Date.now }
});

const NotesSchema = new mongoose.Schema({
  top: [{ type: String }],
  middle: [{ type: String }],
  base: [{ type: String }]
});

const ProductSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  details: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  collections: [{ type: String }],
  notes: { type: NotesSchema, required: true },
  reviews: [{ type: ReviewSchema }],
  inStock: { type: Boolean, default: true },
  featured: { type: Boolean, default: false }
}, { timestamps: true });

const CollectionSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  perfumeCount: { type: Number, default: 0 },
  notes: { type: String, required: true }
}, { timestamps: true });

// Create models
const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);
const Collection = mongoose.models.Collection || mongoose.model('Collection', CollectionSchema);

// Sample data
const collections = [
  {
    id: "office",
    name: "Office Collection",
    description: "Professional fragrances that exude confidence and sophistication, perfect for the workplace environment.",
    image: "/images/imperial rogue.png",
    perfumeCount: 8,
    notes: "Subtle woods, light citrus, and clean musk"
  },
  {
    id: "beach",
    name: "Beach Collection",
    description: "Fresh, aquatic scents that capture the essence of coastal breezes and sunny days by the ocean.",
    image: "/images/imperial rogue.png",
    perfumeCount: 6,
    notes: "Marine accords, coconut, and tropical flowers"
  },
  {
    id: "travel",
    name: "Travel Collection",
    description: "Exotic fragrances inspired by global destinations, designed to transport you to far-off places.",
    image: "/images/imperial rogue.png",
    perfumeCount: 7,
    notes: "Spices, rare woods, and indigenous flowers"
  },
  {
    id: "gym",
    name: "Gym Collection",
    description: "Energizing, fresh scents perfect for active lifestyles and workout sessions.",
    image: "/images/imperial rogue.png",
    perfumeCount: 5,
    notes: "Citrus, mint, and clean ozonic accords"
  },
  {
    id: "party",
    name: "Party Collection",
    description: "Bold, statement fragrances designed to stand out and leave a lasting impression at social gatherings.",
    image: "/images/imperial rogue.png",
    perfumeCount: 9,
    notes: "Rich amber, vanilla, and exotic spices"
  },
  {
    id: "date",
    name: "Date Collection",
    description: "Romantic, sensual fragrances crafted to create an intimate atmosphere for special moments.",
    image: "/images/imperial rogue.png",
    perfumeCount: 7,
    notes: "Rose, jasmine, and warm musks"
  }
];

const perfumes = [
  {
    id: 1,
    name: "Imperial Perfume 1",
    description: "A captivating blend of exotic notes that transport you to distant lands.",
    details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel aliquam nisl nisl vel nisl.",
    price: 199,
    image: "/images/imperial rogue.png",
    collections: ["office", "travel"],
    notes: {
      top: ["Bergamot", "Lemon", "Black Pepper"],
      middle: ["Lavender", "Geranium", "Cardamom"],
      base: ["Vetiver", "Cedarwood", "Amber"]
    },
    reviews: [
      { source: "Instagram", author: "@fragrancelover", text: "Absolutely stunning fragrance! The longevity is incredible and I get compliments every time I wear it.", rating: 5 },
      { source: "Facebook", author: "Michael R.", text: "A sophisticated scent that's perfect for special occasions. Highly recommend!", rating: 4 },
      { source: "Website", author: "Sarah J.", text: "My signature scent for over a year now. Nothing else compares to the complexity and elegance.", rating: 5 }
    ],
    inStock: true,
    featured: true
  },
  {
    id: 2,
    name: "Imperial Perfume 2",
    description: "A rich and warm fragrance with notes of amber, vanilla, and sandalwood.",
    details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel aliquam nisl nisl vel nisl.",
    price: 229,
    image: "/images/imperial rogue.png",
    collections: ["date", "party"],
    notes: {
      top: ["Bergamot", "Cardamom", "Pink Pepper"],
      middle: ["Amber", "Vanilla", "Cinnamon"],
      base: ["Sandalwood", "Musk", "Tonka Bean"]
    },
    reviews: [
      { source: "Instagram", author: "@scentcritic", text: "One of the most luxurious amber fragrances I've ever experienced. Worth every penny.", rating: 5 },
      { source: "Facebook", author: "Jennifer L.", text: "My husband loves this! It's warm, inviting, and lasts all day.", rating: 5 },
      { source: "Website", author: "David M.", text: "A masterpiece of perfumery. The dry down is absolutely divine.", rating: 4 }
    ],
    inStock: true,
    featured: false
  },
  {
    id: 3,
    name: "Imperial Perfume 3",
    description: "A bold and daring fragrance with notes of leather, spice, and dark woods.",
    details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel aliquam nisl nisl vel nisl.",
    price: 249,
    image: "/images/imperial rogue.png",
    collections: ["office", "party"],
    notes: {
      top: ["Black Pepper", "Saffron", "Elemi"],
      middle: ["Leather", "Oud", "Rose"],
      base: ["Patchouli", "Vetiver", "Incense"]
    },
    reviews: [
      { source: "Instagram", author: "@fragrancejunkie", text: "This is not for the faint of heart. Bold, masculine, and unforgettable.", rating: 5 },
      { source: "Facebook", author: "Robert T.", text: "The leather note is so realistic. A true masterpiece for those who appreciate daring scents.", rating: 4 },
      { source: "Website", author: "Alexandra P.", text: "I wear this despite it being marketed for men. It's powerful and makes me feel confident.", rating: 5 }
    ],
    inStock: true,
    featured: true
  },
  {
    id: 4,
    name: "Imperial Perfume 4",
    description: "An enchanting floral fragrance with notes of orchid, jasmine, and musk.",
    details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel aliquam nisl nisl vel nisl.",
    price: 189,
    image: "/images/imperial rogue.png",
    collections: ["date"],
    notes: {
      top: ["Bergamot", "Pink Pepper", "Pear"],
      middle: ["Orchid", "Jasmine", "Rose"],
      base: ["Musk", "Vanilla", "Patchouli"]
    },
    reviews: [
      { source: "Instagram", author: "@perfumelover", text: "The most beautiful floral I've ever worn. Elegant, feminine, and long-lasting.", rating: 5 },
      { source: "Facebook", author: "Emily S.", text: "I get so many compliments when I wear this. It's become my signature scent.", rating: 5 },
      { source: "Website", author: "Thomas K.", text: "Bought this for my wife and she absolutely loves it. A truly elegant scent.", rating: 5 }
    ],
    inStock: true,
    featured: false
  },
  {
    id: 5,
    name: "Imperial Perfume 5",
    description: "A fresh and invigorating scent with citrus and marine accords.",
    details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel aliquam nisl nisl vel nisl.",
    price: 179,
    image: "/images/imperial rogue.png",
    collections: ["beach", "gym"],
    notes: {
      top: ["Lemon", "Grapefruit", "Bergamot"],
      middle: ["Sea Salt", "Rosemary", "Lavender"],
      base: ["Musk", "Cedar", "Amber"]
    },
    reviews: [
      { source: "Instagram", author: "@summerfragrance", text: "Perfect for hot days. So refreshing and clean.", rating: 5 },
      { source: "Facebook", author: "James L.", text: "My go-to for the gym and outdoor activities. Energizing and fresh.", rating: 4 },
      { source: "Website", author: "Olivia R.", text: "My go-to for hot days. The marine notes are so realistic and refreshing.", rating: 4 }
    ],
    inStock: true,
    featured: false
  },
  {
    id: 6,
    name: "Imperial Perfume 6",
    description: "A sophisticated blend of rose, patchouli, and bergamot.",
    details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel aliquam nisl nisl vel nisl.",
    price: 219,
    image: "/images/imperial rogue.png",
    collections: ["date", "office"],
    notes: {
      top: ["Bergamot", "Mandarin", "Pink Pepper"],
      middle: ["Rose", "Geranium", "Lily of the Valley"],
      base: ["Patchouli", "Sandalwood", "Vanilla"]
    },
    reviews: [
      { source: "Instagram", author: "@roseperfumelover", text: "The most beautiful rose fragrance I've ever smelled. Not old-fashioned at all.", rating: 5 },
      { source: "Facebook", author: "Catherine D.", text: "Sophisticated and elegant. Perfect for the office or special occasions.", rating: 4 },
      { source: "Website", author: "William J.", text: "Bought this for my mother and she adores it. A true classic.", rating: 4 }
    ],
    inStock: true,
    featured: false
  },
  {
    id: 7,
    name: "Imperial Perfume 7",
    description: "An oriental fragrance with notes of oud, saffron, and amber.",
    details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel aliquam nisl nisl vel nisl.",
    price: 259,
    image: "/images/imperial rogue.png",
    collections: ["party", "travel"],
    notes: {
      top: ["Saffron", "Cardamom", "Bergamot"],
      middle: ["Oud", "Rose", "Jasmine"],
      base: ["Amber", "Vanilla", "Sandalwood"]
    },
    reviews: [
      { source: "Instagram", author: "@oudlover", text: "One of the best oud fragrances on the market. Rich, complex, and addictive.", rating: 5 },
      { source: "Facebook", author: "Mohammed A.", text: "Reminds me of the finest Arabian perfumes. Exceptional quality and longevity.", rating: 5 },
      { source: "Website", author: "Sophia K.", text: "Worth every penny. The longevity is incredible and the scent evolution is fascinating.", rating: 4 }
    ],
    inStock: true,
    featured: true
  },
  {
    id: 8,
    name: "Imperial Perfume 8",
    description: "A light and airy fragrance with notes of white flowers and citrus.",
    details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel aliquam nisl nisl vel nisl.",
    price: 169,
    image: "/images/imperial rogue.png",
    collections: ["beach", "gym"],
    notes: {
      top: ["Lemon", "Bergamot", "Mandarin"],
      middle: ["Jasmine", "Orange Blossom", "Lily"],
      base: ["Musk", "Cedar", "Amber"]
    },
    reviews: [
      { source: "Instagram", author: "@summerfragrance", text: "My favorite summer scent! So light and beautiful.", rating: 5 },
      { source: "Facebook", author: "Jessica M.", text: "Perfect for everyday wear. Clean, fresh, and not overwhelming.", rating: 4 },
      { source: "Website", author: "Daniel P.", text: "Bought this for my girlfriend and she wears it every day now. Light but distinctive.", rating: 4 }
    ],
    inStock: true,
    featured: false
  },
  {
    id: 9,
    name: "Imperial Perfume 9",
    description: "A woody fragrance with notes of cedar, vetiver, and bergamot.",
    details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel aliquam nisl nisl vel nisl.",
    price: 209,
    image: "/images/imperial rogue.png",
    collections: ["office", "travel"],
    notes: {
      top: ["Bergamot", "Elemi", "Pepper"],
      middle: ["Cedar", "Cypress", "Juniper"],
      base: ["Vetiver", "Amber", "Musk"]
    },
    reviews: [
      { source: "Instagram", author: "@woodyfragrances", text: "One of the best woody scents I've tried. Natural and sophisticated.", rating: 5 },
      { source: "Facebook", author: "Andrew T.", text: "Great office scent. Professional and distinctive without being overwhelming.", rating: 4 },
      { source: "Website", author: "Rachel B.", text: "I love woody fragrances and this is one of the best I've tried.", rating: 5 }
    ],
    inStock: true,
    featured: false
  },
  {
    id: 10,
    name: "Imperial Perfume 10",
    description: "A luxurious blend of rare spices, amber, and vanilla.",
    details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel aliquam nisl nisl vel nisl.",
    price: 279,
    image: "/images/imperial rogue.png",
    collections: ["party", "date"],
    notes: {
      top: ["Cinnamon", "Nutmeg", "Cardamom"],
      middle: ["Amber", "Vanilla", "Benzoin"],
      base: ["Sandalwood", "Musk", "Tonka Bean"]
    },
    reviews: [
      { source: "Instagram", author: "@luxuryfragrance", text: "Opulent and rich. Perfect for special occasions.", rating: 5 },
      { source: "Facebook", author: "Victoria L.", text: "My husband can't get enough of this. Sexy and sophisticated.", rating: 5 },
      { source: "Website", author: "Jonathan K.", text: "A special occasion fragrance that makes you feel like royalty.", rating: 5 }
    ],
    inStock: true,
    featured: true
  }
];

// Function to seed the database
async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await Product.deleteMany({});
    await Collection.deleteMany({});
    console.log('Cleared existing data');

    // Insert collections
    await Collection.insertMany(collections);
    console.log(`Inserted ${collections.length} collections`);

    // Insert products
    await Product.insertMany(perfumes);
    console.log(`Inserted ${perfumes.length} products`);

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

// Run the seed function
seedDatabase();
