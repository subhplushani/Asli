const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  store: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Store',
    required: true,
  },
  // This will hold the different variations of the product
  variations: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ProductVariation',
  }],
  // The main image for the product
  mainImage: {
    type: String,
    required: true,
  },
  // Additional images
  images: [{
    type: String,
  }],
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;