const mongoose = require('mongoose');

const productVariationSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  // e.g., "Weight", "Color", "Size"
  attribute: {
    type: String,
    required: true,
    trim: true,
  },
  // e.g., "1kg", "Red", "Large"
  value: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
    default: 0,
  },
}, { timestamps: true });

const ProductVariation = mongoose.model('ProductVariation', productVariationSchema);

module.exports = ProductVariation;