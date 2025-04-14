const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Collection schema for perfume collections
 */
const collectionSchema = new Schema({
  id: {
    type: String,
    required: [true, 'Collection ID is required'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^[a-z0-9-]+$/, 'Collection ID can only contain lowercase letters, numbers, and hyphens']
  },
  name: {
    type: String,
    required: [true, 'Collection name is required'],
    trim: true,
    maxlength: [50, 'Collection name cannot exceed 50 characters']
  },
  description: {
    type: String,
    required: [true, 'Collection description is required'],
    trim: true
  },
  image: {
    type: String,
    required: [true, 'Collection image is required']
  },
  perfumeCount: {
    type: Number,
    default: 0
  },
  notes: {
    type: String,
    required: [true, 'Collection notes are required'],
    trim: true
  },
  featured: {
    type: Boolean,
    default: false
  },
  displayOrder: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for products in this collection
collectionSchema.virtual('products', {
  ref: 'Product',
  localField: '_id',
  foreignField: 'collections'
});

// Indexes for better query performance
collectionSchema.index({ id: 1 });
collectionSchema.index({ featured: 1 });
collectionSchema.index({ displayOrder: 1 });

const Collection = mongoose.model('Collection', collectionSchema);

module.exports = Collection;
