const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Fragrance notes schema
 */
const fragranceNotesSchema = new Schema({
  top: [{ type: String, trim: true }],
  middle: [{ type: String, trim: true }],
  base: [{ type: String, trim: true }]
}, { _id: false });

/**
 * Product schema
 */
const productSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
    maxlength: [100, 'Product name cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Product description is required'],
    trim: true
  },
  price: {
    type: Number,
    required: [true, 'Product price is required'],
    min: [0, 'Price cannot be negative']
  },
  images: [{
    type: String,
    required: [true, 'Product image is required']
  }],
  collections: [{
    type: Schema.Types.ObjectId,
    ref: 'Collection'
  }],
  fragranceNotes: {
    type: fragranceNotesSchema,
    required: [true, 'Fragrance notes are required']
  },
  sizes: [{
    size: {
      type: String,
      enum: ['30ml', '60ml', '100ml'],
      required: true
    },
    priceMultiplier: {
      type: Number,
      default: 1,
      min: [0.1, 'Price multiplier cannot be less than 0.1']
    },
    stock: {
      type: Number,
      default: 0,
      min: [0, 'Stock cannot be negative']
    }
  }],
  featured: {
    type: Boolean,
    default: false
  },
  inStock: {
    type: Boolean,
    default: true
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true,
    index: true
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for reviews
productSchema.virtual('reviews', {
  ref: 'Review',
  localField: '_id',
  foreignField: 'product'
});

// Indexes for better query performance
productSchema.index({ name: 'text', description: 'text' });
productSchema.index({ price: 1 });
productSchema.index({ featured: 1 });
productSchema.index({ collections: 1 });

// Generate slug before saving
productSchema.pre('save', function(next) {
  if (!this.isModified('name')) return next();
  this.slug = this.name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
  next();
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
