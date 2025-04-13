# MongoDB Integration for Imperial Perfumes

This document explains how to set up and use MongoDB with the Imperial Perfumes e-commerce platform.

## Setup Instructions

### 1. MongoDB Atlas Setup

1. Create a free MongoDB Atlas account at [https://www.mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster (the free tier is sufficient for development)
3. Set up database access:
   - Create a database user with read/write permissions
   - Remember the username and password
4. Set up network access:
   - Add your IP address to the IP access list
   - For development, you can allow access from anywhere (0.0.0.0/0)
5. Get your connection string:
   - Click "Connect" on your cluster
   - Select "Connect your application"
   - Copy the connection string (it will look like: `mongodb+srv://<username>:<password>@<cluster>.mongodb.net/imperial-perfumes?retryWrites=true&w=majority`)

### 2. Environment Setup

1. Create a `.env.local` file in the root of your project
2. Add your MongoDB connection string:
   ```
   MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/imperial-perfumes?retryWrites=true&w=majority
   NEXTAUTH_SECRET=your-secret-key-here
   NEXTAUTH_URL=http://localhost:3000
   ```
   Replace `<username>`, `<password>`, and `<cluster>` with your actual values

### 3. Seed the Database

1. Run the database seeding script to populate your MongoDB with initial data:
   ```
   npm run seed-db
   ```
   This will create collections for products, collections, users, and orders with sample data.

## Database Models

### Product Model
- `id`: Unique identifier
- `name`: Product name
- `description`: Short product description
- `details`: Detailed product information
- `price`: Product price
- `image`: Image URL
- `collections`: Array of collection IDs this product belongs to
- `notes`: Object containing top, middle, and base fragrance notes
- `reviews`: Array of customer reviews
- `inStock`: Boolean indicating if product is available
- `featured`: Boolean indicating if product should be featured

### Collection Model
- `id`: Unique identifier (e.g., "office", "beach")
- `name`: Collection name
- `description`: Collection description
- `image`: Collection image URL
- `perfumeCount`: Number of perfumes in the collection
- `notes`: Characteristic fragrance notes of the collection

### User Model
- `email`: User's email address (unique)
- `name`: User's name
- `password`: Hashed password
- `phone`: User's phone number (optional)
- `addresses`: Array of user's addresses
- `orders`: Array of order IDs associated with the user

### Order Model
- `userId`: Reference to user (null for guest checkout)
- `orderNumber`: Unique order identifier (auto-generated)
- `items`: Array of ordered products
- `subtotal`: Order subtotal
- `shippingCost`: Shipping cost
- `total`: Total order amount
- `shippingAddress`: Shipping address details
- `paymentMethod`: Payment method used
- `paymentStatus`: Status of payment (pending, paid, failed)
- `orderStatus`: Status of order (processing, shipped, delivered, cancelled)
- `notes`: Additional order notes

## API Endpoints

### Products
- `GET /api/products` - Get all products with optional filtering
  - Query params: collection, limit, page
- `GET /api/products/:id` - Get product by ID

### Collections
- `GET /api/collections` - Get all collections
- `GET /api/collections/:id` - Get collection by ID

### Orders (to be implemented)
- `POST /api/orders` - Create a new order

## Usage in Components

### Fetching Products
```typescript
import { getProducts, getProductById } from '@/services/api';

// In a React component
const [products, setProducts] = useState([]);

useEffect(() => {
  async function fetchProducts() {
    try {
      const data = await getProducts({ limit: 10, page: 1 });
      setProducts(data.products);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    }
  }
  
  fetchProducts();
}, []);
```

### Fetching a Single Product
```typescript
import { getProductById } from '@/services/api';

// In a React component
const [product, setProduct] = useState(null);

useEffect(() => {
  async function fetchProduct() {
    try {
      const data = await getProductById(productId);
      setProduct(data);
    } catch (error) {
      console.error('Failed to fetch product:', error);
    }
  }
  
  fetchProduct();
}, [productId]);
```

## Troubleshooting

### Connection Issues
- Verify your MongoDB Atlas cluster is running
- Check that your IP address is in the allowed list
- Ensure your connection string is correct in the `.env.local` file

### Seeding Issues
- If seeding fails, check the MongoDB connection string
- Ensure you have installed all required dependencies
- Try running the seed script with Node debugging: `node --inspect scripts/seed-db.js`
