const Collection = require('../models/collection.model');
const { connectDatabase } = require('../db/connection');

/**
 * Collection repository for database operations
 */
class CollectionRepository {
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
   * Find all collections with optional filtering
   * @param {Object} filters - Query filters
   * @param {Object} options - Query options (sort, limit, skip)
   * @returns {Promise<Array>} Array of collections
   */
  async findAll(filters = {}, options = {}) {
    const { sort = { displayOrder: 1 }, limit = 0, skip = 0 } = options;
    
    return Collection.find(filters)
      .sort(sort)
      .skip(skip)
      .limit(limit);
  }

  /**
   * Find a collection by ID
   * @param {string} id - Collection ID
   * @returns {Promise<Object>} Collection document
   */
  async findById(id) {
    return Collection.findById(id);
  }

  /**
   * Find a collection by custom ID
   * @param {string} customId - Collection custom ID
   * @returns {Promise<Object>} Collection document
   */
  async findByCustomId(customId) {
    return Collection.findOne({ id: customId });
  }

  /**
   * Find featured collections
   * @param {number} limit - Number of collections to return
   * @returns {Promise<Array>} Array of featured collections
   */
  async findFeatured(limit = 3) {
    return Collection.find({ featured: true })
      .sort({ displayOrder: 1 })
      .limit(limit);
  }

  /**
   * Create a new collection
   * @param {Object} collectionData - Collection data
   * @returns {Promise<Object>} Created collection
   */
  async create(collectionData) {
    return Collection.create(collectionData);
  }

  /**
   * Update a collection
   * @param {string} id - Collection ID
   * @param {Object} updateData - Data to update
   * @returns {Promise<Object>} Updated collection
   */
  async update(id, updateData) {
    return Collection.findByIdAndUpdate(id, updateData, { 
      new: true,
      runValidators: true
    });
  }

  /**
   * Delete a collection
   * @param {string} id - Collection ID
   * @returns {Promise<Object>} Deleted collection
   */
  async delete(id) {
    return Collection.findByIdAndDelete(id);
  }

  /**
   * Count collections with optional filtering
   * @param {Object} filters - Query filters
   * @returns {Promise<number>} Count of collections
   */
  async count(filters = {}) {
    return Collection.countDocuments(filters);
  }
}

module.exports = new CollectionRepository();
