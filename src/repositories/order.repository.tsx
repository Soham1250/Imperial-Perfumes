const Order = require('../models/order.model');
const Cart = require('../models/cart.model');
const { connectDatabase } = require('../db/connection');

/**
 * Order repository for database operations
 */
class OrderRepository {
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
   * Create a new order from cart
   * @param {string} userId - User ID
   * @param {Object} orderData - Order data (shipping address, payment method, etc.)
   * @returns {Promise<Object>} Created order
   */
  async createFromCart(userId, orderData) {
    // Find user's cart
    const cart = await Cart.findOne({ user: userId }).populate({
      path: 'items.product',
      select: 'name price images'
    });
    
    if (!cart || cart.items.length === 0) {
      throw new Error('Cart is empty');
    }
    
    // Create order items from cart items
    const orderItems = cart.items.map(item => ({
      product: item.product._id,
      name: item.product.name,
      price: item.price,
      quantity: item.quantity,
      size: item.size,
      image: item.product.images[0] || ''
    }));
    
    // Calculate totals
    const subtotal = cart.subtotal;
    const shippingCost = orderData.shippingCost || 0;
    const total = subtotal + shippingCost;
    
    // Create order
    const order = await Order.create({
      user: userId,
      items: orderItems,
      shippingAddress: orderData.shippingAddress,
      paymentMethod: orderData.paymentMethod,
      paymentDetails: orderData.paymentDetails || {},
      subtotal,
      shippingCost,
      total,
      notes: orderData.notes || ''
    });
    
    // Clear cart after order creation
    await cart.clearCart();
    await cart.save();
    
    return order;
  }

  /**
   * Find orders by user ID
   * @param {string} userId - User ID
   * @param {Object} options - Query options (sort, limit, skip)
   * @returns {Promise<Array>} Array of orders
   */
  async findByUser(userId, options = {}) {
    const { sort = { createdAt: -1 }, limit = 0, skip = 0 } = options;
    
    return Order.find({ user: userId })
      .sort(sort)
      .skip(skip)
      .limit(limit);
  }

  /**
   * Find order by ID
   * @param {string} orderId - Order ID
   * @returns {Promise<Object>} Order document
   */
  async findById(orderId) {
    return Order.findById(orderId);
  }

  /**
   * Find order by order number
   * @param {string} orderNumber - Order number
   * @returns {Promise<Object>} Order document
   */
  async findByOrderNumber(orderNumber) {
    return Order.findOne({ orderNumber });
  }

  /**
   * Update order status
   * @param {string} orderId - Order ID
   * @param {string} status - New status
   * @returns {Promise<Object>} Updated order
   */
  async updateStatus(orderId, status) {
    return Order.findByIdAndUpdate(
      orderId,
      { orderStatus: status },
      { new: true, runValidators: true }
    );
  }

  /**
   * Update payment status
   * @param {string} orderId - Order ID
   * @param {string} status - New payment status
   * @param {Object} paymentDetails - Payment details
   * @returns {Promise<Object>} Updated order
   */
  async updatePaymentStatus(orderId, status, paymentDetails = {}) {
    return Order.findByIdAndUpdate(
      orderId,
      { 
        paymentStatus: status,
        paymentDetails: { ...paymentDetails, paymentDate: new Date() }
      },
      { new: true, runValidators: true }
    );
  }

  /**
   * Update tracking information
   * @param {string} orderId - Order ID
   * @param {Object} trackingInfo - Tracking information
   * @returns {Promise<Object>} Updated order
   */
  async updateTracking(orderId, trackingInfo) {
    return Order.findByIdAndUpdate(
      orderId,
      { trackingInfo },
      { new: true, runValidators: true }
    );
  }

  /**
   * Get order statistics
   * @param {Object} filters - Query filters
   * @returns {Promise<Object>} Order statistics
   */
  async getStats(filters = {}) {
    const stats = await Order.aggregate([
      { $match: filters },
      {
        $group: {
          _id: null,
          totalOrders: { $sum: 1 },
          totalRevenue: { $sum: '$total' },
          averageOrderValue: { $avg: '$total' }
        }
      }
    ]);
    
    return stats.length > 0 ? stats[0] : {
      totalOrders: 0,
      totalRevenue: 0,
      averageOrderValue: 0
    };
  }

  /**
   * Get recent orders
   * @param {number} limit - Number of orders to return
   * @returns {Promise<Array>} Array of recent orders
   */
  async getRecent(limit = 10) {
    return Order.find()
      .sort({ createdAt: -1 })
      .limit(limit)
      .populate('user', 'name email');
  }
}

module.exports = new OrderRepository();
