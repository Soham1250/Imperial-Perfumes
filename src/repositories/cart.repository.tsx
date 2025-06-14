const Cart = require('../models/cart.model');
const Product = require('../models/product.model');
const { connectDatabase } = require('../db/connection');

/**
 * Cart repository for database operations
 */
class CartRepository {
  /**
   * Initialize the database connection
   */
  constructor() {
    this.init();
  }

  async init() {
    await connectDatabase();
  }

  /**
   * Find cart by user ID
   * @param {string} userId - User ID
   * @returns {Promise<Object>} Cart document
   */
  async findByUser(userId) {
    return Cart.findOne({ user: userId }).populate({
      path: 'items.product',
      select: 'name price images'
    });
  }

  /**
   * Create a new cart
   * @param {string} userId - User ID
   * @returns {Promise<Object>} Created cart
   */
  async create(userId) {
    return Cart.create({
      user: userId,
      items: [],
      subtotal: 0
    });
  }

  /**
   * Find or create cart for user
   * @param {string} userId - User ID
   * @returns {Promise<Object>} Cart document
   */
  async findOrCreate(userId) {
    let cart = await this.findByUser(userId);
    
    if (!cart) {
      cart = await this.create(userId);
    }
    
    return cart;
  }

  /**
   * Add item to cart
   * @param {string} userId - User ID
   * @param {string} productId - Product ID
   * @param {number} quantity - Quantity to add
   * @param {string} size - Product size
   * @returns {Promise<Object>} Updated cart
   */
  async addItem(userId, productId, quantity = 1, size = '30ml') {
    // Find the product to get details
    const product = await Product.findById(productId);
    if (!product) {
      throw new Error('Product not found');
    }
    
    // Find the size option to get the correct price
    const sizeOption = product.sizes.find(s => s.size === size);
    if (!sizeOption) {
      throw new Error('Invalid size option');
    }
    
    // Calculate price based on size multiplier
    const price = product.price * sizeOption.priceMultiplier;
    
    // Create cart item
    const cartItem = {
      product: productId,
      quantity,
      size,
      price,
      name: product.name,
      image: product.images[0] || ''
    };
    
    // Find or create cart
    const cart = await this.findOrCreate(userId);
    
    // Add item to cart
    cart.addItem(cartItem);
    
    // Save and return updated cart
    return cart.save();
  }

  /**
   * Remove item from cart
   * @param {string} userId - User ID
   * @param {string} productId - Product ID
   * @param {string} size - Product size
   * @returns {Promise<Object>} Updated cart
   */
  async removeItem(userId, productId, size) {
    const cart = await this.findByUser(userId);
    
    if (!cart) {
      throw new Error('Cart not found');
    }
    
    // Remove item from cart
    cart.removeItem(productId, size);
    
    // Save and return updated cart
    return cart.save();
  }

  /**
   * Update item quantity
   * @param {string} userId - User ID
   * @param {string} productId - Product ID
   * @param {number} quantity - New quantity
   * @param {string} size - Product size
   * @returns {Promise<Object>} Updated cart
   */
  async updateQuantity(userId, productId, quantity, size) {
    const cart = await this.findByUser(userId);
    
    if (!cart) {
      throw new Error('Cart not found');
    }
    
    // Update item quantity
    cart.updateQuantity(productId, quantity, size);
    
    // Save and return updated cart
    return cart.save();
  }

  /**
   * Clear cart
   * @param {string} userId - User ID
   * @returns {Promise<Object>} Updated cart
   */
  async clearCart(userId) {
    const cart = await this.findByUser(userId);
    
    if (!cart) {
      throw new Error('Cart not found');
    }
    
    // Clear cart
    cart.clearCart();
    
    // Save and return updated cart
    return cart.save();
  }

  /**
   * Get cart totals
   * @param {string} userId - User ID
   * @returns {Promise<Object>} Cart totals
   */
  async getCartTotals(userId) {
    const cart = await this.findByUser(userId);
    
    if (!cart) {
      return { subtotal: 0, itemCount: 0 };
    }
    
    const itemCount = cart.items.reduce((total, item) => total + item.quantity, 0);
    
    return {
      subtotal: cart.subtotal,
      itemCount
    };
  }
}

module.exports = new CartRepository();
