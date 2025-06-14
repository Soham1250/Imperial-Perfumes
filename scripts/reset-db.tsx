const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

// Import the shared auth utility
const { hashPassword } = require('../src/utils/auth');

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

// Address schema
const AddressSchema = new mongoose.Schema({
  street: {
    type: String,
    required: [true, 'Street address is required'],
    trim: true
  },
  city: {
    type: String,
    required: [true, 'City is required'],
    trim: true
  },
  state: {
    type: String,
    required: [true, 'State is required'],
    trim: true
  },
  pincode: {
    type: String,
    required: [true, 'Pincode is required'],
    trim: true,
    match: [/^\d{6}$/, 'Please enter a valid 6-digit pincode']
  },
  country: {
    type: String,
    default: 'India',
    trim: true
  },
  isDefault: {
    type: Boolean,
    default: false
  }
}, { _id: true });

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [8, 'Password must be at least 8 characters long']
  },
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  phone: {
    type: String,
    trim: true,
    match: [/^[6-9]\d{9}$/, 'Please enter a valid 10-digit Indian mobile number']
  },
  addresses: [AddressSchema],
  role: {
    type: String,
    enum: ['customer', 'admin'],
    default: 'customer'
  },
  isVerified: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Create models
const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);
const Collection = mongoose.models.Collection || mongoose.model('Collection', CollectionSchema);
const User = mongoose.models.User || mongoose.model('User', UserSchema);

// Sample collections data
const collections = [
  {
    id: "signature",
    name: "Signature Collection",
    description: "Our flagship collection featuring our most iconic fragrances that define the Imperial Perfumes brand.",
    image: "/images/signature-collection.jpg",
    perfumeCount: 4,
    notes: "Amber, Oud, Vanilla, Sandalwood"
  },
  {
    id: "oud",
    name: "Oud Collection",
    description: "Luxurious fragrances centered around the precious oud wood, known for its rich, woody, and complex aroma.",
    image: "/images/oud-collection.jpg",
    perfumeCount: 3,
    notes: "Oud, Saffron, Rose, Amber"
  },
  {
    id: "floral",
    name: "Floral Collection",
    description: "Elegant fragrances that celebrate the beauty of floral notes, from delicate jasmine to rich rose.",
    image: "/images/floral-collection.jpg",
    perfumeCount: 3,
    notes: "Rose, Jasmine, Lily, Peony"
  }
];

// Sample products data
const perfumes = [
  {
    id: 1,
    name: "Imperial Perfume 1",
    description: "A captivating blend of exotic notes that transport you to distant lands.",
    price: 199,
    image: "/images/imperial rogue.png",
    details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel aliquam nisl nisl vel nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel aliquam nisl nisl vel nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel aliquam nisl nisl vel nisl.",
    collections: ["signature"],
    notes: {
      top: ["Bergamot", "Lemon", "Black Pepper"],
      middle: ["Lavender", "Geranium", "Cardamom"],
      base: ["Vetiver", "Cedarwood", "Amber"]
    },
    reviews: [
      { source: "Instagram", author: "@fragrancelover", text: "Absolutely stunning fragrance! The longevity is incredible and I get compliments every time I wear it.", rating: 5 },
      { source: "Facebook", author: "Michael R.", text: "A sophisticated scent that's perfect for special occasions. Highly recommend!", rating: 4 },
      { source: "Website", author: "Sarah J.", text: "My signature scent for over a year now. Nothing else compares to the complexity and elegance.", rating: 5 }
    ]
  },
  {
    id: 2,
    name: "Imperial Perfume 2",
    description: "A rich and warm fragrance with notes of amber, vanilla, and sandalwood.",
    price: 229,
    image: "/images/imperial rogue.png",
    details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel aliquam nisl nisl vel nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel aliquam nisl nisl vel nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel aliquam nisl nisl vel nisl.",
    collections: ["signature"],
    notes: {
      top: ["Bergamot", "Cardamom", "Pink Pepper"],
      middle: ["Amber", "Vanilla", "Cinnamon"],
      base: ["Sandalwood", "Musk", "Tonka Bean"]
    },
    reviews: [
      { source: "Instagram", author: "@scentcritic", text: "One of the most luxurious amber fragrances I've ever experienced. Worth every penny.", rating: 5 },
      { source: "Facebook", author: "Jennifer L.", text: "My husband loves this! It's warm, inviting, and lasts all day.", rating: 5 },
      { source: "Website", author: "David M.", text: "A masterpiece of perfumery. The dry down is absolutely divine.", rating: 4 }
    ]
  },
  {
    id: 3,
    name: "Imperial Perfume 3",
    description: "A bold and daring fragrance with notes of leather, spice, and dark woods.",
    price: 249,
    image: "/images/imperial rogue.png",
    details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel aliquam nisl nisl vel nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel aliquam nisl nisl vel nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel aliquam nisl nisl vel nisl.",
    collections: ["oud"],
    notes: {
      top: ["Black Pepper", "Saffron", "Elemi"],
      middle: ["Leather", "Oud", "Rose"],
      base: ["Patchouli", "Vetiver", "Incense"]
    },
    reviews: [
      { source: "Instagram", author: "@fragrancejunkie", text: "This is not for the faint of heart. Bold, masculine, and unforgettable.", rating: 5 },
      { source: "Facebook", author: "Robert T.", text: "The leather note is so realistic. A true masterpiece for those who appreciate daring scents.", rating: 4 },
      { source: "Website", author: "Alexandra P.", text: "I wear this despite it being marketed for men. It's powerful and makes me feel confident.", rating: 5 }
    ]
  },
  {
    id: 4,
    name: "Imperial Perfume 4",
    description: "An enchanting floral fragrance with notes of orchid, jasmine, and musk.",
    price: 189,
    image: "/images/imperial rogue.png",
    details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel aliquam nisl nisl vel nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel aliquam nisl nisl vel nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel aliquam nisl nisl vel nisl.",
    collections: ["floral"],
    notes: {
      top: ["Bergamot", "Peach", "Green Notes"],
      middle: ["Orchid", "Jasmine", "Rose"],
      base: ["Musk", "Vanilla", "Amber"]
    },
    reviews: [
      { source: "Instagram", author: "@perfumelover", text: "The most beautiful floral I've ever worn. Elegant and feminine.", rating: 5 },
      { source: "Facebook", author: "Emily S.", text: "I receive so many compliments when I wear this. It's become my signature scent.", rating: 5 },
      { source: "Website", author: "Thomas K.", text: "Bought this for my wife and she absolutely loves it. A truly elegant scent.", rating: 5 }
    ]
  },
  {
    id: 5,
    name: "Imperial Perfume 5",
    description: "A fresh and invigorating scent with citrus and marine accords.",
    price: 179,
    image: "/images/imperial rogue.png",
    details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel aliquam nisl nisl vel nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel aliquam nisl nisl vel nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel aliquam nisl nisl vel nisl.",
    collections: ["signature"],
    notes: {
      top: ["Lemon", "Bergamot", "Grapefruit"],
      middle: ["Marine Notes", "Jasmine", "Rosemary"],
      base: ["Musk", "Cedar", "Amber"]
    },
    reviews: [
      { source: "Instagram", author: "@summerscents", text: "Perfect for hot days. So refreshing and clean.", rating: 5 },
      { source: "Facebook", author: "James L.", text: "Great office scent. Professional and not overpowering.", rating: 4 },
      { source: "Website", author: "Olivia R.", text: "My go-to for hot days. The marine notes are so realistic and refreshing.", rating: 4 }
    ]
  },
  {
    id: 6,
    name: "Imperial Perfume 6",
    description: "A sophisticated blend of rose, patchouli, and bergamot.",
    price: 219,
    image: "/images/imperial rogue.png",
    details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel aliquam nisl nisl vel nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel aliquam nisl nisl vel nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel aliquam nisl nisl vel nisl.",
    collections: ["floral"],
    notes: {
      top: ["Bergamot", "Mandarin", "Pink Pepper"],
      middle: ["Rose", "Geranium", "Lily of the Valley"],
      base: ["Patchouli", "Sandalwood", "Vanilla"]
    },
    reviews: [
      { source: "Instagram", author: "@rosefanatic", text: "The most realistic rose fragrance I've ever tried. Absolutely beautiful.", rating: 5 },
      { source: "Facebook", author: "Catherine M.", text: "Elegant and timeless. Perfect for any occasion.", rating: 4 },
      { source: "Website", author: "William J.", text: "Bought this for my mother and she adores it. A true classic.", rating: 4 }
    ]
  },
  {
    id: 7,
    name: "Imperial Perfume 7",
    description: "An oriental fragrance with notes of oud, saffron, and amber.",
    price: 259,
    image: "/images/imperial rogue.png",
    details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel aliquam nisl nisl vel nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel aliquam nisl nisl vel nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel aliquam nisl nisl vel nisl.",
    collections: ["oud"],
    notes: {
      top: ["Saffron", "Cinnamon", "Cardamom"],
      middle: ["Oud", "Rose", "Jasmine"],
      base: ["Amber", "Vanilla", "Sandalwood"]
    },
    reviews: [
      { source: "Instagram", author: "@oudlover", text: "The most authentic oud fragrance available outside the Middle East.", rating: 5 },
      { source: "Facebook", author: "Mohammed A.", text: "Reminds me of the finest attars from my homeland. Exceptional quality.", rating: 5 },
      { source: "Website", author: "Sophia K.", text: "Worth every penny. The longevity is incredible and the scent evolution is fascinating.", rating: 4 }
    ]
  },
  {
    id: 8,
    name: "Imperial Perfume 8",
    description: "A light and airy fragrance with notes of white flowers and citrus.",
    price: 169,
    image: "/images/imperial rogue.png",
    details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel aliquam nisl nisl vel nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel aliquam nisl nisl vel nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel aliquam nisl nisl vel nisl.",
    collections: ["floral"],
    notes: {
      top: ["Bergamot", "Lemon", "Neroli"],
      middle: ["Orange Blossom", "Jasmine", "Lily"],
      base: ["White Musk", "Amber", "Cedarwood"]
    },
    reviews: [
      { source: "Instagram", author: "@springscents", text: "Like walking through a garden in full bloom. So uplifting!", rating: 5 },
      { source: "Facebook", author: "Laura B.", text: "My favorite spring fragrance. Light but long-lasting.", rating: 4 },
      { source: "Website", author: "Daniel P.", text: "Bought this for my girlfriend and she wears it every day now. Light but distinctive.", rating: 4 }
    ]
  },
  {
    id: 9,
    name: "Imperial Perfume 9",
    description: "A woody fragrance with notes of cedar, vetiver, and bergamot.",
    price: 209,
    image: "/images/imperial rogue.png",
    details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel aliquam nisl nisl vel nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel aliquam nisl nisl vel nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel aliquam nisl nisl vel nisl.",
    collections: ["signature"],
    notes: {
      top: ["Bergamot", "Grapefruit", "Pepper"],
      middle: ["Cedar", "Cypress", "Geranium"],
      base: ["Vetiver", "Patchouli", "Amber"]
    },
    reviews: [
      { source: "Instagram", author: "@woodyfragrances", text: "The cedar note is so realistic. Like walking through a forest after rain.", rating: 5 },
      { source: "Facebook", author: "Mark T.", text: "My go-to office scent. Professional and distinctive.", rating: 4 },
      { source: "Website", author: "Rachel B.", text: "I love woody fragrances and this is one of the best I've tried.", rating: 5 }
    ]
  },
  {
    id: 10,
    name: "Imperial Perfume 10",
    description: "A luxurious blend of rare spices, amber, and vanilla.",
    price: 279,
    image: "/images/imperial rogue.png",
    details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel aliquam nisl nisl vel nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel aliquam nisl nisl vel nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel aliquam nisl nisl vel nisl.",
    collections: ["oud"],
    notes: {
      top: ["Saffron", "Cardamom", "Cinnamon"],
      middle: ["Oud", "Rose", "Amber"],
      base: ["Vanilla", "Sandalwood", "Musk"]
    },
    reviews: [
      { source: "Instagram", author: "@luxuryscents", text: "The most opulent fragrance in my collection. Worth every penny.", rating: 5 },
      { source: "Facebook", author: "Victoria P.", text: "Received this as a gift and it's become my special occasion scent. Truly luxurious.", rating: 5 },
      { source: "Website", author: "Jonathan K.", text: "A special occasion fragrance that makes you feel like royalty.", rating: 5 }
    ]
  }
];

// Sample users with SHA-256 hashed passwords
const users = [
  {
    email: 'admin@imperialperfumes.com',
    // Password will be hashed with SHA-256
    password: hashPassword('Admin@123'),
    name: 'Admin User',
    phone: '9876543210',
    role: 'admin',
    isVerified: true,
    addresses: [
      {
        street: '123 Main Street',
        city: 'Mumbai',
        state: 'Maharashtra',
        pincode: '400001',
        country: 'India',
        isDefault: true
      }
    ]
  },
  {
    email: 'customer@example.com',
    // Password will be hashed with SHA-256
    password: hashPassword('Customer@123'),
    name: 'Test Customer',
    phone: '8765432109',
    role: 'customer',
    isVerified: true,
    addresses: [
      {
        street: '456 Park Avenue',
        city: 'Delhi',
        state: 'Delhi',
        pincode: '110001',
        country: 'India',
        isDefault: true
      }
    ]
  },
  {
    email: 'soham@imperialperfumes.com',
    // Password will be hashed with SHA-256
    password: hashPassword('Soham@123'),
    name: 'Soham Pansare',
    phone: '9876543211',
    role: 'admin',
    isVerified: true,
    addresses: [
      {
        street: '789 Business Park',
        city: 'Pune',
        state: 'Maharashtra',
        pincode: '411001',
        country: 'India',
        isDefault: true
      }
    ]
  }
];

// Function to seed the database
async function resetDatabase() {
  try {
    // Connect to MongoDB
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    console.log('Clearing existing data...');
    await Collection.deleteMany({});
    await Product.deleteMany({});
    await User.deleteMany({});
    console.log('All collections cleared');

    // Insert collections
    console.log('Seeding collections...');
    await Collection.insertMany(collections);
    console.log(`Inserted ${collections.length} collections`);

    // Insert products
    console.log('Seeding products...');
    await Product.insertMany(perfumes);
    console.log(`Inserted ${perfumes.length} products`);
    
    // Insert users with pre-hashed passwords
    console.log('Seeding users with SHA-256 hashed passwords...');
    await User.insertMany(users);
    console.log(`Inserted ${users.length} users`);

    console.log('Database reset and seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

// Run the seeding function
resetDatabase();
