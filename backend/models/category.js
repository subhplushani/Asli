const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  image: {
    type: String,
    required: false, // Assuming not all categories have images
  },
  // A category can have sub-categories
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    default: null,
  },
}, { timestamps: true });

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;