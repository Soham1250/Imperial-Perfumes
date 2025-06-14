const Product = require('../models/product.model');
const { connectDatabase } = require('../db/connection');

/**
 * Product repository for database operations
 */
class ProductRepository {
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
   * Find all products with optional filtering
   * @param {Object} filters - Query filters
   * @param {Object} options - Query options (sort, limit, skip)
   * @returns {Promise<Array>} Array of products
   */
  async findAll(filters = {}, options = {}) {
    const { sort = { createdAt: -1 }, limit = 0, skip = 0 } = options;
    
    return Product.find(filters)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .populate('collections', 'id name');
  }

  /**
   * Find a product by ID
   * @param {string} id - Product ID
   * @returns {Promise<Object>} Product document
   */
  async findById(id) {
    return Product.findById(id).populate('collections', 'id name');
  }

  /**
   * Find a product by slug
   * @param {string} slug - Product slug
   * @returns {Promise<Object>} Product document
   */
  async findBySlug(slug) {
    return Product.findOne({ slug }).populate('collections', 'id name');
  }

  /**
   * Find featured products
   * @param {number} limit - Number of products to return
   * @returns {Promise<Array>} Array of featured products
   */
  async findFeatured(limit = 4) {
    return Product.find({ featured: true })
      .sort({ createdAt: -1 })
      .limit(limit)
      .populate('collections', 'id name');
  }

  /**
   * Find products by collection
   * @param {string} collectionId - Collection ID
   * @param {Object} options - Query options (sort, limit, skip)
   * @returns {Promise<Array>} Array of products in the collection
   */
  async findByCollection(collectionId, options = {}) {
    const { sort = { createdAt: -1 }, limit = 0, skip = 0 } = options;
    
    return Product.find({ collections: collectionId })
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .populate('collections', 'id name');
  }

  /**
   * Search products by keyword
   * @param {string} keyword - Search keyword
   * @param {Object} options - Query options (sort, limit, skip)
   * @returns {Promise<Array>} Array of matching products
   */
  async search(keyword, options = {}) {
    const { sort = { score: { $meta: 'textScore' } }, limit = 0, skip = 0 } = options;
    
    return Product.find(
      { $text: { $search: keyword } },
      { score: { $meta: 'textScore' } }
    )
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .populate('collections', 'id name');
  }

  /**
   * Create a new product
   * @param {Object} productData - Product data
   * @returns {Promise<Object>} Created product
   */
  async create(productData) {
    return Product.create(productData);
  }

  /**
   * Update a product
   * @param {string} id - Product ID
   * @param {Object} updateData - Data to update
   * @returns {Promise<Object>} Updated product
   */
  async update(id, updateData) {
    return Product.findByIdAndUpdate(id, updateData, { 
      new: true,
      runValidators: true
    }).populate('collections', 'id name');
  }

  /**
   * Delete a product
   * @param {string} id - Product ID
   * @returns {Promise<Object>} Deleted product
   */
  async delete(id) {
    return Product.findByIdAndDelete(id);
  }

  /**
   * Count products with optional filtering
   * @param {Object} filters - Query filters
   * @returns {Promise<number>} Count of products
   */
  async count(filters = {}) {
    return Product.countDocuments(filters);
  }
}

module.exports = new ProductRepository();
