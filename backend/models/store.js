const mongoose = require('mongoose');

const storeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  // The farmer who owns this store
  farmer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Farmer',
    required: true,
  },
  // Store's logo or banner
  logo: {
    type: String,
  },
  // Store's location (can be expanded later)
  location: {
    type: String,
  },
  // Products sold in this store
  products: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
  }],
}, { timestamps: true });

const Store = mongoose.model('Store', storeSchema);

module.exports = Store;