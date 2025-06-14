const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Cart item schema
 */
const cartItemSchema = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: [1, 'Quantity cannot be less than 1'],
    default: 1
  },
  size: {
    type: String,
    enum: ['30ml', '60ml', '100ml'],
    required: true,
    default: '30ml'
  },
  price: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  }
}, { _id: true });

/**
 * Cart schema
 */
const cartSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  items: [cartItemSchema],
  subtotal: {
    type: Number,
    default: 0
  },
  lastActive: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Calculate subtotal before saving
cartSchema.pre('save', function(next) {
  this.subtotal = this.items.reduce((total, item) => {
    return total + (item.price * item.quantity);
  }, 0);
  
  this.lastActive = new Date();
  next();
});

// Method to add item to cart
cartSchema.methods.addItem = function(item) {
  // Check if item already exists with same product ID and size
  const existingItemIndex = this.items.findIndex(
    i => i.product.toString() === item.product.toString() && i.size === item.size
  );
  
  if (existingItemIndex > -1) {
    // Update quantity if item exists
    this.items[existingItemIndex].quantity += item.quantity;
  } else {
    // Add new item
    this.items.push(item);
  }
  
  // Recalculate subtotal
  this.subtotal = this.items.reduce((total, item) => {
    return total + (item.price * item.quantity);
  }, 0);
  
  this.lastActive = new Date();
  return this;
};

// Method to remove item from cart
cartSchema.methods.removeItem = function(productId, size) {
  this.items = this.items.filter(
    item => !(item.product.toString() === productId && item.size === size)
  );
  
  // Recalculate subtotal
  this.subtotal = this.items.reduce((total, item) => {
    return total + (item.price * item.quantity);
  }, 0);
  
  this.lastActive = new Date();
  return this;
};

// Method to update item quantity
cartSchema.methods.updateQuantity = function(productId, quantity, size) {
  const item = this.items.find(
    item => item.product.toString() === productId && item.size === size
  );
  
  if (item) {
    item.quantity = quantity;
  }
  
  // Recalculate subtotal
  this.subtotal = this.items.reduce((total, item) => {
    return total + (item.price * item.quantity);
  }, 0);
  
  this.lastActive = new Date();
  return this;
};

// Method to clear cart
cartSchema.methods.clearCart = function() {
  this.items = [];
  this.subtotal = 0;
  this.lastActive = new Date();
  return this;
};

// Indexes for better query performance
cartSchema.index({ user: 1 });
cartSchema.index({ lastActive: -1 });

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
