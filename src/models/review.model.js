const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Review schema
 */
const reviewSchema = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  rating: {
    type: Number,
    required: [true, 'Rating is required'],
    min: [1, 'Rating must be at least 1'],
    max: [5, 'Rating cannot exceed 5']
  },
  text: {
    type: String,
    required: [true, 'Review text is required'],
    trim: true
  },
  source: {
    type: String,
    enum: ['Website', 'Instagram', 'Facebook', 'Other'],
    default: 'Website'
  },
  author: {
    type: String,
    required: [true, 'Author name is required'],
    trim: true
  },
  isVerified: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Compound index to ensure a user can only review a product once
reviewSchema.index({ product: 1, user: 1 }, { unique: true, sparse: true });

// Indexes for better query performance
reviewSchema.index({ product: 1 });
reviewSchema.index({ rating: -1 });
reviewSchema.index({ createdAt: -1 });

// Static method to calculate average rating
reviewSchema.statics.getAverageRating = async function(productId) {
  const result = await this.aggregate([
    {
      $match: { product: productId }
    },
    {
      $group: {
        _id: '$product',
        averageRating: { $avg: '$rating' },
        reviewCount: { $sum: 1 }
      }
    }
  ]);

  return result.length > 0 
    ? { averageRating: result[0].averageRating, reviewCount: result[0].reviewCount } 
    : { averageRating: 0, reviewCount: 0 };
};

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
